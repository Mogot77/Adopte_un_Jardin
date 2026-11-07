import type { LatLon } from '@/helpers/geo'
import type { Bubble } from '@/helpers/parcels'

export type MapViewProps = {
  center: LatLon
  zoom: number
  bubbles: Bubble[]
  /** Identifiant de la bulle sélectionnée (mise en évidence). */
  activeId?: string | null
  /** Rayon de recherche à dessiner autour du centre, en km (absent = pas de cercle). */
  radiusKm?: number
  onSelect: (id: string) => void
}
