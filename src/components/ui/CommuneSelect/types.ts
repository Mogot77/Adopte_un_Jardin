import type { Commune } from '@/types'

export type CommuneSelectProps = {
  /** Commune choisie (null = aucune). */
  value: Commune | null
  /** Texte en cours de saisie. */
  query: string
  /** Suggestions pour la saisie. */
  options: Commune[]
  loading: boolean
  onQuery: (text: string) => void
  onPick: (commune: Commune | null) => void
  placeholder?: string
}
