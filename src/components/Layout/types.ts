import type { ReactNode } from 'react'
import type { Theme } from '@/helpers/theme'
import type { ToastItem } from '@/components/ui/Toasts'

export type NavItem = { href: string; label: string; active: boolean }

export type LayoutViewProps = {
  theme: Theme
  name: string
  nav: NavItem[]
  toasts: ToastItem[]
  children: ReactNode
  onToggleTheme: () => void
  onLogout: () => void
  onCloseToast: (id: number) => void
}
