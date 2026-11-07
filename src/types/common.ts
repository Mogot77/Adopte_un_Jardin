/** Commune française (source : geo.api.gouv.fr). Les coordonnées sont celles du centre de la commune. */
export type Commune = {
  code: string
  nom: string
  lat: number
  lon: number
  dept: string
}
