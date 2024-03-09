"use client"

import { PureComponent } from "react"

interface ErrorBoundaryProps {
    fallback: React.ReactNode
    children: React.ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}

export class ErrorBoundary extends PureComponent<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }
    static getDerivedStateFromError() {
        return { hasError: true }
    }

    override componentDidMount(): void {
        window.addEventListener("unhandledrejection", this.handleUnhandledRejection)
    }

    override componentWillUnmount(): void {
        window.removeEventListener("unhandledrejection", this.handleUnhandledRejection)
    }

    override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error(error)
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback
        }
        return this.props.children
    }

    private handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        console.error("unhandledrejection with reason", event.reason)
    }
}
