import type { CommuneSelectProps } from '@/components/ui/CommuneSelect'
import type { HarvestCardModel } from '@/components/HarvestCard'
import type { HarvestKind, HarvestStatus } from '@/types'

/** Ligne de « Mes offres » : une offre du compte. */
export type MyHarvestRow = {
  id: string
  title: string
  communeLabel: string
  /** « 3 essences · À cueillir maintenant ». */
  summary: string
  status: HarvestStatus
}

export type HarvestsModel = {
  cards: HarvestCardModel[]
  mine: MyHarvestRow[]
  /** Nom du mois courant (« octobre »). */
  monthName: string
}

export type HarvestsViewProps = {
  model: HarvestsModel
  commune: CommuneSelectProps
  radiusKm: number
  radiusOptions: number[]
  /** Nature recherchée (chaîne vide = toutes). */
  kind: HarvestKind | ''
  kindOptions: { value: HarvestKind; label: string }[]
  /** Ne montrer que ce qui est à cueillir ce mois-ci. */
  onlyNow: boolean
  /** Identifiant de l'offre dont une action est en cours. */
  busyId: string | null
  onRadius: (km: number) => void
  onKind: (kind: HarvestKind | '') => void
  onOnlyNow: (value: boolean) => void
  onOpen: (id: string) => void
  onNew: () => void
  onEdit: (id: string) => void
  onToggle: (id: string, status: HarvestStatus) => void
  onDelete: (id: string) => void
}
