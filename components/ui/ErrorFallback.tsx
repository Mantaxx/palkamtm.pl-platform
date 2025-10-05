'use client'

import { ReactNode } from 'react'

interface ErrorFallbackProps {
    error?: Error
    resetError?: () => void
    children?: ReactNode
}

export function ErrorFallback({ error, resetError, children }: ErrorFallbackProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-center">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h2 className="text-xl font-bold mb-2">Wystąpił błąd</h2>
                    <p className="text-white/80 mb-4">
                        {error?.message || 'Nieoczekiwany błąd aplikacji'}
                    </p>

                    {resetError && (
                        <button
                            onClick={resetError}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Spróbuj ponownie
                        </button>
                    )}

                    {children && (
                        <div className="mt-4">
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
