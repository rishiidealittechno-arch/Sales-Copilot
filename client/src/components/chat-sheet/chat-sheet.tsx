import { HugeiconsIcon } from "@hugeicons/react"
import { AiMagicIcon, ArrowUp01Icon, CopyIcon, ThumbsUp } from "@hugeicons/core-free-icons"
import { nanoid } from "nanoid"
import { useCallback, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"

import { streamChatQuery } from "@/components/chat-sheet/api"
import { MessageResponse } from "@/components/ai-elements/message"
import { Bubble, BubbleContent } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Message, MessageContent, MessageFooter } from "@/components/ui/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller"
import { useAuthReady } from "@/hooks/use-workspace"
import { ButtonGroup } from "../ui/button-group"

type ChatMessage = {
  id: string
  role: "user" | "assistant"
  text: string
}

function ChatMessageRow({
  message,
  isAnimating,
  streamStatus,
}: {
  message: ChatMessage
  isAnimating?: boolean
  streamStatus?: string | null
}) {
  const isUser = message.role === "user"
  const showStatus = !isUser && !message.text && streamStatus

  return (
    <MessageScrollerItem
      messageId={message.id}
      scrollAnchor={isUser}
    >
      <Message align={isUser ? "end" : "start"}>
        <MessageContent>
          <Bubble variant={isUser ? "muted" : "ghost"}>
            <BubbleContent>
              {isUser ? (
                message.text
              ) : showStatus ? (
                <span className="text-muted-foreground">{streamStatus}</span>
              ) : message.text ? (
                <MessageResponse isAnimating={isAnimating}>
                  {message.text}
                </MessageResponse>
              ) : (
                <span className="text-muted-foreground">Thinking...</span>
              )}
            </BubbleContent>
          </Bubble>
          <MessageFooter>
            <ButtonGroup>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(message.text)
                }}
                variant="secondary" size="icon" aria-label="Copy" title="Copy">
                <HugeiconsIcon icon={CopyIcon} />
              </Button>

              <Button
                onClick={() => {
                  navigator.clipboard.writeText(message.text)
                }}
                variant="secondary" size="icon" aria-label="Copy" title="Copy">
                <HugeiconsIcon icon={ThumbsUp} />
              </Button>
            </ButtonGroup>
          </MessageFooter>
        </MessageContent>
      </Message>
    </MessageScrollerItem>
  )
}

const ChatSheet = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(
    null
  )
  const [streamStatus, setStreamStatus] = useState<string | null>(null)
  const abortControllerRef = useRef<AbortController | null>(null)
  const { isPending, isAuthenticated, workspaceId } = useAuthReady()

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort()
    }
  }, [])

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      const text = input.trim()
      if (!text || isStreaming || !workspaceId) {
        return
      }

      abortControllerRef.current?.abort()
      const abortController = new AbortController()
      abortControllerRef.current = abortController

      const userMessage: ChatMessage = {
        id: nanoid(),
        role: "user",
        text,
      }

      const assistantMessageId = nanoid()
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: "assistant",
        text: "",
      }

      const nextMessages = [...messages, userMessage, assistantMessage]
      setMessages(nextMessages)
      setInput("")
      setIsStreaming(true)
      setStreamingMessageId(assistantMessageId)
      setStreamStatus(null)

      try {
        await streamChatQuery(
          [...messages, userMessage].map((message) => ({
            role: message.role,
            content: message.text,
          })),
          {
            onToken: (token) => {
              setStreamStatus(null)
              setMessages((current) =>
                current.map((message) =>
                  message.id === assistantMessageId
                    ? { ...message, text: message.text + token }
                    : message
                )
              )
            },
            onStatus: (status) => {
              setStreamStatus(status)
            },
            onError: (errorMessage) => {
              setMessages((current) =>
                current.map((message) =>
                  message.id === assistantMessageId
                    ? { ...message, text: errorMessage }
                    : message
                )
              )
            },
          },
          abortController.signal
        )
      } finally {
        setIsStreaming(false)
        setStreamingMessageId(null)
        setStreamStatus(null)
        if (abortControllerRef.current === abortController) {
          abortControllerRef.current = null
        }
      }
    },
    [input, isStreaming, messages, workspaceId]
  )

  if (isPending) {
    return (
      <div className="flex h-full items-center justify-center px-4 text-sm text-muted-foreground">
        Loading session...
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <Empty className="h-full border-0 px-4">
        <EmptyHeader>
          <EmptyTitle>Sign in required</EmptyTitle>
          <EmptyDescription>
            Sign in to ask the AI assistant about your CRM data.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  if (!workspaceId) {
    return (
      <Empty className="h-full border-0 px-4">
        <EmptyHeader>
          <EmptyTitle>Select a workspace</EmptyTitle>
          <EmptyDescription>
            Choose an active workspace in settings before using AI chat.
          </EmptyDescription>
          <Button
            className="mt-2"
            size="sm"
          >
            <Link to="/settings/workspace" />
            Go to workspace settings
          </Button>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <MessageScrollerProvider autoScroll>
      <div className="flex h-full min-h-0 flex-col px-4 py-3">
        <div className="flex min-h-0 flex-1 flex-col">
          {messages.length === 0 ? (
            <Empty className="h-full border-0">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <HugeiconsIcon icon={AiMagicIcon} strokeWidth={1.5} />
                </EmptyMedia>
                <EmptyTitle>Start a conversation</EmptyTitle>
                <EmptyDescription className="text-left">
                  <span className="block text-center">Ask the AI assistant about your CRM.</span>
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : (
            <MessageScroller className="min-h-0 flex-1">
              <MessageScrollerViewport>
                <MessageScrollerContent className="gap-4 py-4">
                  {messages.map((message) => (
                    <ChatMessageRow
                      key={message.id}
                      message={message}
                      isAnimating={
                        isStreaming && message.id === streamingMessageId
                      }
                      streamStatus={
                        message.id === streamingMessageId ? streamStatus : null
                      }
                    />
                  ))}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          )}
        </div>

        <form onSubmit={handleSubmit} className="shrink-0 pt-3">
          <InputGroup className="h-auto">
            <InputGroupInput
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask anything..."
              autoComplete="off"
              disabled={isStreaming}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                type="submit"
                variant="default"
                size="icon-sm"
                disabled={!input.trim() || isStreaming}
                aria-label="Send message"
              >
                <HugeiconsIcon icon={ArrowUp01Icon} strokeWidth={2} />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </form>
      </div>
    </MessageScrollerProvider>
  )
}

export default ChatSheet
