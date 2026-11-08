import { useEffect, useState } from 'react'
import { watchImpact } from '@/store/queries/production'
import type { ImpactMonth } from '@/types'

/** Compteurs publics de récolte par mois, en temps réel (lisibles aussi sur l'accueil, sans connexion). Vide si la lecture échoue. */
export const useImpact = (): ImpactMonth[] => {
  const [months, setMonths] = useState<ImpactMonth[]>([])
  useEffect(() => watchImpact(setMonths, e => { console.error(e); setMonths([]) }), [])
  return months
}
