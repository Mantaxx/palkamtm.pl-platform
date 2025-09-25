import { prisma } from '@/lib/prisma'
import { apiRateLimit } from '@/lib/rate-limit'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const rateLimitResponse = apiRateLimit(request)
        if (rateLimitResponse) {
            return rateLimitResponse
        }

        const { token } = await request.json()

        if (!token) {
            return NextResponse.json(
                { error: 'Token aktywacji jest wymagany' },
                { status: 400 }
            )
        }

        // Znajdź użytkownika z tokenem aktywacji
        const user = await prisma.user.findFirst({
            where: {
                activationToken: token,
                isActive: false
            }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Nieprawidłowy lub wygasły token aktywacji' },
                { status: 400 }
            )
        }

        // Aktywuj konto
        await prisma.user.update({
            where: { id: user.id },
            data: {
                isActive: true,
                activationToken: null,
                emailVerified: new Date()
            }
        })

        return NextResponse.json({
            message: 'Konto zostało aktywowane pomyślnie'
        })

    } catch (error) {
        console.error('Błąd podczas aktywacji konta:', error)
        return NextResponse.json(
            { error: 'Wystąpił błąd podczas aktywacji konta' },
            { status: 500 }
        )
    }
}