import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/store/queries/firebase'
import { nowIso } from '@/helpers/dates'
import { MAX_ITEMS } from '@/helpers/harvests'
import { formatAccess } from '@/helpers/schedule'
import { toSlots } from '@/store/queries/parcels'
import { toCommune } from '@/store/queries/users'
import type { Commune, HarvestDraft, HarvestItem, HarvestKind, HarvestOffer, HarvestStatus, Profile } from '@/types'

const HARVESTS = 'cueillettes'

const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const month = (v: unknown, fallback: number): number => (typeof v === 'number' && Number.isInteger(v) && v >= 1 && v <= 12 ? v : fallback)
export const kind = (v: unknown): HarvestKind => (v === 'aromatique' || v === 'legume' || v === 'autre' ? v : 'fruit')
const status = (v: unknown): HarvestStatus => (v === 'fermee' ? 'fermee' : 'ouverte')
const urls = (v: unknown): string[] => (Array.isArray(v) ? v.filter((u): u is string => typeof u === 'string' && u !== '') : [])

/** Lecture tolérante d'une essence ; `null` si elle n'a pas de nom. */
const toItem = (v: unknown): HarvestItem | null => {
  const d = v as Partial<Record<keyof HarvestItem, unknown>> | null
  if (!d || typeof d !== 'object') return null
  const name = str(d.name).trim()
  if (!name) return null
  return { name, kind: kind(d.kind), fromMonth: month(d.fromMonth, 1), toMonth: month(d.toMonth, 12), note: str(d.note) }
}

const toItems = (v: unknown): HarvestItem[] =>
  Array.isArray(v) ? v.map(toItem).filter((i): i is HarvestItem => i !== null).slice(0, MAX_ITEMS) : []

/** Lecture tolérante d'un document `cueillettes/{id}`. Renvoie `null` si la commune est illisible. */
export const toHarvest = (id: string, d: Record<string, unknown>): HarvestOffer | null => {
  const commune = toCommune(d.commune)
  if (!commune) return null
  return {
    id,
    ownerEmail: str(d.ownerEmail),
    ownerName: str(d.ownerName),
    title: str(d.title),
    description: str(d.description),
    items: toItems(d.items),
    instructions: str(d.instructions),
    accessSlots: toSlots(d.accessSlots),
    commune,
    phone: str(d.phone),
    photoUrls: urls(d.photoUrls),
    status: status(d.status),
    createdAt: str(d.createdAt),
    updatedAt: str(d.updatedAt),
  }
}

/** Nouvel identifiant d'offre (généré côté client). */
export const newHarvestId = (): string => doc(collection(db, HARVESTS)).id

/** Publie ou met à jour une offre. */
export const saveHarvest = (id: string, draft: HarvestDraft & { commune: Commune }, owner: Profile, existing: HarvestOffer | null): Promise<void> => {
  const now = nowIso()
  return setDoc(doc(db, HARVESTS, id), {
    id,
    ownerEmail: owner.email,
    ownerName: owner.name,
    title: draft.title.trim(),
    description: draft.description.trim(),
    items: draft.items.map(i => ({ name: i.name.trim(), kind: i.kind, fromMonth: i.fromMonth, toMonth: i.toMonth, note: i.note.trim() })),
    instructions: draft.instructions.trim(),
    accessSlots: draft.accessSlots,
    access: formatAccess(draft.accessSlots),
    commune: draft.commune,
    phone: draft.phone.trim(),
    photoUrls: draft.photoUrls,
    status: existing?.status ?? 'ouverte',
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  })
}

/** Ferme l'offre (retirée de la liste) ou la rouvre. */
export const setHarvestStatus = (id: string, next: HarvestStatus): Promise<void> => updateDoc(doc(db, HARVESTS, id), { status: next, updatedAt: nowIso() })

export const deleteHarvest = (id: string): Promise<void> => deleteDoc(doc(db, HARVESTS, id))
