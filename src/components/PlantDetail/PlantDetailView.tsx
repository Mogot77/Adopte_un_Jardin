import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import Kv from '@/components/ui/Kv'
import Note from '@/components/ui/Note'
import PhotoGallery from '@/components/ui/PhotoGallery'
import type { PlantDetailViewProps } from './types'

/** Fiche d'un don (vue) : description à gauche, contact ou gestion à droite. */
const PlantDetailView = ({ model: m, busy, onEdit, onToggle, onBack }: PlantDetailViewProps) => (
  <>
    <p className="crumb mb-2"><a href="#/echanges" onClick={e => { e.preventDefault(); onBack() }}>← Retour à l'échange de plantes</a></p>
    <div className="cols">
      <div className="col-main">
        <PhotoGallery photos={m.photoUrls} label={m.title} />
        <div className="card pad">
          <h1 className="text-[22px]">{m.title}</h1>
          <p className="muted mb-4 mt-1">{m.communeLabel} · donné par {m.ownerName}</p>
          {m.description && <p className="mb-4 whitespace-pre-line">{m.description}</p>}
          <Kv rows={m.rows} />
        </div>
      </div>
      <aside className="col-side" aria-label="Contact">
        <div className="card pad stack" style={{ '--gap': '12px' } as React.CSSProperties}>
          <p><Chip tone="ok">Gratuit</Chip> {m.status === 'donne' && <Chip>Déjà donné</Chip>}</p>
          {m.isOwner ? (
            <>
              <h2 className="h2">Votre annonce</h2>
              <Button full onClick={onEdit} disabled={busy}>Modifier</Button>
              <Button full onClick={onToggle} disabled={busy}>{m.status === 'disponible' ? "C'est donné" : 'Remettre à disposition'}</Button>
            </>
          ) : m.status === 'disponible' ? (
            <>
              <h2 className="h2">Ça m'intéresse</h2>
              <a className="btn btnp btn-w" href={m.mailHref}>Écrire à {m.ownerName}</a>
              {m.phone && <p className="text-[13px]">Téléphone : <b>{m.phone}</b></p>}
              <Note tone="info">Convenez ensemble du lieu et de l'heure de remise. Pour votre sécurité, retrouvez-vous dans un lieu public ou en présence d'un tiers.</Note>
            </>
          ) : (
            <Note tone="warn">Ce don a déjà été fait.</Note>
          )}
        </div>
      </aside>
    </div>
  </>
)

export default PlantDetailView
