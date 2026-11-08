import { applyDays, DAY_LABELS, SCHEDULE_PRESETS, setSlotTime, toggleDay } from '@/helpers/schedule'
import type { ScheduleFieldProps } from './types'

/** Choix des jours d'accès (lundi à dimanche) et de la plage horaire de chaque jour. */
const ScheduleField = ({ value, onChange, label = "Jours et horaires d'accès" }: ScheduleFieldProps) => (
  <fieldset className="stack" style={{ '--gap': '8px' } as React.CSSProperties}>
    <legend className="lbl">{label}</legend>
    <div className="flex flex-wrap gap-2" role="group" aria-label="Raccourcis">
      {SCHEDULE_PRESETS.map(p => (
        <button key={p.label} type="button" className="chip gr cursor-pointer" onClick={() => onChange(applyDays(value, p.days))}>{p.label}</button>
      ))}
      <button type="button" className="chip gr cursor-pointer" onClick={() => onChange([])}>Effacer</button>
    </div>
    <ul className="stack" style={{ '--gap': '6px' } as React.CSSProperties}>
      {DAY_LABELS.map((label, day) => {
        const slot = value.find(s => s.day === day)
        return (
          <li key={label} className="grid grid-cols-[7.5rem_1fr] items-center gap-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={!!slot} onChange={e => onChange(toggleDay(value, day, e.target.checked))} />
              {label}
            </label>
            {slot ? (
              <span className="flex flex-wrap items-center gap-2">
                <input className="in !w-auto" type="time" aria-label={`${label} : de`} value={slot.from} onChange={e => onChange(setSlotTime(value, day, { from: e.target.value }))} />
                <span aria-hidden="true">à</span>
                <input className="in !w-auto" type="time" aria-label={`${label} : jusqu'à`} value={slot.to} onChange={e => onChange(setSlotTime(value, day, { to: e.target.value }))} />
              </span>
            ) : <span className="text-xs text-faint">Fermé</span>}
          </li>
        )
      })}
    </ul>
  </fieldset>
)

export default ScheduleField
