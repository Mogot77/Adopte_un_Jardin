import Chip from '@/components/ui/Chip'
import Icon from '@/components/ui/Icon'
import type { ParcelCardProps } from './types'

/** Vignette d'annonce cliquable (photo, commune, surface, participation annuelle). */
const ParcelCard = ({ model: m, onOpen }: ParcelCardProps) => (
  <button type="button" className="card flex w-full gap-3 p-3 text-left hover:border-brand" onClick={() => onOpen(m.id)}>
    <div className="ph grid size-20 shrink-0 place-items-center overflow-hidden rounded-md bg-subtle text-faint sm:size-24">
      {m.photoUrls.length > 0 ? <img src={m.photoUrls[0]} alt="" className="size-full object-cover" loading="lazy" /> : <Icon name="leaf" size={28} />}
    </div>
    <div className="min-w-0 flex-1">
      <div className="flex items-start justify-between gap-2">
        <b className="truncate text-[15px]">{m.title}</b>
        <b className="whitespace-nowrap text-brand">{m.priceLabel}</b>
      </div>
      <p className="muted mt-0.5 text-[13px]">{m.communeLabel}{m.distanceLabel && ` · à ${m.distanceLabel}`}</p>
      <p className="mt-0.5 text-[13px]">{m.surfaceLabel}</p>
      {m.tags.length > 0 && <div className="mt-1.5 flex flex-wrap gap-1">{m.tags.map(t => <Chip key={t}>{t}</Chip>)}</div>}
    </div>
  </button>
)

export default ParcelCard
