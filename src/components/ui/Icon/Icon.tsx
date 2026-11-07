import { ICON_PATHS } from './constants'
import type { IconProps } from './types'

const Icon = ({ name, size = 18, className }: IconProps) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}
  >{ICON_PATHS[name]}</svg>
)

export default Icon
