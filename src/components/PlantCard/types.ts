export type PlantCardModel = {
  id: string
  title: string
  kindLabel: string
  quantityLabel: string
  communeLabel: string
  ownerName: string
  photoUrls: string[]
  /** Distance au centre de recherche, déjà formatée (« 3,2 km »), ou vide. */
  distanceLabel: string
}

export type PlantCardProps = {
  model: PlantCardModel
  onOpen: (id: string) => void
}
