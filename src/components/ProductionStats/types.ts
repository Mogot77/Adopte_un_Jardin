import type { HarvestKind, YieldDraft } from '@/types'

export type CropRow = { key: string; name: string; kindLabel: string; kgLabel: string; countLabel: string }

export type YieldRow = {
  id: string
  cropName: string
  kgLabel: string
  dateLabel: string
  /** Vrai si la saisie est celle du compte (seul son auteur peut la supprimer). */
  mine: boolean
}

export type ProductionModel = {
  /** Poids total du jardin, formaté. */
  totalLabel: string
  crops: CropRow[]
  entries: YieldRow[]
}

export type ProductionStatsViewProps = {
  model: ProductionModel
  draft: YieldDraft
  /** Noms de cultures proposés à la saisie. */
  suggestions: string[]
  kindOptions: { value: HarvestKind; label: string }[]
  /** Poids maximal d'une saisie, en kg. */
  maxKg: number
  /** Date du jour (AAAA-MM-JJ), maximum de la date de récolte. */
  today: string
  busy: boolean
  issues: string[]
  onChange: (patch: Partial<YieldDraft>) => void
  onSubmit: () => void
  onDelete: (id: string) => void
}
