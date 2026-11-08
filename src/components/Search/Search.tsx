import { useMemo, useState } from 'react'
import { useAppSelector } from '@/hooks/useAppStore'
import { useApp } from '@/hooks/useApp'
import { useCommuneSelect } from '@/hooks/useCommuneSelect'
import { useImpact } from '@/hooks/useImpact'
import { buildImpactModel } from '@/components/ImpactBanner'
import { go } from '@/hooks/useRoute'
import { RADIUS_OPTIONS } from '@/helpers/parcels'
import { selectOpenParcels } from '@/store/selectors'
import type { Commune } from '@/types'
import { buildSearchModel } from './helpers'
import SearchView from './SearchView'

const DEFAULT_RADIUS_KM = 20

/** Recherche d'un jardin : commune + rayon, carte avec le nombre de jardins par commune, liste des annonces. */
const Search = () => {
  const { profile } = useApp()
  const parcels = useAppSelector(selectOpenParcels)
  const [commune, setCommune] = useState<Commune | null>(profile?.commune ?? null)
  const [radiusKm, setRadiusKm] = useState(DEFAULT_RADIUS_KM)
  const [maxPrice, setMaxPrice] = useState('')
  const [activeCode, setActiveCode] = useState<string | null>(null)
  const communeSelect = useCommuneSelect(commune, c => { setCommune(c); setActiveCode(null) })
  const impactMonths = useImpact()
  const impact = useMemo(() => buildImpactModel(impactMonths), [impactMonths])

  const max = maxPrice.trim() === '' ? null : Number(maxPrice)
  const model = useMemo(
    () => buildSearchModel(parcels, { commune, radiusKm, maxPrice: max !== null && Number.isFinite(max) ? max : null, activeCode }, profile?.email ?? ''),
    [parcels, commune, radiusKm, max, activeCode, profile?.email],
  )

  return (
    <SearchView
      model={model} impact={impact} commune={communeSelect} radiusKm={radiusKm} radiusOptions={RADIUS_OPTIONS} maxPrice={maxPrice}
      activeCode={activeCode} showRadius={commune !== null}
      onRadius={setRadiusKm} onMaxPrice={setMaxPrice}
      onBubble={code => setActiveCode(c => (c === code ? null : code))} onClearBubble={() => setActiveCode(null)}
      onOpen={id => go(`#/parcelle/${id}`)}
    />
  )
}

export default Search
