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
const Swap = lazy(() => import('@/components/Swap'))
const PlantDetail = lazy(() => import('@/components/PlantDetail'))
const PlantForm = lazy(() => import('@/components/PlantForm'))
const Harvests = lazy(() => import('@/components/Harvests'))
const HarvestDetail = lazy(() => import('@/components/HarvestDetail'))
const HarvestForm = lazy(() => import('@/components/HarvestForm'))
const Guide = lazy(() => import('@/components/Guide'))

/** Routes par hash. Ajouter ici les nouveaux écrans. */
const Routes = () => {
  const { path } = useRoute()
  const detail = /^\/parcelle\/([^/]+)$/.exec(path)
  if (detail) return <ParcelDetail key={detail[1]} id={detail[1]} />
  const edit = /^\/proposer\/([^/]+)$/.exec(path)
  if (edit) return <ParcelForm key={edit[1]} id={edit[1]} />
  const plantEdit = /^\/echanges\/proposer\/([^/]+)$/.exec(path)
  if (plantEdit) return <PlantForm key={plantEdit[1]} id={plantEdit[1]} />
  const plant = /^\/echanges\/([^/]+)$/.exec(path)
  if (plant && plant[1] !== 'proposer') return <PlantDetail key={plant[1]} id={plant[1]} />
  const harvestEdit = /^\/cueillette\/proposer\/([^/]+)$/.exec(path)
  if (harvestEdit) return <HarvestForm key={harvestEdit[1]} id={harvestEdit[1]} />
  const harvest = /^\/cueillette\/([^/]+)$/.exec(path)
  if (harvest && harvest[1] !== 'proposer') return <HarvestDetail key={harvest[1]} id={harvest[1]} />
  switch (path) {
    case '/proposer': return <ParcelForm />
    case '/mes-parcelles': return <MyParcels />
    case '/mes-reservations': return <MyReservations />
    case '/echanges': return <Swap />
    case '/echanges/proposer': return <PlantForm />
    case '/cueillette': return <Harvests />
    case '/cueillette/proposer': return <HarvestForm />
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

/** Portail : accueil public tant qu'aucun compte (anonyme) n'est connecté. */
const Gate = () => {
  const { user } = useAuth()
  if (user === undefined) return <Empty>Chargement…</Empty>
  if (!user) return <Login />
  return <AppProvider key={user.uid} email={user.uid}><Shell /></AppProvider>
}

const App = () => <AuthProvider><Gate /></AuthProvider>

export default App
