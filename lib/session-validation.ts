import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export interface SessionValidationResult {
    isValid: boolean
    session?: any
    error?: string
    statusCode?: number
}

/**
 * Waliduje sesję użytkownika dla API routes
 */
export async function validateSession(request: NextRequest): Promise<SessionValidationResult> {
    try {
        const session = await getServerSession(authOptions)

        if (!session) {
            return {
                isValid: false,
                error: 'Brak autoryzacji',
                statusCode: 401
            }
        }

        if (!session.user?.id) {
            return {
                isValid: false,
                error: 'Nieprawidłowa sesja',
                statusCode: 401
            }
        }

        if (!session.user.emailVerified) {
            return {
                isValid: false,
                error: 'Email nie jest zweryfikowany',
                statusCode: 403
            }
        }

        return {
            isValid: true,
            session
        }
    } catch (error) {
        console.error('Session validation error:', error)
        return {
            isValid: false,
            error: 'Błąd walidacji sesji',
            statusCode: 500
        }
    }
}

/**
 * Waliduje sesję administratora
 */
export async function validateAdminSession(request: NextRequest): Promise<SessionValidationResult> {
    const sessionResult = await validateSession(request)

    if (!sessionResult.isValid) {
        return sessionResult
    }

    if (sessionResult.session?.user?.role !== 'ADMIN') {
        return {
            isValid: false,
            error: 'Brak uprawnień administratora',
            statusCode: 403
        }
    }

    return sessionResult
}

/**
 * Helper do tworzenia odpowiedzi błędów autoryzacji
 */
export function createAuthErrorResponse(error: string, statusCode: number = 401) {
    return NextResponse.json(
        { error },
        { status: statusCode }
    )
}

/**
 * Helper do walidacji sesji z automatyczną odpowiedzią błędów
 */
export async function requireAuth(request: NextRequest) {
    const sessionResult = await validateSession(request)

    if (!sessionResult.isValid) {
        return createAuthErrorResponse(sessionResult.error!, sessionResult.statusCode!)
    }

    return null
}

/**
 * Helper do walidacji sesji administratora z automatyczną odpowiedzią błędów
 */
export async function requireAdminAuth(request: NextRequest) {
    const sessionResult = await validateAdminSession(request)

    if (!sessionResult.isValid) {
        return createAuthErrorResponse(sessionResult.error!, sessionResult.statusCode!)
    }

    return null
}
