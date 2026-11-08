import type { Commune } from './common'
import type { AccessSlot } from './parcels'

/** Nature d'une essence à cueillir. */
export type HarvestKind = 'fruit' | 'aromatique' | 'legume' | 'autre'
/** `ouverte` : visible de tous les membres ; `fermee` : retirée de la liste, visible du seul propriétaire. */
export type HarvestStatus = 'ouverte' | 'fermee'

/** Un arbre, un arbuste ou une plante à cueillir, avec sa période de récolte (mois de 1 à 12, la période peut enjamber le 31 décembre). */
export type HarvestItem = {
  name: string
  kind: HarvestKind
  fromMonth: number
  toMonth: number
  /** Précision facultative : variété, hauteur, quantité estimée... */
  note: string
}

/** Offre « à cueillir » : un propriétaire invite à venir ramasser fruits, aromatiques ou légumes (gratuit, entre membres). */
export type HarvestOffer = {
  id: string
  ownerEmail: string
  ownerName: string
  title: string
  description: string
  items: HarvestItem[]
  /** Comment venir : accès, ce qu'il faut apporter. L'adresse exacte n'y figure pas. */
  instructions: string
  /** Jours et plages horaires pour venir cueillir (vide = sur rendez-vous). */
  accessSlots: AccessSlot[]
  commune: Commune
  /** Téléphone facultatif, visible des membres connectés. */
  phone: string
  photoUrls: string[]
  status: HarvestStatus
  createdAt: string
  updatedAt: string
}

/** Champs saisis dans le formulaire (la commune est vide tant qu'elle n'est pas choisie). */
export type HarvestDraft = Pick<HarvestOffer, 'title' | 'description' | 'items' | 'instructions' | 'accessSlots' | 'phone' | 'photoUrls'> & {
  commune: Commune | null
}
