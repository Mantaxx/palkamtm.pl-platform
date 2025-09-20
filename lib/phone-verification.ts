import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from './auth'
import { prisma } from './prisma'

export async function requirePhoneVerification(request: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: 'Nieautoryzowany dostęp' },
            { status: 401 }
        )
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { isPhoneVerified: true, phoneNumber: true }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Użytkownik nie został znaleziony' },
                { status: 404 }
            )
        }

        if (!user.isPhoneVerified) {
            return NextResponse.json(
                {
                    error: 'Weryfikacja numeru telefonu jest wymagana',
                    requiresPhoneVerification: true,
                    phoneNumber: user.phoneNumber
                },
                { status: 403 }
            )
        }

        return null // Brak błędu - użytkownik jest zweryfikowany
    } catch (error) {
        console.error('Błąd sprawdzania weryfikacji telefonu:', error)
        return NextResponse.json(
            { error: 'Wystąpił błąd podczas sprawdzania weryfikacji' },
            { status: 500 }
        )
    }
}

export function createPhoneVerificationMiddleware() {
    return async (request: NextRequest) => {
        return await requirePhoneVerification(request)
    }
}
