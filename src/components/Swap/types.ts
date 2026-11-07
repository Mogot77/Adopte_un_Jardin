import type { CommuneSelectProps } from '@/components/ui/CommuneSelect'
import type { PlantCardModel } from '@/components/PlantCard'
import type { PlantKind, PlantStatus } from '@/types'

/** Ligne de « Mes dons » : une annonce du compte. */
export type MyPlantRow = {
  id: string
  title: string
  kindLabel: string
  quantityLabel: string
  communeLabel: string
  status: PlantStatus
}

export type SwapModel = {
  cards: PlantCardModel[]
  mine: MyPlantRow[]
}

export type SwapViewProps = {
  model: SwapModel
  commune: CommuneSelectProps
  radiusKm: number
  radiusOptions: number[]
  /** Nature recherchée (chaîne vide = toutes). */
  kind: PlantKind | ''
  kindOptions: { value: PlantKind; label: string }[]
  /** Identifiant de l'annonce dont une action est en cours. */
  busyId: string | null
  onRadius: (km: number) => void
  onKind: (kind: PlantKind | '') => void
  onOpen: (id: string) => void
  onNew: () => void
  onEdit: (id: string) => void
  onToggle: (id: string, status: PlantStatus) => void
  onDelete: (id: string) => void
}
