import type { FieldProps } from './types'

/** Libellé + contrôle de formulaire (le `<label>` enveloppe le contrôle : pas besoin d'identifiant). */
const Field = ({ label, hint, className = '', children }: FieldProps) => (
  <label className={`block ${className}`}>
    <span className="lbl">{label}</span>
    {children}
    {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
  </label>
)

export default Field
