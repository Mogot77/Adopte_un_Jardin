import { useMemo, useState } from 'react'
import { useAppSelector } from '@/hooks/useAppStore'
import { useApp } from '@/hooks/useApp'
import { useCommuneSelect } from '@/hooks/useCommuneSelect'
import { go } from '@/hooks/useRoute'
import { PLANT_KINDS } from '@/helpers/plants'
import { RADIUS_OPTIONS } from '@/helpers/parcels'
import { selectMyPlants, selectOpenPlants } from '@/store/selectors'
import { deletePlant, setPlantStatus } from '@/store/queries/plants'
import type { Commune, PlantKind } from '@/types'
import { buildSwapModel } from './helpers'
import SwapView from './SwapView'

const DEFAULT_RADIUS_KM = 20

/** Échange de plantes : dons gratuits près de chez soi, et gestion de mes propres dons. */
const Swap = () => {
  const { profile, toast } = useApp()
  const open = useAppSelector(selectOpenPlants)
  const mine = useAppSelector(selectMyPlants)
  const [commune, setCommune] = useState<Commune | null>(profile?.commune ?? null)
  const [radiusKm, setRadiusKm] = useState(DEFAULT_RADIUS_KM)
  const [kind, setKind] = useState<PlantKind | ''>('')
  const [busyId, setBusyId] = useState<string | null>(null)
  const communeSelect = useCommuneSelect(commune, setCommune)

  const model = useMemo(
    () => buildSwapModel(open, mine, { commune, radiusKm, kind: kind || null }, profile?.email ?? ''),
    [open, mine, commune, radiusKm, kind, profile?.email],
  )

  const run = (id: string, action: () => Promise<void>, ok: string, ko: string) => {
    setBusyId(id)
    action().then(() => toast(ok)).catch(e => { console.error(e); toast(ko, 'error') }).finally(() => setBusyId(null))
  }

  return (
    <SwapView
      model={model} commune={communeSelect} radiusKm={radiusKm} radiusOptions={RADIUS_OPTIONS} kind={kind} kindOptions={PLANT_KINDS} busyId={busyId}
      onRadius={setRadiusKm} onKind={setKind}
      onOpen={id => go(`#/echanges/${id}`)} onNew={() => go('#/echanges/proposer')} onEdit={id => go(`#/echanges/proposer/${id}`)}
      onToggle={(id, status) => run(id, () => setPlantStatus(id, status === 'disponible' ? 'donne' : 'disponible'),
        status === 'disponible' ? 'Don marqué comme fait.' : 'Don remis à disposition.', 'Action impossible. Réessayez.')}
      onDelete={id => { if (window.confirm('Supprimer définitivement cette annonce ?')) run(id, () => deletePlant(id), 'Annonce supprimée.', 'Suppression impossible.') }}
    />
  )
}

export default Swap
