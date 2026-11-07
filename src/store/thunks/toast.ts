import type { AppDispatch } from '@/store'
import { toastAdded, toastRemoved } from '@/store/reducers'
import type { ToastKind } from '@/components/ui/Toasts'

const DURATION_MS = 4500
let seq = 0

/** Affiche un message temporaire. */
export const toast = (text: string, kind: ToastKind = 'ok') => (dispatch: AppDispatch): void => {
  const id = ++seq
  dispatch(toastAdded({ id, kind, text }))
  setTimeout(() => dispatch(toastRemoved(id)), DURATION_MS)
}
