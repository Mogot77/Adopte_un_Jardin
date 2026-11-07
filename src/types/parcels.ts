import type { Commune } from './common'

/** `publiee` : visible dans la recherche ; `reservee` : louée à un jardinier ; `retiree` : retirée par le propriétaire. */
export type ParcelStatus = 'publiee' | 'reservee' | 'retiree'

export type WaterAccess = 'aucune' | 'robinet' | 'cuve'

/** Annonce publique d'une parcelle. L'adresse exacte n'y figure pas (voir `ParcelPrivate`). */
/** Plage d'accès à la parcelle pour un jour (0 = lundi ... 6 = dimanche), heures au format « HH:MM ». */
export type AccessSlot = { day: number; from: string; to: string }

export type Parcel = {
  id: string
  ownerEmail: string
  ownerName: string
  title: string
  description: string
  commune: Commune
  /** Surface cultivable en m². */
  surface: number
  /** Participation pour une année culturale, en euros. */
  pricePerYear: number
  toolsProvided: boolean
  /** Participation annuelle aux outils, en euros (0 = symbolique ou gratuit). */
  toolsPricePerYear: number
  water: WaterAccess
  /** Compteur d'eau individuel pour dissocier la consommation du jardin. */
  waterMeter: boolean
  /** Résumé lisible des jours et horaires d'accès (déduit de `accessSlots`). */
  access: string
  /** Plages d'accès : une par jour ouvert. */
  accessSlots: AccessSlot[]
  /** Nombre de personnes pouvant être présentes en même temps. */
  maxPeople: number
  toilets: boolean
  /** Équipements complémentaires (abri, piscine, jeux...). */
  equipment: string
  /** Photos de l'annonce (la première sert de vignette). */
  photoUrls: string[]
  status: ParcelStatus
  /** E-mail du jardinier quand la parcelle est réservée, sinon chaîne vide. */
  gardenerEmail: string
  createdAt: string
  updatedAt: string
}

/** Coordonnées exactes, communiquées seulement au propriétaire et au jardinier qui a payé. */
export type ParcelPrivate = {
  id: string
  ownerEmail: string
  address: string
  phone: string
}

/** Champs saisis dans le formulaire de dépôt d'une parcelle (la commune est vide tant qu'elle n'est pas choisie). */
export type ParcelDraft = Pick<Parcel,
  'title' | 'description' | 'surface' | 'pricePerYear' | 'toolsProvided' | 'toolsPricePerYear' |
  'water' | 'waterMeter' | 'accessSlots' | 'maxPeople' | 'toilets' | 'equipment' | 'photoUrls'> & {
  commune: Commune | null
  address: string
  phone: string
}
