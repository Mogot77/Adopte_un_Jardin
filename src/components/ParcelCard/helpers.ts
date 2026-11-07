import { WATER_LABELS } from '@/helpers/parcels'
import { eur, surfaceRange } from '@/helpers/pricing'
import type { Parcel } from '@/types'
import type { ParcelCardModel } from './types'

/** Modèle d'affichage d'une annonce dans une liste. */
export const buildParcelCard = (p: Parcel, distanceKm: number | null): ParcelCardModel => ({
  id: p.id,
  title: p.title,
  communeLabel: `${p.commune.nom} (${p.commune.dept})`,
  surfaceLabel: `${p.surface} m² · ${surfaceRange(p.surface)}`,
  priceLabel: `${eur(p.pricePerYear)} / an`,
  photoUrl: p.photoUrl,
  tags: [
    ...(p.toolsProvided ? ['Outils fournis'] : []),
    ...(p.water !== 'aucune' ? [WATER_LABELS[p.water]] : []),
    ...(p.toilets ? ['Sanitaires'] : []),
  ],
  distanceLabel: distanceKm === null ? '' : `${distanceKm.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} km`,
})
