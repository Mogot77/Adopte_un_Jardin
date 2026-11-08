/* Production des jardins : saisie des récoltes (kg par culture), totaux par jardin et compteur d'impact de l'accueil. */
import { TODAY } from '@/helpers/dates'
import { MONTH_INITIALS, MONTH_NAMES } from '@/helpers/harvests'
import type { HarvestKind, ImpactMonth, YieldDraft, YieldEntry } from '@/types'

/** Poids maximal d'une saisie, en kg (garde-fou contre les fautes de frappe ; les règles Firestore le répètent). */
export const MAX_KG = 500

/** Cultures proposées à la saisie ; choisir l'une d'elles règle le type automatiquement. */
export const CROP_SUGGESTIONS: { name: string; kind: HarvestKind }[] = [
  { name: 'Cerises', kind: 'fruit' }, { name: 'Pommes', kind: 'fruit' }, { name: 'Poires', kind: 'fruit' }, { name: 'Prunes', kind: 'fruit' },
  { name: 'Fraises', kind: 'fruit' }, { name: 'Framboises', kind: 'fruit' }, { name: 'Figues', kind: 'fruit' }, { name: 'Raisin', kind: 'fruit' },
  { name: 'Courgettes', kind: 'legume' }, { name: 'Tomates', kind: 'legume' }, { name: 'Haricots', kind: 'legume' }, { name: 'Salades', kind: 'legume' },
  { name: 'Pommes de terre', kind: 'legume' }, { name: 'Carottes', kind: 'legume' }, { name: 'Courges', kind: 'legume' }, { name: 'Poireaux', kind: 'legume' },
  { name: 'Thym', kind: 'aromatique' }, { name: 'Basilic', kind: 'aromatique' }, { name: 'Menthe', kind: 'aromatique' }, { name: 'Persil', kind: 'aromatique' },
]

const norm = (s: string): string => s.trim().toLowerCase()

/** Type d'une culture connue (« cerises » → fruit), ou `null`. */
export const kindForCrop = (name: string): HarvestKind | null => CROP_SUGGESTIONS.find(s => norm(s.name) === norm(name))?.kind ?? null

/** Arrondit un poids au dixième de kg. */
export const roundKg = (kg: number): number => Math.round(kg * 10) / 10

/** « 12,5 kg », « 1 234 kg ». */
export const fmtKg = (kg: number): string => `${roundKg(kg).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} kg`

/** Brouillon vide : date du jour, poids à saisir. */
export const emptyYieldDraft = (today: string = TODAY): YieldDraft => ({ crop: '', kind: 'fruit', kg: 0, date: today })

/** Problèmes empêchant d'enregistrer la saisie (liste vide = valide). */
export const yieldIssues = (d: YieldDraft, today: string = TODAY): string[] => {
  const issues: string[] = []
  if (!d.crop.trim()) issues.push('Indiquez la culture récoltée (ex. « Cerises »).')
  if (!Number.isFinite(d.kg) || d.kg <= 0 || d.kg > MAX_KG) issues.push(`Le poids doit être compris entre 0,1 et ${MAX_KG} kg.`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d.date)) issues.push('Indiquez la date de la récolte.')
  else if (d.date > today) issues.push('La date de récolte ne peut pas être dans le futur.')
  return issues
}

/** Total d'une culture sur un jardin. */
export type CropTotal = { key: string; name: string; kind: HarvestKind; kg: number; count: number }

/** Totaux par culture (« cerises » et « Cerises » comptent ensemble), du plus lourd au plus léger. */
export const totalsByCrop = (entries: YieldEntry[]): CropTotal[] => {
  const map = new Map<string, CropTotal>()
  for (const e of entries) {
    const key = norm(e.crop)
    const t = map.get(key)
    if (t) { t.kg += e.kg; t.count += 1 } else map.set(key, { key, name: e.crop.trim(), kind: e.kind, kg: e.kg, count: 1 })
  }
  return [...map.values()].map(t => ({ ...t, kg: roundKg(t.kg) })).sort((a, b) => b.kg - a.kg || a.name.localeCompare(b.name, 'fr'))
}

/** Poids total des saisies. */
export const totalKg = (entries: YieldEntry[]): number => roundKg(entries.reduce((s, e) => s + e.kg, 0))

export type ImpactTotals = { fruit: number; legume: number; other: number; all: number; count: number }
/** Un mois de l'infographie : kilos par type (aromatiques et autres regroupés). */
export type ImpactBar = { month: string; initial: string; name: string; fruit: number; legume: number; other: number; total: number }

const pos = (v: number): number => (Number.isFinite(v) && v > 0 ? v : 0)

/** Totaux depuis le lancement (tous les mois lus) et douze derniers mois jusqu'au mois de `today`. */
export const buildImpact = (months: ImpactMonth[], today: string = TODAY): { totals: ImpactTotals; bars: ImpactBar[] } => {
  const totals: ImpactTotals = { fruit: 0, legume: 0, other: 0, all: 0, count: 0 }
  const byMonth = new Map<string, ImpactMonth>()
  for (const m of months) {
    byMonth.set(m.month, m)
    totals.fruit += pos(m.fruit)
    totals.legume += pos(m.legume)
    totals.other += pos(m.aromatique) + pos(m.autre)
    totals.count += pos(m.count)
  }
  totals.all = totals.fruit + totals.legume + totals.other
  const y = Number(today.slice(0, 4))
  const m0 = Number(today.slice(5, 7)) - 1
  const bars = Array.from({ length: 12 }, (_, i): ImpactBar => {
    const idx = y * 12 + m0 - (11 - i)
    const year = Math.floor(idx / 12)
    const mi = idx % 12
    const key = `${year}-${String(mi + 1).padStart(2, '0')}`
    const d = byMonth.get(key)
    const fruit = d ? pos(d.fruit) : 0
    const legume = d ? pos(d.legume) : 0
    const other = d ? pos(d.aromatique) + pos(d.autre) : 0
    return { month: key, initial: MONTH_INITIALS[mi], name: `${MONTH_NAMES[mi]} ${year}`, fruit, legume, other, total: fruit + legume + other }
  })
  return { totals, bars }
}
