import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/store/queries/firebase'
import { normRole } from '@/helpers/roles'
import { nowIso } from '@/helpers/dates'
import type { Commune, Profile } from '@/types'

const COL = 'users'

const str = (v: unknown): string => (typeof v === 'string' ? v : '')

/** Lecture tolérante d'une commune stockée. */
export const toCommune = (v: unknown): Commune | null => {
  const c = v as Partial<Commune> | null
  return c && typeof c.code === 'string' && typeof c.nom === 'string' && typeof c.lat === 'number' && typeof c.lon === 'number'
    ? { code: c.code, nom: c.nom, lat: c.lat, lon: c.lon, dept: str(c.dept) }
    : null
}

export const toProfile = (email: string, d: Record<string, unknown>): Profile => ({
  email,
  name: str(d.name),
  phone: str(d.phone),
  commune: toCommune(d.commune),
  wantsGarden: d.wantsGarden === true,
  offersGarden: d.offersGarden === true,
  role: normRole(d.role),
  createdAt: str(d.createdAt),
})

export type ProfileInput = Pick<Profile, 'name' | 'phone' | 'commune' | 'wantsGarden' | 'offersGarden'>

/** Crée ou met à jour le profil du compte connecté. Le rôle d'un profil existant n'est jamais modifié. */
export const saveProfile = async (uid: string, input: ProfileInput, existing: Profile | null): Promise<void> => {
  await setDoc(doc(db, COL, uid), {
    email: uid, // l'identité est l'uid anonyme (le champ garde son nom historique)
    name: input.name.trim(),
    phone: input.phone.trim(),
    commune: input.commune,
    wantsGarden: input.wantsGarden,
    offersGarden: input.offersGarden,
    role: existing?.role ?? 'membre',
    createdAt: existing?.createdAt || nowIso(),
  })
}
