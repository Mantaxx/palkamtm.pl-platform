import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// Funkcja do generowania kodu weryfikacyjnego
function generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

// Funkcja do wysyłania SMS (mock - w produkcji użyj prawdziwego providera SMS)
async function sendSMS(phoneNumber: string, code: string): Promise<boolean> {
    try {
        // W rzeczywistej aplikacji użyj providera SMS jak Twilio, AWS SNS, etc.
        console.log(`SMS do ${phoneNumber}: Twój kod weryfikacyjny to: ${code}`)

        // Symulacja opóźnienia SMS
        await new Promise(resolve => setTimeout(resolve, 1000))

        return true
    } catch (error) {
        console.error('Błąd wysyłania SMS:', error)
        return false
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Nieautoryzowany dostęp' },
                { status: 401 }
            )
        }

        const { phoneNumber } = await request.json()

        if (!phoneNumber) {
            return NextResponse.json(
                { error: 'Numer telefonu jest wymagany' },
                { status: 400 }
            )
        }

        // Walidacja numeru telefonu (format polski)
        const phoneRegex = /^(\+48\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/
        if (!phoneRegex.test(phoneNumber)) {
            return NextResponse.json(
                { error: 'Nieprawidłowy format numeru telefonu' },
                { status: 400 }
            )
        }

        // Sprawdź czy numer telefonu nie jest już używany przez innego użytkownika
        const existingUser = await prisma.user.findFirst({
            where: {
                phoneNumber: phoneNumber,
                id: { not: session.user.id }
            }
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'Ten numer telefonu jest już używany przez innego użytkownika' },
                { status: 400 }
            )
        }

        // Generuj kod weryfikacyjny
        const verificationCode = generateVerificationCode()
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minut

        // Wyślij SMS
        const smsSent = await sendSMS(phoneNumber, verificationCode)

        if (!smsSent) {
            return NextResponse.json(
                { error: 'Nie udało się wysłać SMS. Spróbuj ponownie.' },
                { status: 500 }
            )
        }

        // Zapisz kod weryfikacyjny w bazie danych
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                phoneNumber: phoneNumber,
                phoneVerificationCode: verificationCode,
                phoneVerificationExpires: expiresAt,
                isPhoneVerified: false
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Kod weryfikacyjny został wysłany na podany numer telefonu'
        })

    } catch (error) {
        console.error('Błąd wysyłania SMS:', error)
        return NextResponse.json(
            { error: 'Wystąpił błąd podczas wysyłania SMS' },
            { status: 500 }
        )
    }
}
