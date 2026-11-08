import { useMemo, useState } from 'react'
import { useAppSelector } from '@/hooks/useAppStore'
import { useApp } from '@/hooks/useApp'
import { go } from '@/hooks/useRoute'
import { monthOf } from '@/helpers/harvests'
import { selectMyHarvests, selectOpenHarvests } from '@/store/selectors'
import { setHarvestStatus } from '@/store/queries/harvests'
import Empty from '@/components/ui/Empty'
import ProductionStats from '@/components/ProductionStats'
import { buildHarvestDetailModel } from './helpers'
import HarvestDetailView from './HarvestDetailView'

/** Fiche d'une offre « à cueillir » : contact par e-mail pour les autres membres, gestion pour le propriétaire. */
const HarvestDetail = ({ id }: { id: string }) => {
  const { profile, toast } = useApp()
  const open = useAppSelector(selectOpenHarvests)
  const mine = useAppSelector(selectMyHarvests)
  const [busy, setBusy] = useState(false)
  const offer = mine.find(h => h.id === id) ?? open.find(h => h.id === id) ?? null
  const model = useMemo(() => (offer && profile ? buildHarvestDetailModel(offer, profile.email, profile.name, monthOf()) : null), [offer, profile])

  if (!offer || !model) return <Empty>Offre introuvable, fermée ou en cours de chargement… <a href="#/cueillette">Retour à « À cueillir »</a></Empty>

  const toggle = () => {
    setBusy(true)
    setHarvestStatus(id, offer.status === 'ouverte' ? 'fermee' : 'ouverte')
      .then(() => toast(offer.status === 'ouverte' ? 'Bravo, la récolte est terminée ! Notez les kilos récoltés ci-dessous.' : 'Offre rouverte.'))
      .catch(e => { console.error(e); toast('Action impossible. Réessayez.', 'error') })
      .finally(() => setBusy(false))
  }

  return (
    <HarvestDetailView
      model={model} busy={busy}
      production={model.isOwner ? <ProductionStats sourceType="cueillette" sourceId={id} ownerEmail={offer.ownerEmail} /> : undefined}
      onEdit={() => go(`#/cueillette/proposer/${id}`)} onToggle={toggle} onBack={() => go('#/cueillette')}
    />
  )
}

export default HarvestDetail
