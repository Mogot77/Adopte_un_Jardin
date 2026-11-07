/* Règles métier sur les annonces : filtrage de la recherche, regroupement par commune, validation du dépôt. */
import { distanceKm } from '@/helpers/geo'
import { MIN_SURFACE, priceBounds } from '@/helpers/pricing'
import type { Commune, Parcel, ParcelDraft, WaterAccess } from '@/types'

export const WATER_LABELS: Record<WaterAccess, string> = {
  aucune: "Pas de point d'eau",
  robinet: "Robinet / point d'eau",
  cuve: 'Cuve de récupération de pluie',
}

export const RADIUS_OPTIONS = [5, 10, 20, 50]

export type SearchFilters = {
  commune: Commune | null
  radiusKm: number
  /** Loyer annuel maximum (null = pas de limite). */
  maxPrice: number | null
  /** Code d'une commune choisie en cliquant sur une bulle de la carte (null = toutes). */
  activeCode: string | null
}

export type ParcelHit = { parcel: Parcel; distanceKm: number | null }

/** Annonces publiées correspondant à la recherche, de la plus proche à la plus éloignée. */
export const filterParcels = (parcels: Parcel[], f: SearchFilters, myEmail: string): ParcelHit[] =>
  parcels
    .filter(p => p.status === 'publiee' && p.ownerEmail !== myEmail)
    .map(p => ({ parcel: p, distanceKm: f.commune ? distanceKm(f.commune, p.commune) : null }))
    .filter(h => h.distanceKm === null || h.distanceKm <= f.radiusKm)
    .filter(h => f.maxPrice === null || h.parcel.pricePerYear <= f.maxPrice)
    .filter(h => f.activeCode === null || h.parcel.commune.code === f.activeCode)
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0) || a.parcel.pricePerYear - b.parcel.pricePerYear)

export type Bubble = { id: string; lat: number; lon: number; count: number; label: string }

/** Une bulle par commune avec le nombre de jardins disponibles (comme sur la maquette d'origine). */
export const groupByCommune = (hits: ParcelHit[]): Bubble[] => {
  const map = new Map<string, Bubble>()
  for (const { parcel: p } of hits) {
    const b = map.get(p.commune.code)
    if (b) b.count += 1
    else map.set(p.commune.code, { id: p.commune.code, lat: p.commune.lat, lon: p.commune.lon, count: 1, label: p.commune.nom })
  }
  return [...map.values()]
}

/** Problèmes empêchant de publier l'annonce (liste vide = valide). */
export const draftIssues = (d: ParcelDraft): string[] => {
  const issues: string[] = []
  if (!d.title.trim()) issues.push("Donnez un titre à l'annonce.")
  if (!d.commune) issues.push('Choisissez la commune du terrain.')
  if (!(d.surface >= MIN_SURFACE)) issues.push(`La surface minimale est de ${MIN_SURFACE} m².`)
  else {
    const { min, max } = priceBounds(d.surface)
    if (!(d.pricePerYear >= min && d.pricePerYear <= max)) issues.push(`Le loyer annuel doit être compris entre ${min} € et ${max} € pour cette surface.`)
  }
  if (!d.access.trim()) issues.push("Indiquez les jours et horaires d'accès.")
  if (!(d.maxPeople >= 1)) issues.push('Indiquez le nombre de personnes pouvant être présentes en même temps.')
  if (!d.address.trim()) issues.push("Renseignez l'adresse du terrain (communiquée seulement après paiement).")
  if (d.toolsProvided && d.toolsPricePerYear < 0) issues.push('La participation aux outils ne peut pas être négative.')
  return issues
}
