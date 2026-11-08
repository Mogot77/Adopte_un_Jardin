/* « À cueillir » : essences, saisons de récolte, filtrage de la liste et validation du formulaire. */
import { TODAY } from '@/helpers/dates'
import { distanceKm } from '@/helpers/geo'
import { slotsValid } from '@/helpers/schedule'
import type { Commune, HarvestDraft, HarvestItem, HarvestKind, HarvestOffer } from '@/types'

export const HARVEST_KINDS: { value: HarvestKind; label: string }[] = [
  { value: 'fruit', label: 'Fruitier' },
  { value: 'aromatique', label: 'Aromatique' },
  { value: 'legume', label: 'Légume' },
  { value: 'autre', label: 'Autre' },
]

export const HARVEST_KIND_LABELS: Record<HarvestKind, string> = { fruit: 'Fruitier', aromatique: 'Aromatique', legume: 'Légume', autre: 'Autre' }

export const MONTH_NAMES: string[] = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
export const MONTH_INITIALS: string[] = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

/** Nombre maximal d'essences par offre. */
export const MAX_ITEMS = 12
/** Une période est « bientôt » si elle commence dans ce nombre de mois ou moins. */
export const SOON_MONTHS = 2

/** Mois (1 à 12) d'une date AAAA-MM-JJ ; par défaut aujourd'hui. */
export const monthOf = (today: string = TODAY): number => Number(today.slice(5, 7))

type Period = Pick<HarvestItem, 'fromMonth' | 'toMonth'>

/** Vrai si le mois (1 à 12) tombe dans la période ; une période comme novembre → février enjambe l'année. */
export const isInSeason = (p: Period, month: number): boolean =>
  p.fromMonth <= p.toMonth ? month >= p.fromMonth && month <= p.toMonth : month >= p.fromMonth || month <= p.toMonth

/** Nombre de mois avant le début de la période (0 si elle est en cours). */
export const monthsUntil = (p: Period, month: number): number => (isInSeason(p, month) ? 0 : (p.fromMonth - month + 12) % 12)

/** `now` : à cueillir ce mois-ci ; `soon` : commence dans `SOON_MONTHS` mois ou moins ; `later` : plus tard. */
export type SeasonState = 'now' | 'soon' | 'later'

export const seasonState = (p: Period, month: number): SeasonState => {
  const wait = monthsUntil(p, month)
  return wait === 0 ? 'now' : wait <= SOON_MONTHS ? 'soon' : 'later'
}

export const SEASON_STATE_LABELS: Record<SeasonState, string> = { now: 'À cueillir maintenant', soon: 'Bientôt', later: 'Hors saison' }

const RANK: Record<SeasonState, number> = { now: 0, soon: 1, later: 2 }

/** Meilleur état parmi les essences : une offre est « maintenant » dès qu'une essence est à cueillir. */
export const offerState = (items: HarvestItem[], month: number): SeasonState =>
  items.reduce<SeasonState>((best, i) => { const s = seasonState(i, month); return RANK[s] < RANK[best] ? s : best }, 'later')

const de = (m: string): string => (/^[aeiouhéèêîôû]/i.test(m) ? `d'${m}` : `de ${m}`)

/** « de mars à mai », « d'août à octobre », « en juin », « toute l'année ». */
export const seasonLabel = (p: Period): string => {
  if ((p.toMonth - p.fromMonth + 12) % 12 === 11) return "toute l'année"
  if (p.fromMonth === p.toMonth) return `en ${MONTH_NAMES[p.fromMonth - 1]}`
  return `${de(MONTH_NAMES[p.fromMonth - 1])} à ${MONTH_NAMES[p.toMonth - 1]}`
}

/** Les 12 mois de l'année : vrai pour ceux de la période. */
export const seasonMask = (p: Period): boolean[] => Array.from({ length: 12 }, (_, i) => isInSeason(p, i + 1))

/** Nouvelle ligne du formulaire. */
export const emptyItem = (): HarvestItem => ({ name: '', kind: 'fruit', fromMonth: 6, toMonth: 9, note: '' })

export type HarvestFilters = {
  commune: Commune | null
  radiusKm: number
  /** Nature recherchée (null = toutes). */
  kind: HarvestKind | null
  /** Ne garder que les offres où quelque chose est à cueillir ce mois-ci. */
  onlyNow: boolean
  /** Mois courant (1 à 12). */
  month: number
}

export type HarvestHit = { offer: HarvestOffer; distanceKm: number | null; state: SeasonState }

/** Offres ouvertes (hors les miennes) correspondant à la recherche : ce qui est à cueillir en premier, puis le plus proche. */
export const filterHarvests = (offers: HarvestOffer[], f: HarvestFilters, myEmail: string): HarvestHit[] =>
  offers
    .filter(o => o.status === 'ouverte' && o.ownerEmail !== myEmail)
    .filter(o => f.kind === null || o.items.some(i => i.kind === f.kind))
    .map(o => ({
      offer: o,
      distanceKm: f.commune ? distanceKm(f.commune, o.commune) : null,
      state: offerState(f.kind === null ? o.items : o.items.filter(i => i.kind === f.kind), f.month),
    }))
    .filter(h => h.distanceKm === null || h.distanceKm <= f.radiusKm)
    .filter(h => !f.onlyNow || h.state === 'now')
    .sort((a, b) => RANK[a.state] - RANK[b.state] || (a.distanceKm ?? 0) - (b.distanceKm ?? 0) || b.offer.createdAt.localeCompare(a.offer.createdAt))

const validMonth = (m: number): boolean => Number.isInteger(m) && m >= 1 && m <= 12

/** Problèmes empêchant de publier l'offre (liste vide = valide). */
export const harvestIssues = (d: HarvestDraft): string[] => {
  const issues: string[] = []
  if (!d.title.trim()) issues.push("Donnez un titre à l'offre (ex. « Pommiers et thym du jardin »).")
  if (!d.commune) issues.push('Choisissez la commune où se trouve le jardin.')
  if (d.items.length === 0) issues.push('Ajoutez au moins un arbre ou une plante à cueillir.')
  if (d.items.length > MAX_ITEMS) issues.push(`Une offre compte ${MAX_ITEMS} essences au plus : créez une seconde offre.`)
  if (d.items.some(i => !i.name.trim())) issues.push('Donnez un nom à chaque arbre ou plante (ex. « Pommier reinette »).')
  if (d.items.some(i => !validMonth(i.fromMonth) || !validMonth(i.toMonth))) issues.push('Choisissez, pour chaque essence, le premier et le dernier mois de la cueillette.')
  if (!slotsValid(d.accessSlots)) issues.push("Pour chaque jour de cueillette, l'heure de fin doit être après l'heure de début.")
  return issues
}
