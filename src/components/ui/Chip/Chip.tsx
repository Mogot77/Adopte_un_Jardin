import type { ChipProps } from './types'

const Chip = ({ tone = 'gr', children }: ChipProps) => <span className={`chip ${tone}`}>{children}</span>

export default Chip
