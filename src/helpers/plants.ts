/* Troc de plantes : libellés, filtrage de la liste et validation du formulaire de don. */
import { distanceKm } from '@/helpers/geo'
import type { Commune, Plant, PlantDraft, PlantKind } from '@/types'

export const PLANT_KINDS: { value: PlantKind; label: string }[] = [
  { value: 'plant', label: 'Plants' },
  { value: 'semis', label: 'Semis' },
  { value: 'graines', label: 'Graines' },
  { value: 'bouture', label: 'Boutures' },
]

export const PLANT_KIND_LABELS: Record<PlantKind, string> = { plant: 'Plants', semis: 'Semis', graines: 'Graines', bouture: 'Boutures' }

/** Quantité maximale d'une annonce. */
export const MAX_QUANTITY = 999

/** « 3 plants », « 1 sachet de graines », « 12 semis »... */
export const quantityLabel = (kind: PlantKind, q: number): string => {
  const s = q > 1
  switch (kind) {
    case 'plant': return `${q} plant${s ? 's' : ''}`
    case 'semis': return `${q} semis`
    case 'graines': return `${q} sachet${s ? 's' : ''} de graines`
    case 'bouture': return `${q} bouture${s ? 's' : ''}`
  }
}

export type PlantFilters = {
  commune: Commune | null
  radiusKm: number
  /** Nature recherchée (null = toutes). */
  kind: PlantKind | null
}

export type PlantHit = { plant: Plant; distanceKm: number | null }

/** Annonces disponibles (hors les miennes) correspondant à la recherche, de la plus proche à la plus éloignée. */
export const filterPlants = (plants: Plant[], f: PlantFilters, myEmail: string): PlantHit[] =>
  plants
    .filter(p => p.status === 'disponible' && p.ownerEmail !== myEmail)
    .filter(p => f.kind === null || p.kind === f.kind)
    .map(p => ({ plant: p, distanceKm: f.commune ? distanceKm(f.commune, p.commune) : null }))
    .filter(h => h.distanceKm === null || h.distanceKm <= f.radiusKm)
    .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0) || b.plant.createdAt.localeCompare(a.plant.createdAt))

/** Problèmes empêchant de publier le don (liste vide = valide). */
export const plantIssues = (d: PlantDraft): string[] => {
  const issues: string[] = []
  if (!d.title.trim()) issues.push("Donnez un titre à l'annonce (ex. « Plants de tomates cœur de bœuf »).")
  if (!d.commune) issues.push('Choisissez la commune où se fera la remise.')
  if (!Number.isInteger(d.quantity) || d.quantity < 1 || d.quantity > MAX_QUANTITY) issues.push(`La quantité doit être un nombre entier entre 1 et ${MAX_QUANTITY}.`)
  return issues
}
