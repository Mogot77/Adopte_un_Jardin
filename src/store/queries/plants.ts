import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '@/store/queries/firebase'
import { nowIso } from '@/helpers/dates'
import { toCommune } from '@/store/queries/users'
import type { Commune, Plant, PlantDraft, PlantKind, PlantStatus, Profile } from '@/types'

const PLANTS = 'plantes'

const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0)
const kind = (v: unknown): PlantKind => (v === 'semis' || v === 'graines' || v === 'bouture' ? v : 'plant')
const status = (v: unknown): PlantStatus => (v === 'donne' ? 'donne' : 'disponible')
const urls = (v: unknown): string[] => (Array.isArray(v) ? v.filter((u): u is string => typeof u === 'string' && u !== '') : [])

/** Lecture tolérante d'un document `plantes/{id}`. Renvoie `null` si la commune est illisible. */
export const toPlant = (id: string, d: Record<string, unknown>): Plant | null => {
  const commune = toCommune(d.commune)
  if (!commune) return null
  return {
    id,
    ownerEmail: str(d.ownerEmail),
    ownerName: str(d.ownerName),
    kind: kind(d.kind),
    title: str(d.title),
    description: str(d.description),
    quantity: num(d.quantity),
    commune,
    phone: str(d.phone),
    photoUrls: urls(d.photoUrls),
    status: status(d.status),
    createdAt: str(d.createdAt),
    updatedAt: str(d.updatedAt),
  }
}

/** Nouvel identifiant d'annonce (généré côté client). */
export const newPlantId = (): string => doc(collection(db, PLANTS)).id

/** Publie ou met à jour une annonce de don. */
export const savePlant = (id: string, draft: PlantDraft & { commune: Commune }, owner: Profile, existing: Plant | null): Promise<void> => {
  const now = nowIso()
  return setDoc(doc(db, PLANTS, id), {
    id,
    ownerEmail: owner.email,
    ownerName: owner.name,
    kind: draft.kind,
    title: draft.title.trim(),
    description: draft.description.trim(),
    quantity: draft.quantity,
    commune: draft.commune,
    phone: draft.phone.trim(),
    photoUrls: draft.photoUrls,
    status: existing?.status ?? 'disponible',
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  })
}

/** Marque le don comme fait (retiré de la liste) ou le remet à disposition. */
export const setPlantStatus = (id: string, next: PlantStatus): Promise<void> => updateDoc(doc(db, PLANTS, id), { status: next, updatedAt: nowIso() })

export const deletePlant = (id: string): Promise<void> => deleteDoc(doc(db, PLANTS, id))
