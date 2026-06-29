import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message"
import { Shimmer } from "@/components/ai-elements/shimmer"
import type { ChatMessage } from "@/pages/new-chat/types"

type ChatScreenProps = {
  messages: ChatMessage[]
  isLoading?: boolean
}

export default function ChatScreen({ messages, isLoading = false }: ChatScreenProps) {
  return (
    <Conversation className="min-h-0 flex-1">
      <ConversationContent className="mx-auto w-full max-w-2xl gap-4 px-4 py-6">
        {messages.length === 0 && !isLoading ? (
          <ConversationEmptyState
            title="Start a conversation"
            description="Ask anything — your knowledge base and general AI knowledge are both available."
          />
        ) : (
          messages.map((message) => (
            <Message from={message.role} key={message.id}>
              <MessageContent>
                <MessageResponse>{message.text}</MessageResponse>
              </MessageContent>
            </Message>
          ))
        )}

        {isLoading ? (
          <Message from="assistant">
            <MessageContent>
              <Shimmer spread={3}>Thinking...</Shimmer>
            </MessageContent>
          </Message>
        ) : null}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  )
}
