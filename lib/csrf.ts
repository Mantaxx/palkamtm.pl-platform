import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

// Generuj CSRF token
export function generateCSRFToken(): string {
    return crypto.randomBytes(32).toString('hex')
}

// Sprawdź CSRF token
export function validateCSRFToken(request: NextRequest, token: string): boolean {
    const cookieToken = request.cookies.get('csrf-token')?.value
    return cookieToken === token
}

// Ustaw CSRF token w cookie
export function setCSRFCookie(response: NextResponse, token: string): void {
    response.cookies.set('csrf-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 // 24 godziny
    })
}

// Middleware CSRF dla API routes
export function withCSRF(handler: Function) {
    return async (request: NextRequest, ...args: unknown[]) => {
        // Sprawdź czy to POST, PUT, DELETE request
        if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
            const body = await request.json()
            const csrfToken = body.csrfToken

            if (!csrfToken || !validateCSRFToken(request, csrfToken)) {
                return NextResponse.json(
                    { error: 'Nieprawidłowy CSRF token' },
                    { status: 403 }
                )
            }
        }

        return handler(request, ...args)
    }
}
