import { api } from "@/lib/api"
import { authClient } from "@/lib/auth"

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000"

export type ChatApiMessage = {
  role: "user" | "assistant"
  content: string
}

export type ChatQueryResponse = {
  message: string
  role: "assistant"
}

export type StreamChatEvent =
  | { type: "token"; content: string }
  | { type: "status"; content: string }
  | { type: "done" }
  | { type: "error"; content: string }

async function getChatAuthHeaders(): Promise<Record<string, string>> {
  const { data: session } = await authClient.getSession()

  if (!session?.user) {
    throw new Error("Sign in to use AI chat.")
  }

  if (!session.session?.activeOrganizationId) {
    throw new Error(
      "Select an active workspace in settings before using AI chat."
    )
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (session.session.token) {
    headers.Authorization = `Bearer ${session.session.token}`
  }

  return headers
}

function parseSseEvents(buffer: string): {
  events: StreamChatEvent[]
  remainder: string
} {
  const events: StreamChatEvent[] = []
  const parts = buffer.split("\n\n")
  const remainder = parts.pop() ?? ""

  for (const part of parts) {
    const line = part
      .split("\n")
      .find((entry) => entry.startsWith("data: "))

    if (!line) {
      continue
    }

    try {
      events.push(JSON.parse(line.slice(6)) as StreamChatEvent)
    } catch {
      // skip malformed chunks
    }
  }

  return { events, remainder }
}

export async function streamChatQuery(
  messages: ChatApiMessage[],
  handlers: {
    onToken: (text: string) => void
    onStatus?: (text: string) => void
    onError: (message: string) => void
  },
  signal?: AbortSignal
): Promise<void> {
  const headers = await getChatAuthHeaders()

  const response = await fetch(`${API_BASE_URL}/chat/stream`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({ messages }),
    signal,
  })

  if (!response.ok) {
    let detail = "Something went wrong. Please try again."
    try {
      const body = (await response.json()) as { detail?: string }
      if (typeof body.detail === "string") {
        detail = body.detail
      }
    } catch {
      // ignore parse errors
    }
    handlers.onError(detail)
    return
  }

  if (!response.body) {
    handlers.onError("No response stream received.")
    return
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ""

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) {
        break
      }

      buffer += decoder.decode(value, { stream: true })
      const { events, remainder } = parseSseEvents(buffer)
      buffer = remainder

      for (const event of events) {
        if (event.type === "token") {
          handlers.onToken(event.content)
        } else if (event.type === "status") {
          handlers.onStatus?.(event.content)
        } else if (event.type === "error") {
          handlers.onError(event.content)
          return
        }
      }
    }

    if (buffer.trim()) {
      const { events } = parseSseEvents(`${buffer}\n\n`)
      for (const event of events) {
        if (event.type === "token") {
          handlers.onToken(event.content)
        } else if (event.type === "status") {
          handlers.onStatus?.(event.content)
        } else if (event.type === "error") {
          handlers.onError(event.content)
          return
        }
      }
    }
  } catch (error) {
    if (signal?.aborted) {
      return
    }
    handlers.onError(
      error instanceof Error ? error.message : "Stream failed. Please try again."
    )
  }
}

export async function sendChatQuery(
  messages: ChatApiMessage[]
): Promise<ChatQueryResponse> {
  const headers = await getChatAuthHeaders()

  const { data } = await api.post<ChatQueryResponse>(
    "/chat",
    { messages },
    { headers }
  )

  return data
}
