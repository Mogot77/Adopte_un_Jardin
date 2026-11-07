import type { AccessSlot } from '@/types'

export type ScheduleFieldProps = {
  /** Plages cochées (une par jour). */
  value: AccessSlot[]
  onChange: (slots: AccessSlot[]) => void
}
