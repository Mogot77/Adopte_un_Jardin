import type { HarvestKind } from './harvests'

/** Où la récolte a eu lieu : une parcelle louée ou prêtée, ou une offre « à cueillir ». */
export type YieldSourceType = 'parcelle' | 'cueillette'

/** Une saisie de récolte : « 12,5 kg de cerises » sur un jardin, à une date. */
export type YieldEntry = {
  id: string
  sourceType: YieldSourceType
  sourceId: string
  /** Propriétaire du jardin (voit toutes les saisies de son jardin). */
  ownerEmail: string
  /** Auteur de la saisie (propriétaire ou jardinier). */
  authorEmail: string
  /** Culture, comme saisie (« Cerises »). */
  crop: string
  kind: HarvestKind
  /** Poids récolté en kilogrammes. */
  kg: number
  /** Date de la récolte (AAAA-MM-JJ). */
  date: string
  createdAt: string
}

/** Champs saisis dans le formulaire de récolte. */
export type YieldDraft = Pick<YieldEntry, 'crop' | 'kind' | 'kg' | 'date'>

/** Compteurs d'un mois (document `stats/AAAA-MM`) : kilos par type et nombre de saisies. Publics, sans donnée personnelle. */
export type ImpactMonth = {
  /** AAAA-MM. */
  month: string
  fruit: number
  legume: number
  aromatique: number
  autre: number
  count: number
}
