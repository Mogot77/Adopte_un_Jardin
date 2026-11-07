import Button from '@/components/ui/Button'
import CommuneSelect from '@/components/ui/CommuneSelect'
import Empty from '@/components/ui/Empty'
import Field from '@/components/ui/Field'
import PageHead from '@/components/ui/PageHead'
import MapView from '@/components/MapView'
import ParcelCard from '@/components/ParcelCard'
import type { SearchViewProps } from './types'

/** Recherche (vue) : filtres, carte à bulles et liste d'annonces. */
const SearchView = ({ model, commune, radiusKm, radiusOptions, maxPrice, activeCode, showRadius, onRadius, onMaxPrice, onBubble, onClearBubble, onOpen }: SearchViewProps) => (
  <>
    <PageHead title="Chercher un jardin" subtitle="Planter, récolter, économiser : trouvez une parcelle près de chez vous." />
    <div className="card pad mb-4 grid gap-4 sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)]">
      <div><span className="lbl">Où ?</span><CommuneSelect {...commune} /></div>
      <Field label="Rayon">
        <select className="in" value={radiusKm} onChange={e => onRadius(Number(e.target.value))}>
          {radiusOptions.map(r => <option key={r} value={r}>{r} km</option>)}
        </select>
      </Field>
      <Field label="Loyer max. (€ / an)">
        <input className="in" type="number" min={0} inputMode="numeric" value={maxPrice} placeholder="Illimité" onChange={e => onMaxPrice(e.target.value)} />
      </Field>
    </div>
    <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <MapView center={model.center} zoom={model.zoom} bubbles={model.bubbles} activeId={activeCode} radiusKm={showRadius ? radiusKm : undefined} onSelect={onBubble} />
      <section aria-label="Annonces" className="stack" style={{ '--gap': '10px' } as React.CSSProperties}>
        <div className="row between">
          <b>{model.cards.length} jardin{model.cards.length > 1 ? 's' : ''} disponible{model.cards.length > 1 ? 's' : ''}</b>
          {activeCode && <Button size="sm" onClick={onClearBubble}>Voir toutes les communes ({model.total})</Button>}
        </div>
        {model.cards.length === 0
          ? <Empty>Aucun jardin ne correspond à votre recherche. Élargissez le rayon ou revenez bientôt : de nouvelles parcelles sont déposées régulièrement.</Empty>
          : model.cards.map(c => <ParcelCard key={c.id} model={c} onOpen={onOpen} />)}
      </section>
    </div>
  </>
)

export default SearchView
