import { useMemo, useState } from 'react'
import { useAppSelector } from '@/hooks/useAppStore'
import { useApp } from '@/hooks/useApp'
import { go } from '@/hooks/useRoute'
import { selectMyPlants, selectOpenPlants } from '@/store/selectors'
import { setPlantStatus } from '@/store/queries/plants'
import Empty from '@/components/ui/Empty'
import { buildPlantDetailModel } from './helpers'
import PlantDetailView from './PlantDetailView'

/** Fiche d'un don de plantes : contact par e-mail pour les autres membres, gestion pour le donateur. */
const PlantDetail = ({ id }: { id: string }) => {
  const { profile, toast } = useApp()
  const open = useAppSelector(selectOpenPlants)
  const mine = useAppSelector(selectMyPlants)
  const [busy, setBusy] = useState(false)
  const plant = mine.find(p => p.id === id) ?? open.find(p => p.id === id) ?? null
  const model = useMemo(() => (plant && profile ? buildPlantDetailModel(plant, profile.email, profile.name) : null), [plant, profile])

  if (!plant || !model) return <Empty>Annonce introuvable, déjà retirée ou en cours de chargement… <a href="#/echanges">Retour à l'échange de plantes</a></Empty>

  const toggle = () => {
    setBusy(true)
    setPlantStatus(id, plant.status === 'disponible' ? 'donne' : 'disponible')
      .then(() => toast(plant.status === 'disponible' ? 'Don marqué comme fait.' : 'Don remis à disposition.'))
      .catch(e => { console.error(e); toast('Action impossible. Réessayez.', 'error') })
      .finally(() => setBusy(false))
  }

  return <PlantDetailView model={model} busy={busy} onEdit={() => go(`#/echanges/proposer/${id}`)} onToggle={toggle} onBack={() => go('#/echanges')} />
}

export default PlantDetail
