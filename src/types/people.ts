import type { Role } from '@/helpers/roles'
import type { Commune } from './common'

/** Profil d'un compte : un même compte peut chercher un jardin et en proposer un. */
export type Profile = {
  email: string
  name: string
  phone: string
  commune: Commune | null
  wantsGarden: boolean
  offersGarden: boolean
  role: Role
  createdAt: string
}
