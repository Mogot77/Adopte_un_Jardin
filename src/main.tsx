import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Pas de <StrictMode> : en développement il monte chaque effet deux fois, ce qui ouvrirait deux fois les écouteurs Firestore.
// Le comportement doit rester identique à la production.
createRoot(document.getElementById('root') as HTMLElement).render(<App />)
