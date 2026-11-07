import type { ChipProps } from '@/components/ui/Chip'

export type ReservationRow = {
  id: string
  parcelId: string
  title: string
  communeLabel: string
  seasonLabel: string
  paidLabel: string
  statusLabel: string
  tone: ChipProps['tone']
  /** Code à donner au propriétaire après la rencontre (vide une fois la location validée ou annulée). */
  code: string
  canCancel: boolean
  /** Coordonnées du propriétaire, une fois la réservation payée. */
  contact?: { ownerName: string; ownerEmail: string; address: string; phone: string }
}

export type MyReservationsModel = { rows: ReservationRow[] }

export type MyReservationsViewProps = {
  model: MyReservationsModel
  busyId: string | null
  onOpen: (parcelId: string) => void
  onCancel: (reservationId: string) => void
  onSearch: () => void
}
