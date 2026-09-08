/*
 * <license header>
 */

import React, { Component } from 'react'
import { useIms } from '@adobe/aio-commerce-lib-admin-ui/web'
import { MainPage } from '@components/MainPage'
import type { ErrorBoundaryState, ErrorBoundaryProps } from '@web/types/ui'

// Error Boundary Component
class CustomErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('React Error Boundary caught an error:', error, errorInfo)
  }

  override render() {
    if (this.state.hasError) {
      return (
        <React.Fragment>
          <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Something went wrong :(</h1>
          <pre>{this.state.error?.message || 'Unknown error'}</pre>
        </React.Fragment>
      )
    }

    return this.props.children
  }
}

// Main App Component
const App: React.FC = () => {
  const { data: ims } = useIms()

  return (
    <CustomErrorBoundary>
      <MainPage runtime={{ on: () => {} }} ims={{ token: ims?.imsToken, org: ims?.imsOrgId }} />
    </CustomErrorBoundary>
  )
}

export default App
