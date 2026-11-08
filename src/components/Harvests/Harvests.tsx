import { useMemo, useState } from 'react'
import { useAppSelector } from '@/hooks/useAppStore'
import { useApp } from '@/hooks/useApp'
import { useCommuneSelect } from '@/hooks/useCommuneSelect'
import { go } from '@/hooks/useRoute'
import { HARVEST_KINDS, monthOf } from '@/helpers/harvests'
import { RADIUS_OPTIONS } from '@/helpers/parcels'
import { selectMyHarvests, selectOpenHarvests } from '@/store/selectors'
import { deleteHarvest, setHarvestStatus } from '@/store/queries/harvests'
import type { Commune, HarvestKind } from '@/types'
import { buildHarvestsModel } from './helpers'
import HarvestsView from './HarvestsView'

const DEFAULT_RADIUS_KM = 20

/** « À cueillir » : offres de récolte gratuites près de chez soi, et gestion de mes propres offres. */
const Harvests = () => {
  const { profile, toast } = useApp()
  const open = useAppSelector(selectOpenHarvests)
  const mine = useAppSelector(selectMyHarvests)
  const [commune, setCommune] = useState<Commune | null>(profile?.commune ?? null)
  const [radiusKm, setRadiusKm] = useState(DEFAULT_RADIUS_KM)
  const [kind, setKind] = useState<HarvestKind | ''>('')
  const [onlyNow, setOnlyNow] = useState(false)
  const [busyId, setBusyId] = useState<string | null>(null)
  const communeSelect = useCommuneSelect(commune, setCommune)

  const model = useMemo(
    () => buildHarvestsModel(open, mine, { commune, radiusKm, kind: kind || null, onlyNow, month: monthOf() }, profile?.email ?? ''),
    [open, mine, commune, radiusKm, kind, onlyNow, profile?.email],
  )

  const run = (id: string, action: () => Promise<void>, ok: string, ko: string) => {
    setBusyId(id)
    action().then(() => toast(ok)).catch(e => { console.error(e); toast(ko, 'error') }).finally(() => setBusyId(null))
  }

  return (
    <HarvestsView
      model={model} commune={communeSelect} radiusKm={radiusKm} radiusOptions={RADIUS_OPTIONS} kind={kind} kindOptions={HARVEST_KINDS} onlyNow={onlyNow} busyId={busyId}
      onRadius={setRadiusKm} onKind={setKind} onOnlyNow={setOnlyNow}
      onOpen={id => go(`#/cueillette/${id}`)} onNew={() => go('#/cueillette/proposer')} onEdit={id => go(`#/cueillette/proposer/${id}`)}
      onToggle={(id, status) => run(id, () => setHarvestStatus(id, status === 'ouverte' ? 'fermee' : 'ouverte'),
        status === 'ouverte' ? 'Bravo, la récolte est terminée ! Notez les kilos récoltés sur la fiche.' : 'Offre rouverte.', 'Action impossible. Réessayez.')}
      onDelete={id => { if (window.confirm('Supprimer définitivement cette offre ?')) run(id, () => deleteHarvest(id), 'Offre supprimée.', 'Suppression impossible.') }}
    />
  )
}

export default Harvests
