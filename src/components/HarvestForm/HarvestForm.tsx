import { useAppSelector } from '@/hooks/useAppStore'
import { useApp } from '@/hooks/useApp'
import { selectMyHarvests } from '@/store/selectors'
import Empty from '@/components/ui/Empty'
import HarvestFormEditor from './HarvestFormEditor'

/** Dépôt d'une offre (sans `id`) ou modification d'une offre du compte (avec `id`). */
const HarvestForm = ({ id }: { id?: string }) => {
  const { profile } = useApp()
  const mine = useAppSelector(selectMyHarvests)
  const existing = id ? mine.find(h => h.id === id) ?? null : null

  if (!profile) return null
  if (!id) return <HarvestFormEditor id={null} existing={null} />
  if (!existing) return <Empty>Chargement de l'offre… <a href="#/cueillette">Retour à « À cueillir »</a></Empty>
  return <HarvestFormEditor key={id} id={id} existing={existing} />
}

export default HarvestForm
