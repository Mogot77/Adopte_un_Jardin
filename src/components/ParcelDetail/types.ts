import type { ReservationStatus } from '@/types'

/** `available` : réservable ; `own` : annonce du compte ; `booked` : réservée par le compte ; `unavailable` : déjà prise ou retirée. */
export type DetailMode = 'available' | 'own' | 'booked' | 'unavailable'

export type ParcelDetailModel = {
  id: string
  title: string
  description: string
  ownerName: string
  communeLabel: string
  photoUrls: string[]
  rows: { label: string; value: string }[]
  mode: DetailMode
  /** Année culturale proposée à la réservation. */
  season: number
  rent: string
  fee: string
  total: string
  /** Coordonnées exactes : propriétaire de l'annonce, ou jardinier ayant payé. */
  contact?: { address: string; phone: string }
  /** Réservation du compte sur cette annonce. */
  booking?: { status: ReservationStatus; code: string }
}

export type ReserveStep = 'view' | 'confirm'

export type ParcelDetailViewProps = {
  model: ParcelDetailModel
  step: ReserveStep
  accepted: boolean
  busy: boolean
  error?: string
  onStart: () => void
  onBack: () => void
  onAccept: (v: boolean) => void
  onPay: () => void
  onEdit: () => void
  onSearch: () => void
}
