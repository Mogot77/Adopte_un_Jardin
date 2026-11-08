import { collection, doc, increment, onSnapshot, query, where, writeBatch, type QuerySnapshot } from 'firebase/firestore'
import { db } from '@/store/queries/firebase'
import { nowIso } from '@/helpers/dates'
import { roundKg } from '@/helpers/production'
import { kind } from '@/store/queries/harvests'
import type { HarvestKind, ImpactMonth, YieldDraft, YieldEntry, YieldSourceType } from '@/types'

const YIELDS = 'recoltes'
const STATS = 'stats'

const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0)

/** Lecture tolérante d'un document `recoltes/{id}`. Renvoie `null` s'il est inexploitable. */
export const toYield = (id: string, d: Record<string, unknown>): YieldEntry | null => {
  const sourceType: YieldSourceType = d.sourceType === 'cueillette' ? 'cueillette' : 'parcelle'
  const kg = num(d.kg)
  const crop = str(d.crop).trim()
  if (!crop || kg <= 0) return null
  return {
    id, sourceType, sourceId: str(d.sourceId), ownerEmail: str(d.ownerEmail), authorEmail: str(d.authorEmail),
    crop, kind: kind(d.kind), kg, date: str(d.date), createdAt: str(d.createdAt),
  }
}

/** Lecture d'un document `stats/AAAA-MM` (l'identifiant est le mois). */
export const toImpactMonth = (id: string, d: Record<string, unknown>): ImpactMonth => ({
  month: id, fruit: num(d.fruit), legume: num(d.legume), aromatique: num(d.aromatique), autre: num(d.autre), count: num(d.count),
})

/** Nouvel identifiant de saisie (généré côté client). */
export const newYieldId = (): string => doc(collection(db, YIELDS)).id

/** Incréments du compteur du mois : les quatre types sont toujours écrits (les règles l'exigent), un seul bouge. */
const bump = (k: HarvestKind, kg: number, sign: 1 | -1) => ({
  fruit: increment(k === 'fruit' ? sign * kg : 0),
  legume: increment(k === 'legume' ? sign * kg : 0),
  aromatique: increment(k === 'aromatique' ? sign * kg : 0),
  autre: increment(k === 'autre' ? sign * kg : 0),
  count: increment(sign),
})

export type YieldSource = { type: YieldSourceType; id: string; ownerEmail: string }

/** Enregistre une saisie et ajoute son poids au compteur public du mois de la récolte, dans un même lot. */
export const saveYield = (id: string, draft: YieldDraft, source: YieldSource, authorEmail: string): Promise<void> => {
  const kg = roundKg(draft.kg)
  const batch = writeBatch(db)
  batch.set(doc(db, YIELDS, id), {
    id, sourceType: source.type, sourceId: source.id, ownerEmail: source.ownerEmail, authorEmail,
    crop: draft.crop.trim(), kind: draft.kind, kg, date: draft.date, createdAt: nowIso(),
  })
  batch.set(doc(db, STATS, draft.date.slice(0, 7)), bump(draft.kind, kg, 1), { merge: true })
  return batch.commit()
}

/** Supprime une saisie et retire son poids du compteur (correction d'une erreur). */
export const deleteYield = (e: YieldEntry): Promise<void> => {
  const batch = writeBatch(db)
  batch.delete(doc(db, YIELDS, e.id))
  batch.set(doc(db, STATS, e.date.slice(0, 7)), bump(e.kind, e.kg, -1), { merge: true })
  return batch.commit()
}

const entries = (s: QuerySnapshot): YieldEntry[] => s.docs.map(d => toYield(d.id, d.data())).filter((e): e is YieldEntry => e !== null)

/** Saisies d'un jardin visibles du compte : les siennes et, s'il en est le propriétaire, toutes celles de son jardin.
 *  Deux requêtes (une contrainte d'égalité chacune, exigée par les règles) fusionnées par identifiant. */
export const watchYields = (sourceId: string, email: string, onData: (list: YieldEntry[]) => void, onError: (e: unknown) => void): (() => void) => {
  let mine: YieldEntry[] = []
  let owned: YieldEntry[] = []
  const emit = () => onData([...new Map([...owned, ...mine].map(e => [e.id, e])).values()])
  const a = onSnapshot(query(collection(db, YIELDS), where('sourceId', '==', sourceId), where('authorEmail', '==', email)), s => { mine = entries(s); emit() }, onError)
  const b = onSnapshot(query(collection(db, YIELDS), where('sourceId', '==', sourceId), where('ownerEmail', '==', email)), s => { owned = entries(s); emit() }, onError)
  return () => { a(); b() }
}

/** Compteurs publics de tous les mois (une poignée de documents, lisibles même sans connexion). */
export const watchImpact = (onData: (months: ImpactMonth[]) => void, onError: (e: unknown) => void): (() => void) =>
  onSnapshot(collection(db, STATS), s => onData(s.docs.map(d => toImpactMonth(d.id, d.data()))), onError)
