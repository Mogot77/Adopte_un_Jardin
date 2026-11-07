import { doc, getDoc, updateDoc, writeBatch, collection } from 'firebase/firestore'
import { db } from '@/store/queries/firebase'
import { nowIso } from '@/helpers/dates'
import { toCommune } from '@/store/queries/users'
import type { Commune, Parcel, ParcelDraft, ParcelPrivate, Profile, WaterAccess } from '@/types'

const PARCELS = 'parcelles'
const PRIVATE = 'adresses'

const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0)
const water = (v: unknown): WaterAccess => (v === 'robinet' || v === 'cuve' ? v : 'aucune')
const status = (v: unknown): Parcel['status'] => (v === 'reservee' || v === 'retiree' ? v : 'publiee')

/** Lecture tolérante d'un document `parcelles/{id}`. Renvoie `null` si la commune est illisible. */
export const toParcel = (id: string, d: Record<string, unknown>): Parcel | null => {
  const commune = toCommune(d.commune)
  if (!commune) return null
  return {
    id,
    ownerEmail: str(d.ownerEmail),
    ownerName: str(d.ownerName),
    title: str(d.title),
    description: str(d.description),
    commune,
    surface: num(d.surface),
    pricePerYear: num(d.pricePerYear),
    toolsProvided: d.toolsProvided === true,
    toolsPricePerYear: num(d.toolsPricePerYear),
    water: water(d.water),
    waterMeter: d.waterMeter === true,
    access: str(d.access),
    maxPeople: num(d.maxPeople),
    toilets: d.toilets === true,
    equipment: str(d.equipment),
    photoUrl: str(d.photoUrl),
    status: status(d.status),
    gardenerEmail: str(d.gardenerEmail),
    createdAt: str(d.createdAt),
    updatedAt: str(d.updatedAt),
  }
}

/** Nouvel identifiant d'annonce (généré côté client). */
export const newParcelId = (): string => doc(collection(db, PARCELS)).id

/** Publie ou met à jour une annonce et ses coordonnées privées (une seule écriture atomique). */
export const saveParcel = async (id: string, draft: ParcelDraft & { commune: Commune }, owner: Profile, existing: Parcel | null): Promise<void> => {
  const now = nowIso()
  const { address, phone, ...pub } = draft
  const batch = writeBatch(db)
  batch.set(doc(db, PARCELS, id), {
    ...pub,
    title: pub.title.trim(),
    description: pub.description.trim(),
    access: pub.access.trim(),
    equipment: pub.equipment.trim(),
    toolsPricePerYear: pub.toolsProvided ? pub.toolsPricePerYear : 0,
    id,
    ownerEmail: owner.email,
    ownerName: owner.name,
    status: 'publiee',
    gardenerEmail: '',
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  })
  batch.set(doc(db, PRIVATE, id), { id, ownerEmail: owner.email, address: address.trim(), phone: phone.trim() })
  await batch.commit()
}

/** Retire l'annonce de la recherche (impossible si elle est réservée : voir les règles Firestore). */
export const withdrawParcel = (id: string): Promise<void> => updateDoc(doc(db, PARCELS, id), { status: 'retiree', updatedAt: nowIso() })

/** Coordonnées exactes d'une annonce, ou `null` si elles n'existent pas ou ne sont pas accessibles (réservation non payée). */
export const fetchPrivate = async (id: string): Promise<ParcelPrivate | null> => {
  try {
    const snap = await getDoc(doc(db, PRIVATE, id))
    if (!snap.exists()) return null
    const d = snap.data()
    return { id, ownerEmail: str(d.ownerEmail), address: str(d.address), phone: str(d.phone) }
  } catch { return null }
}

