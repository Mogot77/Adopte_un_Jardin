import { useEffect, useState } from 'react'
import { watchYields } from '@/store/queries/production'
import type { YieldEntry } from '@/types'

/** Saisies de récolte d'un jardin visibles du compte (les siennes, et toutes si le compte est propriétaire du jardin).
 *  L'écran qui l'appelle est recréé pour chaque jardin (clé = identifiant) : la liste ne se mélange pas d'un jardin à l'autre. */
export const useYieldEntries = (sourceId: string, email: string): YieldEntry[] => {
  const [list, setList] = useState<YieldEntry[]>([])
  useEffect(() => watchYields(sourceId, email, setList, e => console.error(e)), [sourceId, email])
  return list
}
