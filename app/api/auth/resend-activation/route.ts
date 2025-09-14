import { createActivationEmail, generateActivationToken, sendEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const resendSchema = z.object({
    email: z.string().email('Nieprawidłowy adres email'),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email } = resendSchema.parse(body)

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json(
                { message: 'Użytkownik z tym adresem email nie istnieje' },
                { status: 404 }
            )
        }

        if (user.isActive) {
            return NextResponse.json(
                { message: 'Konto jest już aktywne' },
                { status: 400 }
            )
        }

        // Generate new activation token
        const newActivationToken = generateActivationToken()

        // Update user with new token
        await prisma.user.update({
            where: { id: user.id },
            data: {
                activationToken: newActivationToken,
                createdAt: new Date(), // Reset creation time for new 24h window
            }
        })

        // Send new activation email
        const emailData = createActivationEmail(email, newActivationToken)
        const emailSent = await sendEmail(emailData)

        if (!emailSent) {
            return NextResponse.json(
                { message: 'Błąd wysyłania emaila aktywacyjnego' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: 'Email aktywacyjny został ponownie wysłany' },
            { status: 200 }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: error.errors[0].message },
                { status: 400 }
            )
        }

        console.error('Resend activation error:', error)
        return NextResponse.json(
            { message: 'Wystąpił błąd podczas wysyłania emaila' },
            { status: 500 }
        )
    }
}
