// store/ui.slice.ts
import type { StateCreator } from "zustand"
export interface UiSlice {
  sidebarOpen: boolean
  toggleSidebar: () => void
  aiChatOpen: boolean
  toggleAiChat: () => void
}

export const createUiSlice: StateCreator<UiSlice, [], [], UiSlice> = (set) => ({
  sidebarOpen: true,
  aiChatOpen: false,
  toggleAiChat: () => set((state) => ({ aiChatOpen: !state.aiChatOpen })),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
})