import { authOptions } from '@/lib/auth'
import { requirePhoneVerification } from '@/lib/phone-verification'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    // Sprawdź weryfikację telefonu
    const phoneVerificationError = await requirePhoneVerification(request)
    if (phoneVerificationError) {
        return phoneVerificationError
    }

    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Nieautoryzowany dostęp' },
                { status: 401 }
            )
        }

        const {
            title,
            description,
            category,
            startingPrice,
            buyNowPrice,
            reservePrice,
            endTime,
            images,
            videos,
            documents
        } = await request.json()

        // Walidacja danych
        if (!title || !description || !category || !startingPrice || !endTime) {
            return NextResponse.json(
                { error: 'Wszystkie wymagane pola muszą być wypełnione' },
                { status: 400 }
            )
        }

        if (startingPrice <= 0) {
            return NextResponse.json(
                { error: 'Cena startowa musi być większa od 0' },
                { status: 400 }
            )
        }

        if (buyNowPrice && buyNowPrice <= startingPrice) {
            return NextResponse.json(
                { error: 'Cena Kup Teraz musi być wyższa od ceny startowej' },
                { status: 400 }
            )
        }

        if (reservePrice && reservePrice > startingPrice) {
            return NextResponse.json(
                { error: 'Cena rezerwowa nie może być wyższa od ceny startowej' },
                { status: 400 }
            )
        }

        const endDateTime = new Date(endTime)
        if (endDateTime <= new Date()) {
            return NextResponse.json(
                { error: 'Data zakończenia musi być w przyszłości' },
                { status: 400 }
            )
        }

        // Sprawdź czy użytkownik ma rolę SELLER lub ADMIN
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { role: true }
        })

        if (!user || (user.role !== 'SELLER' && user.role !== 'ADMIN')) {
            return NextResponse.json(
                { error: 'Brak uprawnień do tworzenia aukcji' },
                { status: 403 }
            )
        }

        // Utwórz aukcję
        const auction = await prisma.auction.create({
            data: {
                title,
                description,
                category,
                sellerId: session.user.id,
                startingPrice,
                currentPrice: startingPrice,
                buyNowPrice: buyNowPrice || null,
                reservePrice: reservePrice || null,
                startTime: new Date(),
                endTime: endDateTime,
                images: JSON.stringify(images || []),
                videos: JSON.stringify(videos || []),
                documents: JSON.stringify(documents || []),
                status: 'PENDING' // Wymaga zatwierdzenia przez administratora
            }
        })

        return NextResponse.json({
            success: true,
            auction,
            message: 'Aukcja została utworzona i oczekuje na zatwierdzenie'
        })

    } catch (error) {
        console.error('Błąd tworzenia aukcji:', error)
        return NextResponse.json(
            { error: 'Wystąpił błąd podczas tworzenia aukcji' },
            { status: 500 }
        )
    }
}
