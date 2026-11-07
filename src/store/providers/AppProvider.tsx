import { useEffect, useState, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createAppStore } from '@/store'
import { startSync } from '@/store/queries/sync'

/** Crée le store Redux d'une session connectée et ouvre la synchronisation Firestore (fermée au démontage). */
export const AppProvider = ({ email, children }: { email: string; children: ReactNode }) => {
  const [store] = useState(createAppStore)
  useEffect(() => startSync(email, store.dispatch), [email, store])
  return <Provider store={store}>{children}</Provider>
}
