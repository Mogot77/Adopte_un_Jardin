/* Tarification : prix conseillé, commission de la plateforme, versements au propriétaire.
   Règles tirées de l'étude de 2015 (docs/analyse-ancien-projet.md). */
import { TODAY } from '@/helpers/dates'
import type { PayoutKey } from '@/types'

/** Prix de marché relevé en 2015 : environ 35 €/mois pour 100 m², soit ~4 €/m²/an. */
export const PRICE_PER_M2_YEAR = 4
/** Écart autorisé autour du prix conseillé (±50 %). */
export const PRICE_MARGIN = 0.5
export const MIN_SURFACE = 10

export const SURFACE_RANGES: { min: number; max: number; label: string }[] = [
  { min: 10, max: 50, label: '10 à 50 m²' },
  { min: 50, max: 100, label: '50 à 100 m²' },
  { min: 100, max: 150, label: '100 à 150 m²' },
  { min: 150, max: Infinity, label: '150 m² et plus' },
]

/** Gamme de surface affichée dans les annonces. */
export const surfaceRange = (surface: number): string =>
  (SURFACE_RANGES.find(r => surface < r.max) ?? SURFACE_RANGES[SURFACE_RANGES.length - 1]).label

export const suggestedPrice = (surface: number): number => Math.round(surface * PRICE_PER_M2_YEAR)

export const priceBounds = (surface: number): { min: number; max: number } => {
  const s = suggestedPrice(surface)
  return { min: Math.round(s * (1 - PRICE_MARGIN)), max: Math.round(s * (1 + PRICE_MARGIN)) }
}

const cents = (n: number): number => Math.round(n * 100) / 100

/** Barème de la commission payée par le jardinier en plus du loyer (selon le loyer annuel perçu par le propriétaire). */
export const COMMISSION_BANDS: { upTo: number; label: string; fixed?: number; rate?: number }[] = [
  { upTo: 50, label: "Jusqu'à 50 €", fixed: 2.5 },
  { upTo: 100, label: "Jusqu'à 100 €", rate: 0.05 },
  { upTo: 200, label: "Jusqu'à 200 €", rate: 0.045 },
  { upTo: 500, label: "Jusqu'à 500 €", rate: 0.03 },
  { upTo: Infinity, label: 'Plus de 500 €', rate: 0.025 },
]

/** Frais de service (en euros) ajoutés au loyer. */
export const commission = (price: number): number => {
  if (price <= 0) return 0
  const band = COMMISSION_BANDS.find(b => price <= b.upTo) ?? COMMISSION_BANDS[COMMISSION_BANDS.length - 1]
  return band.fixed ?? cents(price * (band.rate ?? 0))
}

export const eur = (n: number): string =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', minimumFractionDigits: Number.isInteger(n) ? 0 : 2 }).format(n)

/** Le loyer est reversé au propriétaire en trois tranches sur l'année culturale. */
export const PAYOUT_TRANCHES: { key: PayoutKey; label: string; month: number; share: number }[] = [
  { key: 'mars', label: 'Mars', month: 3, share: 0.3 },
  { key: 'juin', label: 'Juin', month: 6, share: 0.4 },
  { key: 'octobre', label: 'Octobre', month: 10, share: 0.3 },
]

export type PayoutRow = { key: PayoutKey; label: string; date: string; amount: number; available: boolean }

/** Échéancier de versement du loyer. La dernière tranche absorbe l'arrondi. */
export const payoutSchedule = (price: number, season: number, today: string = TODAY): PayoutRow[] => {
  let paid = 0
  return PAYOUT_TRANCHES.map((t, i) => {
    const amount = i === PAYOUT_TRANCHES.length - 1 ? cents(price - paid) : cents(price * t.share)
    paid = cents(paid + amount)
    const date = `${season}-${String(t.month).padStart(2, '0')}-01`
    return { key: t.key, label: t.label, date, amount, available: today >= date }
  })
}
