import type { ChipProps } from '@/components/ui/Chip'
import type { PayoutKey } from '@/types'

export type PayoutView = {
  key: PayoutKey
  label: string
  dateLabel: string
  amountLabel: string
  /** `requested` : virement demandé ; `available` : demandable ; `upcoming` : pas encore échu. */
  state: 'requested' | 'available' | 'upcoming'
}

export type ReservationView = {
  id: string
  gardenerName: string
  gardenerEmail: string
  seasonLabel: string
  statusLabel: string
  tone: ChipProps['tone']
  /** Le propriétaire doit saisir le code remis par le jardinier. */
  awaitingCode: boolean
  payouts: PayoutView[]
}

export type MyParcelRow = {
  id: string
  title: string
  communeLabel: string
  priceLabel: string
  statusLabel: string
  tone: ChipProps['tone']
  canEdit: boolean
  canWithdraw: boolean
  reservation?: ReservationView
}

export type MyParcelsModel = {
  rows: MyParcelRow[]
  online: number
  rented: number
  /** Participations des locations validées. */
  incomeLabel: string
}

export type MyParcelsViewProps = {
  model: MyParcelsModel
  busyId: string | null
  onOpen: (id: string) => void
  onEdit: (id: string) => void
  onWithdraw: (id: string) => void
  onNew: () => void
  onValidate: (reservationId: string, code: string) => void
  onPayout: (reservationId: string, key: PayoutKey) => void
}
