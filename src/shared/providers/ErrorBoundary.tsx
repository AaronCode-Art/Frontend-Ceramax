import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          <h1 style={{ fontSize: '1.5rem', color: '#dc2626', marginBottom: '0.5rem' }}>
            Algo salió mal
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem', maxWidth: '400px' }}>
            Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
          </p>
          {this.state.error && (
            <pre style={{
              backgroundColor: '#f3f4f6',
              padding: '1rem',
              borderRadius: '0.5rem',
              marginBottom: '1.5rem',
              maxWidth: '100%',
              overflow: 'auto',
              fontSize: '0.875rem',
              color: '#374151',
            }}>
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 500,
            }}
          >
            Reintentar
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
