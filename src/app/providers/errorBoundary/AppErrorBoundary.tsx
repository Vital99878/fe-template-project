import React from 'react'
import type { ReactNode } from 'react'
import { ErrorScreen } from '@/shared/ui/error-screen/ErrorScreen'

type Props = { children: ReactNode }
type State = { error: unknown | null }

// Глобальный ErrorBoundary (ловит “совсем неожиданные” падения)
export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: unknown): State {
    return { error }
  }

  render() {
    if (this.state.error) {
      return <ErrorScreen error={this.state.error} onRetry={() => this.setState({ error: null })} />
    }
    return this.props.children
  }
}
