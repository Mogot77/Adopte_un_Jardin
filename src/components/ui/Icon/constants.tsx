import type { ReactNode } from 'react'
import type { IconName } from './types'

/** Tracés SVG (viewBox 24, trait seul). */
export const ICON_PATHS: Record<IconName, ReactNode> = {
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>,
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />,
  leaf: <path d="M11 20A7 7 0 0 1 4 13c0-6 6-9 16-9 0 10-3 16-9 16zM4 21c2-6 5-9 9-11" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  map: <><path d="M9 4L3 6.5v13L9 17l6 3 6-2.5v-13L15 7z" /><path d="M9 4v13M15 7v13" /></>,
  shield: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></>,
  home: <><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
  basket: <><path d="M3 10h18l-2 10H5z" /><path d="M8 10l3-6M16 10l-3-6" /></>,
  users: <><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.5 3-5 6.5-5s6.5 1.5 6.5 5" /><path d="M16 4.7a3.5 3.5 0 010 6.6M18 15c2.2.5 3.5 2 3.5 5" /></>,
  heart: <path d="M12 20s-8-4.7-8-10.5A4.5 4.5 0 0112 7a4.5 4.5 0 018 2.5C20 15.3 12 20 12 20z" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  sprout: <><path d="M12 21v-9" /><path d="M12 12C12 8 9 6 5 6c0 4 2 6 7 6zM12 14c0-3 2-5 6-5 0 3-2 5-6 5z" /></>,
}
