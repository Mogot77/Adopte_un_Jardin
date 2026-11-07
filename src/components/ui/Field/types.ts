import type { ReactNode } from 'react'

export type FieldProps = {
  label: string
  /** Aide sous le champ. */
  hint?: string
  className?: string
  children: ReactNode
}
