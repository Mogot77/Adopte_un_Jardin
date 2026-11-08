import Button from '@/components/ui/Button'
import Chip from '@/components/ui/Chip'
import Kv from '@/components/ui/Kv'
import Note from '@/components/ui/Note'
import PhotoGallery from '@/components/ui/PhotoGallery'
import SeasonBar from '@/components/ui/SeasonBar'
import type { HarvestDetailViewProps } from './types'

const TONES = { now: 'ok', soon: 'wa', later: 'gr' } as const

/** Fiche d'une offre (vue) : essences et saisons à gauche, contact ou gestion à droite. */
const HarvestDetailView = ({ model: m, busy, production, onEdit, onToggle, onBack }: HarvestDetailViewProps) => (
  <>
    <p className="crumb mb-2"><a href="#/cueillette" onClick={e => { e.preventDefault(); onBack() }}>← Retour à « À cueillir »</a></p>
    <div className="cols">
      <div className="col-main">
        <PhotoGallery photos={m.photoUrls} label={m.title} />
        <div className="card pad">
          <h1 className="text-[22px]">{m.title}</h1>
          <p className="muted mb-4 mt-1">{m.communeLabel} · proposé par {m.ownerName}</p>
          {m.description && <p className="mb-4 whitespace-pre-line">{m.description}</p>}
          <Kv rows={m.rows} />
        </div>
        <section className="card pad" aria-label="Ce qu'on peut cueillir">
          <h2 className="h2 mb-3">Ce qu'on peut cueillir</h2>
          <ul className="stack m-0 list-none p-0" style={{ '--gap': '14px' } as React.CSSProperties}>
            {m.items.map(i => (
              <li key={i.name}>
                <div className="row between">
                  <b>{i.name}</b>
                  <Chip tone={TONES[i.state]}>{i.stateLabel}</Chip>
                </div>
                <p className="muted mb-1.5 text-[13px]">{i.kindLabel} · {i.seasonText}{i.note && ` · ${i.note}`}</p>
                <SeasonBar months={i.months} initials={m.initials} currentMonth={m.currentMonth} label={`${i.name} : cueillette ${i.seasonText}`} />
              </li>
            ))}
          </ul>
        </section>
        {m.instructions && (
          <section className="card pad" aria-label="Comment venir">
            <h2 className="h2 mb-2">Comment venir</h2>
            <p className="whitespace-pre-line">{m.instructions}</p>
          </section>
        )}
        {production}
      </div>
      <aside className="col-side" aria-label="Contact">
        <div className="card pad stack" style={{ '--gap': '12px' } as React.CSSProperties}>
          <p><Chip tone="ok">Gratuit</Chip> {m.status === 'fermee' && <Chip tone="bl">Récolte terminée</Chip>}</p>
          {m.isOwner ? (
            <>
              <h2 className="h2">Votre offre</h2>
              {m.status === 'ouverte'
                ? <Button variant="primary" full onClick={onToggle} disabled={busy}>Plus rien à cueillir : récolte réussie !</Button>
                : <Button full onClick={onToggle} disabled={busy}>Rouvrir pour une nouvelle récolte</Button>}
              <Button full onClick={onEdit} disabled={busy}>Modifier</Button>
            </>
          ) : m.status === 'ouverte' ? (
            <>
              <h2 className="h2">Je viens cueillir</h2>
              <a className="btn btnp btn-w" href={m.mailHref}>Écrire à {m.ownerName}</a>
              {m.phone && <p className="text-[13px]">Téléphone : <b>{m.phone}</b></p>}
              <Note tone="info">Prévenez avant de venir : on n'entre pas dans un jardin sans l'accord de son propriétaire. L'adresse exacte vous sera donnée par la personne.</Note>
              <Note tone="info">Cueillez raisonnablement, laissez de quoi mûrir et partager, remerciez, et ne revendez pas : cette récolte est offerte.</Note>
            </>
          ) : (
            <Note tone="info">La récolte est terminée : il n'y a plus rien à cueillir pour le moment. Merci à celles et ceux qui ont participé !</Note>
          )}
        </div>
      </aside>
    </div>
  </>
)

export default HarvestDetailView
