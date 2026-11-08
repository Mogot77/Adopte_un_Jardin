import type { SeasonBarProps } from './types'

/** Frise des 12 mois : ceux de la période de cueillette sont colorés, le mois courant est entouré. */
const SeasonBar = ({ months, initials, currentMonth, label }: SeasonBarProps) => (
  <div role="img" aria-label={label} className="flex gap-0.5">
    {months.map((on, i) => (
      <span
        key={`m${i + 1}`} aria-hidden="true"
        className={`grid h-6 flex-1 place-items-center rounded-sm text-[10px] font-bold ${on ? 'bg-brand text-surface' : 'bg-subtle text-faint'} ${i + 1 === currentMonth ? 'outline outline-2 outline-offset-1 outline-ink' : ''}`}
      >{initials[i]}</span>
    ))}
  </div>
)

export default SeasonBar
