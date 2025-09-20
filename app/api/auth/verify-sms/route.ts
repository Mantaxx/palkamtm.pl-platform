import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Nieautoryzowany dostęp' },
                { status: 401 }
            )
        }

        const { verificationCode } = await request.json()

        if (!verificationCode) {
            return NextResponse.json(
                { error: 'Kod weryfikacyjny jest wymagany' },
                { status: 400 }
            )
        }

        // Pobierz dane użytkownika
        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Użytkownik nie został znaleziony' },
                { status: 404 }
            )
        }

        // Sprawdź czy użytkownik ma kod weryfikacyjny
        if (!user.phoneVerificationCode || !user.phoneVerificationExpires) {
            return NextResponse.json(
                { error: 'Brak aktywnego kodu weryfikacyjnego. Wyślij nowy kod.' },
                { status: 400 }
            )
        }

        // Sprawdź czy kod nie wygasł
        if (new Date() > user.phoneVerificationExpires) {
            return NextResponse.json(
                { error: 'Kod weryfikacyjny wygasł. Wyślij nowy kod.' },
                { status: 400 }
            )
        }

        // Sprawdź czy kod jest poprawny
        if (user.phoneVerificationCode !== verificationCode) {
            return NextResponse.json(
                { error: 'Nieprawidłowy kod weryfikacyjny' },
                { status: 400 }
            )
        }

        // Zweryfikuj numer telefonu
        await prisma.user.update({
            where: { id: session.user.id },
            data: {
                isPhoneVerified: true,
                phoneVerificationCode: null,
                phoneVerificationExpires: null
            }
        })

        return NextResponse.json({
            success: true,
            message: 'Numer telefonu został pomyślnie zweryfikowany'
        })

    } catch (error) {
        console.error('Błąd weryfikacji SMS:', error)
        return NextResponse.json(
            { error: 'Wystąpił błąd podczas weryfikacji kodu' },
            { status: 500 }
        )
    }
}
