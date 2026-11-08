import Chip from '@/components/ui/Chip'
import Icon from '@/components/ui/Icon'
import type { HarvestCardProps } from './types'

const TONES = { now: 'ok', soon: 'wa', later: 'gr' } as const

/** Vignette d'offre cliquable (photo, état de la saison, essences et périodes). */
const HarvestCard = ({ model: m, onOpen }: HarvestCardProps) => (
  <button type="button" className="card flex w-full gap-3 p-3 text-left hover:border-brand" onClick={() => onOpen(m.id)}>
    <div className="ph grid size-20 shrink-0 place-items-center overflow-hidden rounded-md bg-subtle text-faint sm:size-24">
      {m.photoUrls.length > 0 ? <img src={m.photoUrls[0]} alt="" className="size-full object-cover" loading="lazy" /> : <Icon name="leaf" size={28} />}
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-2">
        <b className="truncate text-[15px]">{m.title}</b>
        <Chip tone={TONES[m.state]}>{m.stateLabel}</Chip>
      </div>
      <p className="muted mt-0.5 text-[13px]">{m.communeLabel}{m.distanceLabel && ` · à ${m.distanceLabel}`} · par {m.ownerName}</p>
      <ul className="m-0 mt-1 list-none p-0 text-[13px]">
        {m.items.map(i => (
          <li key={i.name} className={i.state === 'now' ? 'font-semibold' : 'muted'}>{i.name} <span className="muted font-normal">· {i.seasonText}</span></li>
        ))}
        {m.moreCount > 0 && <li className="muted">et {m.moreCount} autre{m.moreCount > 1 ? 's' : ''}</li>}
      </ul>
    </div>
  </button>
)

export default HarvestCard
