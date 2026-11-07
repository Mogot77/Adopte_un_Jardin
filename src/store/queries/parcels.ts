import { doc, getDoc, updateDoc, writeBatch, collection } from 'firebase/firestore'
import { db } from '@/store/queries/firebase'
import { nowIso } from '@/helpers/dates'
import { formatAccess } from '@/helpers/schedule'
import { toCommune } from '@/store/queries/users'
import type { AccessSlot, Commune, Parcel, ParcelDraft, ParcelPrivate, Profile, WaterAccess } from '@/types'

const PARCELS = 'parcelles'
const PRIVATE = 'adresses'

const str = (v: unknown): string => (typeof v === 'string' ? v : '')
const num = (v: unknown): number => (typeof v === 'number' && Number.isFinite(v) ? v : 0)
/** Liste d'URL de photos ; accepte l'ancien champ unique `photoUrl`. */
const photos = (d: Record<string, unknown>): string[] => {
  const list = Array.isArray(d.photoUrls) ? d.photoUrls.filter((u): u is string => typeof u === 'string' && u !== '') : []
  return list.length > 0 ? list : str(d.photoUrl) ? [str(d.photoUrl)] : []
}
const TIME = /^d{2}:d{2}$/
/** Plages d'accès valides uniquement, triées par jour. */
const slots = (v: unknown): AccessSlot[] => {
  if (!Array.isArray(v)) return []
  return v.flatMap((s: unknown): AccessSlot[] => {
    if (typeof s !== 'object' || s === null) return []
    const o = s as Record<string, unknown>
    const day = o.day
    return typeof day === 'number' && Number.isInteger(day) && day >= 0 && day <= 6 && typeof o.from === 'string' && TIME.test(o.from) && typeof o.to === 'string' && TIME.test(o.to)
      ? [{ day, from: o.from, to: o.to }] : []
  }).sort((a, b) => a.day - b.day)
}
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
    accessSlots: slots(d.accessSlots),
    maxPeople: num(d.maxPeople),
    toilets: d.toilets === true,
    equipment: str(d.equipment),
    photoUrls: photos(d),
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
    access: formatAccess(pub.accessSlots),
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

