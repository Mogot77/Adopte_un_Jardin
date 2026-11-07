import type { ReactNode } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useAppStore'
import { useAuth } from '@/hooks/useAuth'
import { useApp } from '@/hooks/useApp'
import { useRoute } from '@/hooks/useRoute'
import { useTheme } from '@/hooks/useTheme'
import { selectToasts } from '@/store/selectors'
import { toastRemoved } from '@/store/reducers'
import { buildNav } from './helpers'
import LayoutView from './LayoutView'

/** Cadre de l'application : menu, bascule de thème, déconnexion et messages temporaires. */
const Layout = ({ children }: { children: ReactNode }) => {
  const { logout } = useAuth()
  const { profile } = useApp()
  const { path } = useRoute()
  const { theme, toggle } = useTheme()
  const dispatch = useAppDispatch()
  const toasts = useAppSelector(selectToasts)
  return (
    <LayoutView
      theme={theme} name={profile?.name ?? ''} nav={buildNav(path)} toasts={toasts}
      onToggleTheme={toggle} onLogout={() => void logout()} onCloseToast={id => dispatch(toastRemoved(id))}
    >{children}</LayoutView>
  )
}

export default Layout
