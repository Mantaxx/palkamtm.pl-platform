import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const activateSchema = z.object({
    token: z.string().min(1, 'Token aktywacji jest wymagany'),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { token } = activateSchema.parse(body)

        // Find user by activation token
        const user = await prisma.user.findFirst({
            where: {
                activationToken: token,
                isActive: false,
            }
        })

        if (!user) {
            return NextResponse.json(
                { message: 'Nieprawidłowy lub wygasły token aktywacji' },
                { status: 400 }
            )
        }

        // Check if token is not too old (24 hours)
        const tokenAge = Date.now() - user.createdAt.getTime()
        const maxAge = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

        if (tokenAge > maxAge) {
            // Delete expired user
            await prisma.user.delete({ where: { id: user.id } })
            return NextResponse.json(
                { message: 'Token aktywacji wygasł. Zarejestruj się ponownie.' },
                { status: 400 }
            )
        }

        // Activate user account
        await prisma.user.update({
            where: { id: user.id },
            data: {
                isActive: true,
                activationToken: null, // Clear the token
                emailVerified: new Date(),
            }
        })

        return NextResponse.json(
            { message: 'Konto zostało pomyślnie aktywowane' },
            { status: 200 }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: error.errors[0].message },
                { status: 400 }
            )
        }

        console.error('Activation error:', error)
        return NextResponse.json(
            { message: 'Wystąpił błąd podczas aktywacji konta' },
            { status: 500 }
        )
    }
}
