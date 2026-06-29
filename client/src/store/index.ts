// store/index.ts
import { create } from "zustand"

import type { UiSlice } from "./ui.slice"
import { createUiSlice } from "./ui.slice"

type Store = UiSlice

export const useStore = create<Store>()((...a) => ({
  ...createUiSlice(...a),
}))