'use client'

import { useEffect, useState } from 'react'

export default function DebugAuth() {
    const [debugInfo, setDebugInfo] = useState<Record<string, unknown>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkEndpoints = async () => {
            try {
                console.log('Checking /api/auth/providers...')
                const providersRes = await fetch('/api/auth/providers')
                const providersText = await providersRes.text()
                console.log('Providers response (raw):', providersText)

                try {
                    const providers = JSON.parse(providersText)
                    console.log('Providers:', providers)
                    setDebugInfo((prev: Record<string, unknown>) => ({ ...prev, providers }))
                } catch (e) {
                    console.error('Providers response is not valid JSON:', providersText)
                    setDebugInfo((prev: Record<string, unknown>) => ({ ...prev, providersError: providersText.substring(0, 200) + '...' }))
                }

                console.log('Checking /api/auth/session...')
                const sessionRes = await fetch('/api/auth/session')
                const sessionText = await sessionRes.text()
                console.log('Session response (raw):', sessionText)

                try {
                    const sessionData = JSON.parse(sessionText)
                    console.log('Session data:', sessionData)
                    setDebugInfo((prev: Record<string, unknown>) => ({ ...prev, session: sessionData }))
                } catch (e) {
                    console.error('Session response is not valid JSON:', sessionText)
                    setDebugInfo((prev: Record<string, unknown>) => ({ ...prev, sessionError: sessionText.substring(0, 200) + '...' }))
                }
            } catch (error) {
                console.error('Error checking endpoints:', error)
                const errorMessage = error instanceof Error ? error.message : String(error)
                setDebugInfo((prev: Record<string, unknown>) => ({ ...prev, error: errorMessage }))
            } finally {
                setLoading(false)
            }
        }

        checkEndpoints()
    }, [])

    if (loading) {
        return (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h2 className="text-lg font-semibold text-blue-800">NextAuth Debug Info</h2>
                <p className="text-blue-600">Checking authentication endpoints...</p>
            </div>
        )
    }

    return (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">NextAuth Debug Info</h2>

            <div className="space-y-4">
                <div>
                    <h3 className="font-medium text-gray-700">Environment Setup Required:</h3>
                    <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded">
                        <p className="text-sm text-yellow-800 mb-2">
                            Create a <code className="bg-yellow-100 px-1 rounded">.env.local</code> file in your project root with:
                        </p>
                        <pre className="text-xs bg-yellow-100 p-2 rounded overflow-x-auto">
                            {`# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="pZodsQWn1UQjl4IrpRizvEwMEAhaR9/fGPSgU85gtZk="

# OAuth Providers (replace with your actual credentials)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"`}
                        </pre>
                    </div>
                </div>

                {Boolean(debugInfo.providers && typeof debugInfo.providers === 'object') && (
                    <div>
                        <h3 className="font-medium text-green-700">✅ Providers Endpoint Working</h3>
                        <pre className="text-xs bg-green-100 p-2 rounded overflow-x-auto">
                            {JSON.stringify(debugInfo.providers, null, 2)}
                        </pre>
                    </div>
                )}

                {Boolean(debugInfo.providersError && typeof debugInfo.providersError === 'string') && (
                    <div>
                        <h3 className="font-medium text-red-700">❌ Providers Endpoint Error</h3>
                        <p className="text-sm text-red-600">{debugInfo.providersError as string}</p>
                    </div>
                )}

                {Boolean(debugInfo.session && typeof debugInfo.session === 'object') && (
                    <div>
                        <h3 className="font-medium text-green-700">✅ Session Endpoint Working</h3>
                        <pre className="text-xs bg-green-100 p-2 rounded overflow-x-auto">
                            {JSON.stringify(debugInfo.session, null, 2)}
                        </pre>
                    </div>
                )}

                {Boolean(debugInfo.sessionError && typeof debugInfo.sessionError === 'string') && (
                    <div>
                        <h3 className="font-medium text-red-700">❌ Session Endpoint Error</h3>
                        <p className="text-sm text-red-600">{debugInfo.sessionError as string}</p>
                    </div>
                )}

                {Boolean(debugInfo.error && typeof debugInfo.error === 'string') && (
                    <div>
                        <h3 className="font-medium text-red-700">❌ General Error</h3>
                        <p className="text-sm text-red-600">{debugInfo.error as string}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
