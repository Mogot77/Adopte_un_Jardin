import { fmtDate } from '@/helpers/dates'
import { HARVEST_KIND_LABELS } from '@/helpers/harvests'
import { fmtKg, totalKg, totalsByCrop } from '@/helpers/production'
import type { YieldEntry } from '@/types'
import type { ProductionModel } from './types'

/** Modèle d'affichage : total, totaux par culture et saisies (la plus récente d'abord). */
export const buildProductionModel = (entries: YieldEntry[], myEmail: string): ProductionModel => ({
  totalLabel: fmtKg(totalKg(entries)),
  crops: totalsByCrop(entries).map(c => ({
    key: c.key, name: c.name, kindLabel: HARVEST_KIND_LABELS[c.kind], kgLabel: fmtKg(c.kg), countLabel: `${c.count} récolte${c.count > 1 ? 's' : ''}`,
  })),
  entries: [...entries]
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))
    .map(e => ({ id: e.id, cropName: e.crop, kgLabel: fmtKg(e.kg), dateLabel: fmtDate(e.date), mine: e.authorEmail === myEmail })),
})
