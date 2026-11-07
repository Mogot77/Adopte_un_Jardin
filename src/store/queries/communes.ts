import type { Commune } from '@/types'

type ApiCommune = {
  nom: string
  code: string
  departement?: { code?: string }
  centre?: { coordinates: [number, number] }
}

/** Recherche de communes françaises par nom ou code postal (API publique geo.api.gouv.fr, sans clé). */
export const searchCommunes = async (text: string, signal?: AbortSignal): Promise<Commune[]> => {
  const q = text.trim()
  if (q.length < 2) return []
  const param = /^\d{5}$/.test(q) ? `codePostal=${q}` : `nom=${encodeURIComponent(q)}&boost=population`
  const r = await fetch(`https://geo.api.gouv.fr/communes?${param}&fields=nom,code,centre,departement&limit=8`, { signal })
  if (!r.ok) throw new Error(`Recherche de commune impossible (${r.status})`)
  const list = await r.json() as ApiCommune[]
  return list.flatMap(c => (c.centre
    ? [{ code: c.code, nom: c.nom, lat: c.centre.coordinates[1], lon: c.centre.coordinates[0], dept: c.departement?.code ?? '' }]
    : []))
}
