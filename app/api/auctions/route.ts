import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiRateLimit } from '@/lib/rate-limit'
import { auctionCreateSchema } from '@/lib/validations/schemas'
import { AuctionStatus, Prisma } from '@prisma/client'
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
        const where: Prisma.AuctionWhereInput = {}

        if (category) {
            where.category = category
        }

        if (status && Object.values(AuctionStatus).includes(status as AuctionStatus)) {
            where.status = status as AuctionStatus
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
        })

    } catch (error) {
        console.error('Błąd podczas pobierania aukcji:', error)
        return NextResponse.json(
            { error: 'Wystąpił błąd podczas pobierania aukcji' },
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
                { error: 'Brak autoryzacji' },
                { status: 401 }
            )
        }

        // Sprawdź czy użytkownik może tworzyć aukcje
        if (session.user.role !== 'SELLER' && session.user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Brak uprawnień do tworzenia aukcji' },
                { status: 403 }
            )
        }

        const body = await request.json()

        // Walidacja danych
        const validatedData = auctionCreateSchema.parse(body)

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
                startingPrice: validatedData.startingPrice,
                currentPrice: validatedData.startingPrice,
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

        // Utwórz zasoby aukcji (obrazy, wideo, dokumenty)
        if (validatedData.images.length > 0) {
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

        return NextResponse.json({
            message: 'Aukcja została utworzona i oczekuje na zatwierdzenie',
            auction
        }, { status: 201 })

    } catch (error) {
        console.error('Błąd podczas tworzenia aukcji:', error)

        if (error instanceof Error && error.name === 'ZodError') {
            return NextResponse.json(
                { error: 'Nieprawidłowe dane', details: error.message },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Wystąpił błąd podczas tworzenia aukcji' },
            { status: 500 }
        )
    }
}
