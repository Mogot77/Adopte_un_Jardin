import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import Icon from '@/components/ui/Icon'
import Kv from '@/components/ui/Kv'
import Note from '@/components/ui/Note'
import type { ParcelDetailViewProps } from './types'

/** Fiche d'annonce (vue) : caractéristiques à gauche, panneau de réservation à droite. */
const ParcelDetailView = ({ model: m, step, accepted, busy, error, onStart, onBack, onAccept, onPay, onEdit, onSearch }: ParcelDetailViewProps) => (
  <>
    <p className="crumb mb-2"><a href="#/" onClick={e => { e.preventDefault(); onSearch() }}>← Retour à la recherche</a></p>
    <div className="cols">
      <div className="col-main">
        <div className="ph flex h-56 snap-x snap-mandatory items-center overflow-x-auto rounded-[10px] bg-subtle text-faint sm:h-72" tabIndex={0} aria-label="Photos de la parcelle (faire défiler)">
          {m.photoUrls.length > 0 ? m.photoUrls.map((u, i) => <img key={u} src={u} alt={`Photo ${i + 1} sur ${m.photoUrls.length} : ${m.title}`} className="size-full shrink-0 snap-center object-cover" />) : <Icon name="leaf" size={48} />}
        </div>
        <div className="card pad">
          <h1 className="text-[22px]">{m.title}</h1>
          <p className="muted mb-4 mt-1">{m.communeLabel} · proposé par {m.ownerName}</p>
          {m.description && <p className="mb-4 whitespace-pre-line">{m.description}</p>}
          <Kv rows={m.rows} />
        </div>
      </div>
      <aside className="col-side" aria-label="Réservation">
        <div className="card pad stack" style={{ '--gap': '12px' } as React.CSSProperties}>
          {m.mode === 'available' && step === 'view' && (
            <>
              <p className="text-2xl font-bold text-brand">{m.rent} <span className="text-sm font-normal text-muted">/ an</span></p>
              <p className="muted text-[13px]">Année culturale {m.season}. L'adresse exacte est communiquée après le paiement.</p>
              <Button variant="primary" full onClick={onStart}>Réserver cette parcelle</Button>
            </>
          )}
          {m.mode === 'available' && step === 'confirm' && (
            <>
              <h2 className="h2">Confirmer la réservation</h2>
              <dl className="kv"><dt>Participation {m.season}</dt><dd>{m.rent}</dd><dt>Frais de service</dt><dd>{m.fee}</dd><dt><b>Total</b></dt><dd><b>{m.total}</b></dd></dl>
              <Note tone="warn">Paiement simulé : aucun débit réel n'est effectué dans cette version de démonstration.</Note>
              <label className="flex items-start gap-2 text-[13px]">
                <input type="checkbox" className="mt-0.5" checked={accepted} onChange={e => onAccept(e.target.checked)} />
                <span>J'ai pris connaissance des caractéristiques de la parcelle, j'accepte les conditions d'utilisation et je m'engage à respecter la <a href="#/guide">charte du jardinier</a>.</span>
              </label>
              {error && <p role="alert" className="text-sm text-danger">{error}</p>}
              <Button variant="primary" full disabled={!accepted || busy} onClick={onPay}>{busy ? 'Paiement en cours…' : `Payer ${m.total}`}</Button>
              <Button full onClick={onBack} disabled={busy}>Retour</Button>
            </>
          )}
          {m.mode === 'booked' && m.booking && (
            <>
              <h2 className="h2">Votre réservation</h2>
              <p>{m.booking.status === 'validee' ? <Chip tone="ok">Validée</Chip> : <Chip tone="wa">En attente de la première rencontre</Chip>}</p>
              {m.booking.status === 'payee' && (
                <Note tone="info">
                  <span>Code à donner au propriétaire après votre première rencontre, pour confirmer la location : <b className="font-mono text-lg tracking-widest">{m.booking.code || '…'}</b></span>
                </Note>
              )}
              {m.contact && <Kv rows={[{ label: 'Adresse', value: m.contact.address }, { label: 'Téléphone', value: m.contact.phone || 'Non renseigné' }, { label: 'Propriétaire', value: m.ownerName }]} />}
              <a className="btn btn-w" href="#/mes-reservations">Mes réservations</a>
            </>
          )}
          {m.mode === 'own' && (
            <>
              <h2 className="h2">Votre annonce</h2>
              {m.contact && <Kv rows={[{ label: 'Adresse', value: m.contact.address }, { label: 'Téléphone', value: m.contact.phone || 'Non renseigné' }]} />}
              <Button full onClick={onEdit}>Modifier l'annonce</Button>
              <a className="btn btn-w" href="#/mes-parcelles">Mes parcelles</a>
            </>
          )}
          {m.mode === 'unavailable' && <Note>Cette parcelle n'est plus disponible.</Note>}
        </div>
      </aside>
    </div>
  </>
)

export default ParcelDetailView
