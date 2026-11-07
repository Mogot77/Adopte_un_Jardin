import { useEffect, useState } from 'react'
import { fetchPrivate } from '@/store/queries/parcels'
import type { ParcelPrivate } from '@/types'

/** Coordonnées exactes des annonces demandées (seulement celles auxquelles le compte a droit : les autres restent absentes). */
export const useParcelPrivates = (ids: string[]): Record<string, ParcelPrivate> => {
  const [found, setFound] = useState<Record<string, ParcelPrivate>>({})
  const key = [...ids].sort().join('|')

  useEffect(() => {
    let cancelled = false
    const list = key ? key.split('|') : []
    Promise.all(list.map(async id => [id, await fetchPrivate(id)] as const)).then(rows => {
      if (cancelled) return
      const next: Record<string, ParcelPrivate> = {}
      for (const [id, p] of rows) if (p) next[id] = p
      setFound(next)
    })
    return () => { cancelled = true }
  }, [key])

  return found
}
