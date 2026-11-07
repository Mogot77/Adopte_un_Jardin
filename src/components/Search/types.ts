import type { LatLon } from '@/helpers/geo'
import type { Bubble } from '@/helpers/parcels'
import type { CommuneSelectProps } from '@/components/ui/CommuneSelect'
import type { ParcelCardModel } from '@/components/ParcelCard'

export type SearchModel = {
  cards: ParcelCardModel[]
  bubbles: Bubble[]
  center: LatLon
  zoom: number
  /** Nombre d'annonces avant le filtre par bulle (pour proposer de l'effacer). */
  total: number
}

export type SearchViewProps = {
  model: SearchModel
  commune: CommuneSelectProps
  radiusKm: number
  radiusOptions: number[]
  /** Loyer maximum saisi (chaîne vide = pas de limite). */
  maxPrice: string
  activeCode: string | null
  /** Rayon dessiné sur la carte (absent si aucune commune). */
  showRadius: boolean
  onRadius: (km: number) => void
  onMaxPrice: (value: string) => void
  onBubble: (code: string) => void
  onClearBubble: () => void
  onOpen: (id: string) => void
}
