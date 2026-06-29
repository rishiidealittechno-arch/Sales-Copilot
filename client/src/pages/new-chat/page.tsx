import { useMutation } from "@tanstack/react-query"
import { nanoid } from "nanoid"
import { useCallback, useState } from "react"

import { sendChatMessage } from "@/pages/new-chat/api"
import type { ChatMessage } from "@/pages/new-chat/types"
import ChatScreen from "./components/chat-screen"
import InputChat from "./components/input"

export default function NewChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])

  const chatMutation = useMutation({
    mutationFn: sendChatMessage,
  })

  const handleSend = useCallback(
    async (text: string) => {
      const query = text.trim()
      if (!query || chatMutation.isPending) {
        return
      }

      const userMessage: ChatMessage = {
        id: nanoid(),
        role: "user",
        text: query,
      }

      setMessages((prev) => [...prev, userMessage])

      try {
        const response = await chatMutation.mutateAsync(query)
        setMessages((prev) => [
          ...prev,
          {
            id: nanoid(),
            role: "assistant",
            text: response.answer,
          },
        ])
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: nanoid(),
            role: "assistant",
            text: "Something went wrong. Please try again.",
          },
        ])
      }
    },
    [chatMutation]
  )

  return (
    <div className="flex min-h-full flex-col">
      <ChatScreen messages={messages} isLoading={chatMutation.isPending} />
      <div className="sticky  pb-4 pt-2">
        <InputChat
          onSend={handleSend}
          disabled={chatMutation.isPending}
        />
      </div>
    </div>
  )
}
