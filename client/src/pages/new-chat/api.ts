import { api } from "@/lib/api"

export type ChatSource = {
  content: string
  metadata: Record<string, unknown>
  score: number
}

export type ChatResponse = {
  answer: string
  source_type: "knowledge_base" | "general"
  sources: ChatSource[]
}

export async function sendChatMessage(query: string): Promise<ChatResponse> {
  const { data } = await api.post<ChatResponse>("/chat", {
    chat: query,
  })
  return data
}
