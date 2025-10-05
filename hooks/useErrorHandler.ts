'use client'

import { useCallback, useState } from 'react'

interface UseErrorHandlerReturn {
    error: Error | null
    handleError: (error: Error) => void
    clearError: () => void
}

export function useErrorHandler(): UseErrorHandlerReturn {
    const [error, setError] = useState<Error | null>(null)

    const handleError = useCallback((error: Error) => {
        console.error('Error caught by useErrorHandler:', error)
        setError(error)
    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return {
        error,
        handleError,
        clearError
    }
}
