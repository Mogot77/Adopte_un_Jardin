import { offerState, seasonLabel, seasonState, SEASON_STATE_LABELS } from '@/helpers/harvests'
import type { HarvestOffer } from '@/types'
import type { HarvestCardModel } from './types'

const SHOWN_ITEMS = 3

/** Modèle d'affichage d'une offre dans une liste, pour le mois donné (1 à 12). */
export const buildHarvestCard = (o: HarvestOffer, distanceKm: number | null, month: number): HarvestCardModel => {
  const state = offerState(o.items, month)
  return {
    id: o.id,
    title: o.title,
    communeLabel: `${o.commune.nom} (${o.commune.dept})`,
    ownerName: o.ownerName,
    photoUrls: o.photoUrls,
    distanceLabel: distanceKm === null ? '' : `${distanceKm.toLocaleString('fr-FR', { maximumFractionDigits: 1 })} km`,
    state,
    stateLabel: SEASON_STATE_LABELS[state],
    items: o.items.slice(0, SHOWN_ITEMS).map(i => ({ name: i.name, seasonText: seasonLabel(i), state: seasonState(i, month) })),
    moreCount: Math.max(0, o.items.length - SHOWN_ITEMS),
  }
}
