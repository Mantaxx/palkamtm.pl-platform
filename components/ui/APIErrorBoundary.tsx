'use client'

import { ReactNode } from 'react'

interface APIErrorBoundaryProps {
    children: ReactNode
    fallback?: ReactNode
    onError?: (error: Error) => void
}

export function APIErrorBoundary({ children, fallback, onError }: APIErrorBoundaryProps) {
    const handleError = (error: Error) => {
        console.error('API Error:', error)
        onError?.(error)
    }

    try {
        return <>{children}</>
    } catch (error) {
        handleError(error as Error)
        return (
            fallback || (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400">
                    <h3 className="font-semibold mb-2">Błąd API</h3>
                    <p className="text-sm">
                        {error instanceof Error ? error.message : 'Nieoczekiwany błąd'}
                    </p>
                </div>
            )
        )
    }
}
