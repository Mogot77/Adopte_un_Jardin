import { buildHarvestCard } from '@/components/HarvestCard'
import { filterHarvests, MONTH_NAMES, offerState, SEASON_STATE_LABELS, type HarvestFilters } from '@/helpers/harvests'
import type { HarvestOffer } from '@/types'
import type { HarvestsModel } from './types'

/** Offres ouvertes près de la recherche, et offres du compte (tous statuts, de la plus récente à la plus ancienne). */
export const buildHarvestsModel = (open: HarvestOffer[], mine: HarvestOffer[], f: HarvestFilters, myEmail: string): HarvestsModel => ({
  cards: filterHarvests(open, f, myEmail).map(h => buildHarvestCard(h.offer, h.distanceKm, f.month)),
  mine: [...mine]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(o => ({
      id: o.id,
      title: o.title,
      communeLabel: `${o.commune.nom} (${o.commune.dept})`,
      summary: `${o.items.length} essence${o.items.length > 1 ? 's' : ''} · ${SEASON_STATE_LABELS[offerState(o.items, f.month)]}`,
      status: o.status,
    })),
  monthName: MONTH_NAMES[f.month - 1],
})
