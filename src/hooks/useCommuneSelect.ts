import { useEffect, useState } from 'react'
import { searchCommunes } from '@/store/queries/communes'
import type { CommuneSelectProps } from '@/components/ui/CommuneSelect'
import type { Commune } from '@/types'

/** État d'un champ de choix de commune : saisie, suggestions (avec attente de 250 ms entre deux frappes) et sélection. */
export const useCommuneSelect = (value: Commune | null, onPick: (c: Commune | null) => void): CommuneSelectProps => {
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<Commune[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.trim().length < 2) return
    const ctrl = new AbortController()
    const timer = setTimeout(() => {
      setLoading(true)
      searchCommunes(query, ctrl.signal)
        .then(list => { setOptions(list); setLoading(false) })
        .catch(e => { if (!ctrl.signal.aborted) { console.error(e); setOptions([]); setLoading(false) } })
    }, 250)
    return () => { clearTimeout(timer); ctrl.abort() }
  }, [query])

  return {
    value,
    query,
    options: query.trim().length < 2 ? [] : options,
    loading,
    onQuery: setQuery,
    onPick: c => { setQuery(''); setOptions([]); onPick(c) },
  }
}
