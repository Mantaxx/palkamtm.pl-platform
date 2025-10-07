import { DecodedIdToken } from 'firebase-admin/auth'
import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from './firebase-admin'

/**
 * Weryfikuje Firebase ID token z nagłówka Authorization
 * @param request NextRequest object
 * @returns DecodedIdToken lub null jeśli weryfikacja nie powiodła się
 */
export async function verifyFirebaseToken(request: NextRequest): Promise<DecodedIdToken | null> {
    try {
        const authHeader = request.headers.get('authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null
        }

        const token = authHeader.substring(7) // Usuń "Bearer " prefix

        if (!token) {
            return null
        }

        // Weryfikuj token z Firebase
        const decodedToken = await adminAuth.verifyIdToken(token)

        return decodedToken
    } catch (error) {
        console.error('Błąd weryfikacji Firebase token:', error)
        return null
    }
}

/**
 * Middleware do sprawdzania autoryzacji Firebase w API routes
 * @param request NextRequest object
 * @returns NextResponse z błędem lub null jeśli autoryzacja jest OK
 */
export async function requireFirebaseAuth(request: NextRequest) {
    const decodedToken = await verifyFirebaseToken(request)

    if (!decodedToken) {
        return NextResponse.json(
            { error: 'Nieautoryzowany dostęp' },
            { status: 401 }
        )
    }

    return { decodedToken }
}
