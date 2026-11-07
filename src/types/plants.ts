import type { Commune } from './common'

/** Nature de ce qui est donné. */
export type PlantKind = 'plant' | 'semis' | 'graines' | 'bouture'
/** `disponible` : visible de tous les membres ; `donne` : retirée de la liste, visible du seul donateur. */
export type PlantStatus = 'disponible' | 'donne'

/** Annonce de don de plantes, semis, graines ou boutures (gratuit, entre membres). */
export type Plant = {
  id: string
  ownerEmail: string
  ownerName: string
  kind: PlantKind
  title: string
  description: string
  quantity: number
  commune: Commune
  /** Téléphone facultatif, visible des membres connectés. */
  phone: string
  photoUrls: string[]
  status: PlantStatus
  createdAt: string
  updatedAt: string
}

/** Champs saisis dans le formulaire de don (la commune est vide tant qu'elle n'est pas choisie). */
export type PlantDraft = Pick<Plant, 'kind' | 'title' | 'description' | 'quantity' | 'phone' | 'photoUrls'> & {
  commune: Commune | null
}
