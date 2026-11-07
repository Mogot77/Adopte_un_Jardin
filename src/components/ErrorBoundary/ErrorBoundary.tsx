import { Component, type ErrorInfo } from 'react'
import type { ErrorBoundaryProps, ErrorBoundaryState } from './types'

/** Filet de sécurité : un écran défaillant n'emporte pas toute l'application. */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState { return { error } }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error(error, info.componentStack) }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <main className="mx-auto max-w-3xl p-6">
        <div className="card pad">
          <h1>Erreur d'affichage</h1>
          <p className="muted">{this.state.error.message}</p>
          <button className="btn" onClick={() => { this.setState({ error: null }); location.hash = '#/' }}>Retour à l'accueil</button>
        </div>
      </main>
    )
  }
}

export default ErrorBoundary
