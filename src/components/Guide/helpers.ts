import { COMMISSION_BANDS, PAYOUT_TRANCHES, eur } from '@/helpers/pricing'
import type { GuideModel } from './types'

/** Barème et échéancier affichés dans le mode d'emploi, tirés des mêmes constantes que le calcul des prix. */
export const buildGuideModel = (): GuideModel => ({
  commission: COMMISSION_BANDS.map(b => ({
    label: b.label,
    value: b.fixed !== undefined ? `${eur(b.fixed)} (forfait)` : `${((b.rate ?? 0) * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} % du loyer`,
  })),
  payouts: PAYOUT_TRANCHES.map(t => ({ label: t.label, share: `${Math.round(t.share * 100)} %` })),
})
