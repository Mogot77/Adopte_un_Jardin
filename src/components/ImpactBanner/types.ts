export type ImpactCounter = {
  key: 'fruit' | 'legume' | 'other'
  label: string
  /** Poids formaté (« 1 234 kg »). */
  kgLabel: string
}

/** Un mois de l'infographie (les trois parts sont des pourcentages de la hauteur de la barre). */
export type ImpactBarModel = {
  month: string
  initial: string
  /** Texte au survol et pour les lecteurs d'écran (« octobre 2027 : 120 kg »). */
  title: string
  /** Hauteur de la barre en % de la hauteur maximale (0 si rien ce mois-ci). */
  heightPct: number
  fruitPct: number
  legumePct: number
  otherPct: number
  /** Vrai pour le mois en cours. */
  current: boolean
}

export type ImpactModel = {
  /** Poids total depuis le lancement, formaté. */
  totalLabel: string
  /** Vrai tant qu'aucune récolte n'est comptée. */
  isEmpty: boolean
  /** Euros économisés (estimation), formaté (« 1 250 € »). */
  savedEurLabel: string
  /** CO₂ évité (estimation), formaté (« 1,2 tonne »). */
  co2Label: string
  harvestsLabel: string
  counters: ImpactCounter[]
  bars: ImpactBarModel[]
}

export type ImpactBannerProps = {
  model: ImpactModel
  /** Version réduite : titre et trois compteurs, sans l'évolution mois par mois. */
  compact?: boolean
}
