import type { ReactNode } from 'react'

export type PageHeadProps = {
  title: string
  subtitle?: string
  /** Boutons d'action à droite. */
  actions?: ReactNode
}
