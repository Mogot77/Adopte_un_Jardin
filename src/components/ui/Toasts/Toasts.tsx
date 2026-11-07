import type { ToastsProps } from './types'

const TONE = { ok: 'border-good-line bg-good-soft text-good', error: 'border-danger-line bg-danger-soft text-danger', info: 'border-brand-line bg-brand-soft text-brand' }

/** Messages temporaires empilés en bas à droite. */
const Toasts = ({ items, onClose }: ToastsProps) => (
  <div className="fixed inset-x-3 bottom-3 z-50 flex flex-col items-end gap-2 sm:inset-x-auto sm:right-4 sm:bottom-4" aria-live="polite">
    {items.map(t => (
      <div key={t.id} role={t.kind === 'error' ? 'alert' : 'status'} className={`flex max-w-sm items-start gap-3 rounded-lg border px-3.5 py-2.5 text-[13px] font-medium shadow ${TONE[t.kind]}`}>
        <span className="flex-1">{t.text}</span>
        <button type="button" aria-label="Fermer le message" className="border-0 bg-transparent text-base leading-none text-inherit" onClick={() => onClose(t.id)}>×</button>
      </div>
    ))}
  </div>
)

export default Toasts
