import { useAppSelector } from '@/hooks/useAppStore'
import { useApp } from '@/hooks/useApp'
import { selectMyPlants } from '@/store/selectors'
import Empty from '@/components/ui/Empty'
import PlantFormEditor from './PlantFormEditor'

/** Dépôt d'un don (sans `id`) ou modification d'un don du compte (avec `id`). */
const PlantForm = ({ id }: { id?: string }) => {
  const { profile } = useApp()
  const mine = useAppSelector(selectMyPlants)
  const existing = id ? mine.find(p => p.id === id) ?? null : null

  if (!profile) return null
  if (!id) return <PlantFormEditor id={null} existing={null} />
  if (!existing) return <Empty>Chargement de l'annonce… <a href="#/echanges">Retour à l'échange de plantes</a></Empty>
  return <PlantFormEditor key={id} id={id} existing={existing} />
}

export default PlantForm
