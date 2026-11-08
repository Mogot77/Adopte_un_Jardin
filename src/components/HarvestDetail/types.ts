import type { ReactNode } from 'react'
import type { SeasonState } from '@/helpers/harvests'
import type { HarvestStatus } from '@/types'

/** Une essence de la fiche, avec sa frise de 12 mois. */
export type HarvestDetailItem = {
  name: string
  kindLabel: string
  /** Période formatée (« d'août à octobre »). */
  seasonText: string
  /** Vrai pour chacun des 12 mois de la période. */
  months: boolean[]
  state: SeasonState
  stateLabel: string
  note: string
}

export type HarvestDetailModel = {
  id: string
  title: string
  description: string
  /** Comment venir : accès, jours, ce qu'il faut apporter. */
  instructions: string
  communeLabel: string
  ownerName: string
  photoUrls: string[]
  status: HarvestStatus
  /** Vrai si l'offre est celle du compte connecté. */
  isOwner: boolean
  items: HarvestDetailItem[]
  /** Meilleur état des essences ce mois-ci. */
  state: SeasonState
  stateLabel: string
  /** Mois courant (1 à 12) et initiales des 12 mois, pour la frise. */
  currentMonth: number
  initials: string[]
  rows: { label: string; value: string }[]
  /** Lien « mailto: » avec un message prérempli. */
  mailHref: string
  phone: string
}

export type HarvestDetailViewProps = {
  model: HarvestDetailModel
  busy: boolean
  /** Encart « Production du jardin », fourni par le conteneur au seul propriétaire de l'offre. */
  production?: ReactNode
  onEdit: () => void
  onToggle: () => void
  onBack: () => void
}
