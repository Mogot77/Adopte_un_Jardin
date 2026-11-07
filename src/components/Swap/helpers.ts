import { filterPlants, PLANT_KIND_LABELS, quantityLabel, type PlantFilters } from '@/helpers/plants'
import { buildPlantCard } from '@/components/PlantCard'
import type { Plant } from '@/types'
import type { SwapModel } from './types'

/** Dons disponibles près de la recherche, et dons du compte (tous statuts, du plus récent au plus ancien). */
export const buildSwapModel = (open: Plant[], mine: Plant[], f: PlantFilters, myEmail: string): SwapModel => ({
  cards: filterPlants(open, f, myEmail).map(h => buildPlantCard(h.plant, h.distanceKm)),
  mine: [...mine]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(p => ({
      id: p.id,
      title: p.title,
      kindLabel: PLANT_KIND_LABELS[p.kind],
      quantityLabel: quantityLabel(p.kind, p.quantity),
      communeLabel: `${p.commune.nom} (${p.commune.dept})`,
      status: p.status,
    })),
})
