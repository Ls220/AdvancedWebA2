import React from "react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Component error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <h2 className="text-lg font-semibold text-red-800">Something went wrong</h2>
            <p className="text-red-600">{this.state.error?.message || "Unknown error"}</p>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

