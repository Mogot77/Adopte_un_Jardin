import { PLANT_KIND_LABELS, quantityLabel } from '@/helpers/plants'
import type { Plant } from '@/types'
import type { PlantCardModel } from './types'

/** Modèle d'affichage d'un don dans une liste. */
export const buildPlantCard = (p: Plant, distanceKm: number | null): PlantCardModel => ({
  id: p.id,
  title: p.title,
  kindLabel: PLANT_KIND_LABELS[p.kind],
  quantityLabel: quantityLabel(p.kind, p.quantity),
  communeLabel: `${p.commune.nom} (${p.commune.dept})`,
  ownerName: p.ownerName,
  photoUrls: p.photoUrls,
  distanceLabel: distanceKm === null ? '' : `${distanceKm.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} km`,
})
