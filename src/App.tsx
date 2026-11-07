import { lazy, Suspense } from 'react'
import { AuthProvider } from '@/store/providers/AuthProvider'
import { AppProvider } from '@/store/providers/AppProvider'
import { useAppSelector } from '@/hooks/useAppStore'
import { useAuth } from '@/hooks/useAuth'
import { useRoute } from '@/hooks/useRoute'
import { selectProfile, selectSyncFailed } from '@/store/selectors'
import ErrorBoundary from '@/components/ErrorBoundary'
import Layout from '@/components/Layout'
import Login from '@/components/Login'
import Onboarding from '@/components/Onboarding'
import Empty from '@/components/ui/Empty'

// Écrans chargés à la demande.
const Search = lazy(() => import('@/components/Search'))
const ParcelDetail = lazy(() => import('@/components/ParcelDetail'))
const ParcelForm = lazy(() => import('@/components/ParcelForm'))
const MyParcels = lazy(() => import('@/components/MyParcels'))
const MyReservations = lazy(() => import('@/components/MyReservations'))
const Guide = lazy(() => import('@/components/Guide'))

/** Routes par hash. Ajouter ici les nouveaux écrans. */
const Routes = () => {
  const { path } = useRoute()
  const detail = /^\/parcelle\/([^/]+)$/.exec(path)
  if (detail) return <ParcelDetail key={detail[1]} id={detail[1]} />
  const edit = /^\/proposer\/([^/]+)$/.exec(path)
  if (edit) return <ParcelForm key={edit[1]} id={edit[1]} />
  switch (path) {
    case '/proposer': return <ParcelForm />
    case '/mes-parcelles': return <MyParcels />
    case '/mes-reservations': return <MyReservations />
    case '/guide': return <Guide />
    default: return <Search />
  }
}

/** Session connectée : attend le profil, propose l'inscription s'il n'existe pas, puis affiche l'application. */
const Shell = () => {
  const profile = useAppSelector(selectProfile)
  const failed = useAppSelector(selectSyncFailed)
  if (failed) return <Empty>Impossible de lire les données (droits ou réseau). Rechargez la page ou reconnectez-vous.</Empty>
  if (profile === undefined) return <Empty>Chargement…</Empty>
  if (profile === null) return <Onboarding />
  return (
    <Layout>
      <ErrorBoundary>
        <Suspense fallback={<Empty>Chargement…</Empty>}><Routes /></Suspense>
      </ErrorBoundary>
    </Layout>
  )
}

/** Portail : accueil public tant que le compte n'est pas connecté avec une adresse vérifiée. */
const Gate = () => {
  const { user, access } = useAuth()
  if (user === undefined) return <Empty>Chargement…</Empty>
  if (!user || access !== 'ok' || !user.email) return <Login />
  const email = user.email.toLowerCase()
  return <AppProvider key={email} email={email}><Shell /></AppProvider>
}

const App = () => <AuthProvider><Gate /></AuthProvider>

export default App
