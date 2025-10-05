'use client'

import { useCallback, useState } from 'react'

interface APIError {
    message: string
    status?: number
    code?: string
}

interface UseAPIErrorReturn {
    error: APIError | null
    setError: (error: APIError | null) => void
    handleAPIError: (error: any) => void
    clearError: () => void
}

export function useAPIError(): UseAPIErrorReturn {
    const [error, setError] = useState<APIError | null>(null)

    const handleAPIError = useCallback((error: any) => {
        console.error('API Error:', error)

        let apiError: APIError

        if (error?.response?.data?.message) {
            apiError = {
                message: error.response.data.message,
                status: error.response.status,
                code: error.response.data.code
            }
        } else if (error?.message) {
            apiError = {
                message: error.message,
                status: error.status,
                code: error.code
            }
        } else {
            apiError = {
                message: 'Nieoczekiwany błąd serwera',
                status: 500
            }
        }

        setError(apiError)
    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    return {
        error,
        setError,
        handleAPIError,
        clearError
    }
}
