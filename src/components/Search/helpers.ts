import { FRANCE_CENTER, zoomForRadius } from '@/helpers/geo'
import { filterParcels, groupByCommune, type SearchFilters } from '@/helpers/parcels'
import { buildParcelCard } from '@/components/ParcelCard'
import type { Parcel } from '@/types'
import type { SearchModel } from './types'

/** Résultats de recherche : vignettes, bulles de la carte (avant filtre par bulle) et cadrage de la carte. */
export const buildSearchModel = (parcels: Parcel[], f: SearchFilters, myEmail: string): SearchModel => {
  const all = filterParcels(parcels, { ...f, activeCode: null }, myEmail)
  const shown = f.activeCode ? all.filter(h => h.parcel.commune.code === f.activeCode) : all
  return {
    cards: shown.map(h => buildParcelCard(h.parcel, h.distanceKm)),
    bubbles: groupByCommune(all),
    center: f.commune ?? (all[0]?.parcel.commune ?? FRANCE_CENTER),
    zoom: f.commune ? zoomForRadius(f.radiusKm) : all.length > 0 ? 9 : 6,
    total: all.length,
  }
}
