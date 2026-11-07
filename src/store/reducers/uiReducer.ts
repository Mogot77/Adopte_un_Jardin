import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ToastItem } from '@/components/ui/Toasts'

export type UiState = {
  toasts: ToastItem[]
  /** Une lecture Firestore a échoué (droits ou réseau). */
  syncFailed: boolean
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { toasts: [], syncFailed: false } as UiState,
  reducers: {
    toastAdded: (s, a: PayloadAction<ToastItem>) => { s.toasts.push(a.payload) },
    toastRemoved: (s, a: PayloadAction<number>) => { s.toasts = s.toasts.filter(t => t.id !== a.payload) },
    syncFailedSet: (s, a: PayloadAction<boolean>) => { s.syncFailed = a.payload },
  },
})

export const { toastAdded, toastRemoved, syncFailedSet } = uiSlice.actions
export default uiSlice.reducer
