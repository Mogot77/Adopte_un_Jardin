export type GuideModel = {
  /** Barème de la commission payée par le jardinier. */
  commission: { label: string; value: string }[]
  /** Échéancier de versement au propriétaire. */
  payouts: { label: string; share: string }[]
}

export type GuideViewProps = { model: GuideModel }
