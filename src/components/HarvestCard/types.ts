import type { SeasonState } from '@/helpers/harvests'

/** Essence résumée sur la vignette. */
export type HarvestCardItem = {
  name: string
  /** Période déjà formatée (« d'août à octobre »). */
  seasonText: string
  state: SeasonState
}

export type HarvestCardModel = {
  id: string
  title: string
  communeLabel: string
  ownerName: string
  photoUrls: string[]
  /** Distance au centre de recherche, déjà formatée (« 3,2 km »), ou vide. */
  distanceLabel: string
  /** Meilleur état des essences (maintenant, bientôt, plus tard). */
  state: SeasonState
  stateLabel: string
  /** Les trois premières essences. */
  items: HarvestCardItem[]
  /** Nombre d'essences non affichées. */
  moreCount: number
}

export type HarvestCardProps = {
  model: HarvestCardModel
  onOpen: (id: string) => void
}
