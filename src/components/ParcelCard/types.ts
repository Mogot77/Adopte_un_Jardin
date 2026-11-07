export type ParcelCardModel = {
  id: string
  title: string
  communeLabel: string
  surfaceLabel: string
  priceLabel: string
  photoUrls: string[]
  /** Pastilles d'équipement (outils, eau...). */
  tags: string[]
  /** Distance au centre de recherche, déjà formatée (« 3,2 km »), ou vide. */
  distanceLabel: string
}

export type ParcelCardProps = {
  model: ParcelCardModel
  onOpen: (id: string) => void
}
