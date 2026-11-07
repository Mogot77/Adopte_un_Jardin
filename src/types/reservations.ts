/** `payee` : réservée et payée, en attente de la première rencontre ; `validee` : code validé par le propriétaire ; `annulee`. */
export type ReservationStatus = 'payee' | 'validee' | 'annulee'

/** Clé d'une tranche de versement au propriétaire. */
export type PayoutKey = 'mars' | 'juin' | 'octobre'

export type Reservation = {
  /** `<parcelId>__<e-mail du jardinier>` : permet aux règles Firestore de retrouver la réservation d'un jardinier. */
  id: string
  parcelId: string
  parcelTitle: string
  communeNom: string
  ownerEmail: string
  ownerName: string
  gardenerEmail: string
  gardenerName: string
  /** Année culturale. */
  season: number
  /** Participation annuelle, en euros. */
  price: number
  /** Frais de service payés par le jardinier, en euros. */
  fee: number
  /** Montant payé par le jardinier (participation + frais). */
  total: number
  status: ReservationStatus
  /** Tranches de versement déjà demandées par le propriétaire. */
  payoutsRequested: PayoutKey[]
  createdAt: string
  validatedAt?: string
  cancelledAt?: string
  codeEntered?: string
}
