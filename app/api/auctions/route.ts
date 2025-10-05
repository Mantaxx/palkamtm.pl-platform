import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiRateLimit } from '@/lib/rate-limit'
import { auctionCreateSchema } from '@/lib/validations/schemas'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/auctions - Pobierz wszystkie aukcje
export async function GET(request: NextRequest) {
    try {
        // Rate limiting
        const rateLimitResponse = apiRateLimit(request)
        if (rateLimitResponse) {
            return rateLimitResponse
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const category = searchParams.get('category')
        const status = searchParams.get('status')
        const search = searchParams.get('search')
        const sortBy = searchParams.get('sortBy') || 'newest'

        const skip = (page - 1) * limit

        // Buduj warunki filtrowania
        const where: any = {}

        if (category) {
            where.category = category
        }

        if (status) {
            where.status = status
        }

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } }
            ]
        }

        // Buduj sortowanie
        let orderBy: Record<string, string> = {}
        switch (sortBy) {
            case 'newest':
                orderBy = { createdAt: 'desc' }
                break
            case 'oldest':
                orderBy = { createdAt: 'asc' }
                break
            case 'price-low':
                orderBy = { currentPrice: 'asc' }
                break
            case 'price-high':
                orderBy = { currentPrice: 'desc' }
                break
            case 'ending-soon':
                orderBy = { endTime: 'asc' }
                break
            default:
                orderBy = { createdAt: 'desc' }
        }

        // Test połączenia z bazą danych
        try {
            await prisma.$connect()
        } catch (dbError) {
            console.error('Błąd połączenia z bazą danych:', dbError)
            return NextResponse.json(
                { error: 'Błąd połączenia z bazą danych' },
                { status: 500 }
            )
        }

        // Pobierz aukcje z bazy danych - zoptymalizowane zapytanie
        const [auctions, total] = await Promise.all([
            prisma.auction.findMany({
                where,
                select: {
                    id: true,
                    title: true,
                    description: true,
                    category: true,
                    startingPrice: true,
                    currentPrice: true,
                    buyNowPrice: true,
                    reservePrice: true,
                    startTime: true,
                    endTime: true,
                    status: true,
                    createdAt: true,
                    updatedAt: true,
                    seller: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        }
                    },
                    pigeon: {
                        select: {
                            id: true,
                            name: true,
                            ringNumber: true,
                        }
                    },
                    // Pobierz tylko ID assetów i ich URL - bez niepotrzebnych danych
                    assets: {
                        select: {
                            id: true,
                            type: true,
                            url: true,
                        }
                    },
                    // Pobierz tylko najnowszą ofertę - to wystarczy do wyświetlenia listy
                    bids: {
                        select: {
                            id: true,
                            amount: true,
                            createdAt: true,
                        },
                        orderBy: { createdAt: 'desc' },
                        take: 1
                    },
                    _count: {
                        select: {
                            bids: true,
                            watchlist: true
                        }
                    }
                },
                orderBy,
                skip,
                take: limit
            }),
            prisma.auction.count({ where })
        ])

        return NextResponse.json({
            auctions,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        }, {
            headers: {
                'Cache-Control': 'public, max-age=300, s-maxage=300',
                'CDN-Cache-Control': 'max-age=300'
            }
        })

    } catch (error) {
        console.error('Błąd podczas pobierania aukcji:', error)
        console.error('Error details:', {
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            name: error instanceof Error ? error.name : undefined
        })
        return NextResponse.json(
            {
                error: 'Wystąpił błąd podczas pobierania aukcji',
                details: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        )
    }
}

// POST /api/auctions - Utwórz nową aukcję
export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const rateLimitResponse = apiRateLimit(request)
        if (rateLimitResponse) {
            return rateLimitResponse
        }

        // Sprawdź autoryzację
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    error: 'Musisz być zalogowany, aby utworzyć aukcję',
                    code: 'UNAUTHORIZED',
                    requiresLogin: true
                },
                { status: 401 }
            )
        }

        // Sprawdź weryfikację telefonu dla tworzenia aukcji (tymczasowo wyłączone dla testów)
        // const phoneVerificationError = await requirePhoneVerification()
        // if (phoneVerificationError) {
        //     return phoneVerificationError
        // }

        const body = await request.json()

        console.log('=== TWORZENIE AUKCJI ===')
        console.log('Session user:', session.user)
        console.log('Request body:', JSON.stringify(body, null, 2))

        // Sprawdź czy użytkownik istnieje w bazie danych
        let user = await prisma.user.findUnique({
            where: { id: session.user.id }
        })

        if (!user) {
            // Jeśli użytkownik nie istnieje, utwórz go
            const nameParts = session.user.name?.split(' ') || []
            user = await prisma.user.create({
                data: {
                    id: session.user.id,
                    email: session.user.email!,
                    firstName: nameParts[0] || '',
                    lastName: nameParts.slice(1).join(' ') || '',
                    image: session.user.image,
                    role: 'USER', // Poprawna rola zgodna ze schematem
                    isActive: true,
                    emailVerified: new Date()
                }
            })
        } else if (user.role !== 'USER' && user.role !== 'ADMIN') {
            // Napraw nieprawidłową rolę
            user = await prisma.user.update({
                where: { id: session.user.id },
                data: { role: 'USER' }
            })
        }

        // Walidacja danych
        let validatedData
        try {
            validatedData = auctionCreateSchema.parse(body)
        } catch (validationError) {
            console.error('Błąd walidacji danych:', validationError)
            return NextResponse.json(
                {
                    error: 'Nieprawidłowe dane w formularzu',
                    code: 'VALIDATION_ERROR',
                    details: validationError instanceof Error ? validationError.message : 'Nieznany błąd walidacji',
                    requiresDataFix: true
                },
                { status: 400 }
            )
        }

        // Sprawdź czy data zakończenia jest w przyszłości
        const endTime = new Date(validatedData.endTime)
        if (endTime <= new Date()) {
            return NextResponse.json(
                { error: 'Data zakończenia musi być w przyszłości' },
                { status: 400 }
            )
        }

        // Utwórz aukcję w bazie danych - zoptymalizowane zapytanie
        const auction = await prisma.auction.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                category: validatedData.category,
                startingPrice: validatedData.startingPrice || 0,
                currentPrice: validatedData.startingPrice || validatedData.buyNowPrice || 0,
                buyNowPrice: validatedData.buyNowPrice,
                reservePrice: validatedData.reservePrice,
                startTime: new Date(validatedData.startTime),
                endTime: endTime,
                sellerId: session.user.id,
                status: 'PENDING', // Wymaga zatwierdzenia przez admina
                isApproved: false
            },
            select: {
                id: true,
                title: true,
                description: true,
                category: true,
                startingPrice: true,
                currentPrice: true,
                buyNowPrice: true,
                status: true,
                startTime: true,
                endTime: true,
                createdAt: true,
                seller: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    }
                }
            }
        })

        // Utwórz gołębia jeśli są dane
        if (validatedData.pigeon) {
            await prisma.pigeon.create({
                data: {
                    name: validatedData.title, // Używamy tytułu aukcji jako nazwy gołębia
                    ringNumber: validatedData.pigeon.ringNumber || `RING-${auction.id}`,
                    bloodline: validatedData.pigeon.bloodline || 'Nieznana',
                    gender: validatedData.pigeon.sex === 'male' ? 'Samiec' : validatedData.pigeon.sex === 'female' ? 'Samica' : 'Nieznana',
                    birthDate: new Date(), // Domyślna data urodzenia
                    color: validatedData.pigeon.featherColor || 'Nieznany',
                    weight: 0, // Domyślna waga
                    breeder: 'Nieznany',
                    description: validatedData.description,
                    images: JSON.stringify(validatedData.images || []),
                    videos: JSON.stringify(validatedData.videos || []),
                    pedigree: JSON.stringify(validatedData.documents || []),
                    achievements: JSON.stringify(validatedData.pigeon.purpose || []),
                    auctions: {
                        connect: { id: auction.id }
                    }
                }
            })
        }

        // Utwórz zasoby aukcji (obrazy, wideo, dokumenty)
        if (validatedData.images && validatedData.images.length > 0) {
            await prisma.auctionAsset.createMany({
                data: validatedData.images.map(url => ({
                    auctionId: auction.id,
                    type: 'IMAGE',
                    url
                }))
            })
        }

        if (validatedData.videos && validatedData.videos.length > 0) {
            await prisma.auctionAsset.createMany({
                data: validatedData.videos.map(url => ({
                    auctionId: auction.id,
                    type: 'VIDEO',
                    url
                }))
            })
        }

        if (validatedData.documents && validatedData.documents.length > 0) {
            await prisma.auctionAsset.createMany({
                data: validatedData.documents.map(url => ({
                    auctionId: auction.id,
                    type: 'DOCUMENT',
                    url
                }))
            })
        }

        console.log('✅ Aukcja utworzona pomyślnie:', auction.id)

        return NextResponse.json({
            message: 'Aukcja została utworzona i oczekuje na zatwierdzenie',
            auction
        }, { status: 201 })

    } catch (error) {
        console.error('=== BŁĄD TWORZENIA AUKCJI ===')
        console.error('Error:', error)
        console.error('Error name:', error instanceof Error ? error.name : 'Unknown')
        console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')

        if (error instanceof Error && error.name === 'ZodError') {
            console.error('Zod validation error:', error.message)
            return NextResponse.json(
                { error: 'Nieprawidłowe dane', details: error.message },
                { status: 400 }
            )
        }

        // Sprawdź czy to błąd Prisma
        if (error instanceof Error && error.message.includes('prisma')) {
            console.error('Prisma database error:', error.message)
            return NextResponse.json(
                { error: 'Błąd bazy danych', details: error.message },
                { status: 500 }
            )
        }

        return NextResponse.json(
            {
                error: 'Wystąpił błąd podczas tworzenia aukcji',
                details: error instanceof Error ? error.message : 'Nieznany błąd'
            },
            { status: 500 }
        )
    }
}
