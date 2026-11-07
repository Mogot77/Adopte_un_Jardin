export type ToastKind = 'ok' | 'error' | 'info'

export type ToastItem = { id: number; kind: ToastKind; text: string }

export type ToastsProps = {
  items: ToastItem[]
  onClose: (id: number) => void
}
