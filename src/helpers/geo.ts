/* Géographie : distances et centrage de carte. */
export type LatLon = { lat: number; lon: number }

/** Centre de la France métropolitaine (carte sans commune choisie). */
export const FRANCE_CENTER: LatLon = { lat: 46.6, lon: 2.4 }

const rad = (d: number): number => (d * Math.PI) / 180

/** Distance à vol d'oiseau en kilomètres (formule de haversine). */
export const distanceKm = (a: LatLon, b: LatLon): number => {
  const dLat = rad(b.lat - a.lat)
  const dLon = rad(b.lon - a.lon)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2
  return 6371 * 2 * Math.asin(Math.sqrt(h))
}

/** Niveau de zoom adapté à un rayon de recherche. */
export const zoomForRadius = (radiusKm: number): number => (radiusKm <= 5 ? 12 : radiusKm <= 10 ? 11 : radiusKm <= 20 ? 10 : radiusKm <= 50 ? 9 : 7)
