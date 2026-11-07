import type { PlantStatus } from '@/types'

export type PlantDetailModel = {
  id: string
  title: string
  description: string
  kindLabel: string
  quantityLabel: string
  communeLabel: string
  ownerName: string
  photoUrls: string[]
  status: PlantStatus
  /** Vrai si l'annonce est celle du compte connecté. */
  isOwner: boolean
  rows: { label: string; value: string }[]
  /** Lien « mailto: » avec un message prérempli. */
  mailHref: string
  phone: string
}

export type PlantDetailViewProps = {
  model: PlantDetailModel
  busy: boolean
  onEdit: () => void
  onToggle: () => void
  onBack: () => void
}
