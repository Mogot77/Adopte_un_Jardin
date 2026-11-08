import { TODAY } from '@/helpers/dates'
import { buildImpact, estimateSavings, fmtCo2, fmtKg } from '@/helpers/production'
import type { ImpactMonth } from '@/types'
import type { ImpactModel } from './types'

const pct = (part: number, whole: number): number => (whole > 0 ? (part / whole) * 100 : 0)

/** Modèle de l'infographie : totaux depuis le lancement et évolution des douze derniers mois. */
export const buildImpactModel = (months: ImpactMonth[], today: string = TODAY): ImpactModel => {
  const { totals, bars } = buildImpact(months, today)
  const saved = estimateSavings(totals)
  const maxBar = Math.max(0, ...bars.map(b => b.total))
  return {
    totalLabel: fmtKg(totals.all),
    isEmpty: totals.all <= 0,
    savedEurLabel: `${Math.round(saved.eur).toLocaleString('fr-FR')} €`,
    co2Label: fmtCo2(saved.co2Kg),
    harvestsLabel: `${Math.round(totals.count)} récolte${totals.count >= 2 ? 's' : ''} notée${totals.count >= 2 ? 's' : ''}`,
    counters: [
      { key: 'fruit', label: 'de fruits', kgLabel: fmtKg(totals.fruit) },
      { key: 'legume', label: 'de légumes', kgLabel: fmtKg(totals.legume) },
      { key: 'other', label: "d'aromatiques et autres", kgLabel: fmtKg(totals.other) },
    ],
    bars: bars.map(b => ({
      month: b.month,
      initial: b.initial,
      title: b.total > 0 ? `${b.name} : ${fmtKg(b.total)}` : `${b.name} : rien de noté`,
      heightPct: b.total > 0 ? Math.max(6, pct(b.total, maxBar)) : 0,
      fruitPct: pct(b.fruit, b.total),
      legumePct: pct(b.legume, b.total),
      otherPct: pct(b.other, b.total),
      current: b.month === today.slice(0, 7),
    })),
  }
}
