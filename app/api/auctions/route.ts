// import { createApiRoute, createPaginatedResponse, createSuccessResponse } from '@/lib/api-middleware'
import { AppErrors } from '@/lib/error-handling'
import { requireFirebaseAuth } from '@/lib/firebase-auth'
// import { logBusinessEvent, logUserAction } from '@/lib/logger'
import { auctionQueries, createAuctionFilters, createAuctionSorting, createPagination } from '@/lib/optimized-queries'
import { requirePhoneVerification } from '@/lib/phone-verification'
import { prisma } from '@/lib/prisma'
import { auctionCreateSchema } from '@/lib/validations/schemas'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/auctions - Pobierz wszystkie aukcje
export async function GET(request: NextRequest) {
    try {
        // Pobierz parametry z URL
        const url = new URL(request.url)
        const page = parseInt(url.searchParams.get('page') || '1')
        const limit = parseInt(url.searchParams.get('limit') || '10')
        const category = url.searchParams.get('category')
        const status = url.searchParams.get('status')
        const search = url.searchParams.get('search')
        const sortBy = url.searchParams.get('sortBy') || 'newest'

        // Walidacja parametrów
        if (page < 1 || limit < 1 || limit > 100) {
            throw AppErrors.validation('Nieprawidłowe parametry paginacji')
        }

        // Utwórz filtry i sortowanie
        const where = createAuctionFilters({
            category: category || undefined,
            status: status || undefined,
            search: search || undefined,
            isApproved: true
        })
        const orderBy = createAuctionSorting(sortBy)
        const { skip, take } = createPagination(page, limit)

        // Wykonaj zapytania równolegle
        const [auctions, total] = await Promise.all([
            prisma.auction.findMany({
                where,
                ...auctionQueries.withBasicRelations,
                orderBy,
                skip,
                take,
            }),
            prisma.auction.count({ where })
        ])

        return NextResponse.json({
            data: auctions,
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
        // Sprawdź autoryzację Firebase
        const authResult = await requireFirebaseAuth(request)
        if (authResult instanceof NextResponse) {
            return authResult
        }
        const { decodedToken } = authResult

        // Sprawdź weryfikację telefonu
        const phoneVerificationError = await requirePhoneVerification(request)
        if (phoneVerificationError) {
            return phoneVerificationError
        }

        // Pobierz i waliduj dane
        const body = await request.json()
        const validatedData = auctionCreateSchema.parse(body)

        // Oblicz czas zakończenia
        const endTime = new Date()
        endTime.setDate(endTime.getDate() + 7)

        // Utwórz aukcję w bazie danych
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
                sellerId: decodedToken.uid,
                status: 'PENDING',
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
                reservePrice: true,
                startTime: true,
                endTime: true,
                status: true,
                isApproved: true,
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
                    name: validatedData.title,
                    ringNumber: validatedData.pigeon.ringNumber || `RING-${auction.id}`,
                    bloodline: validatedData.pigeon.bloodline || 'Nieznana',
                    gender: validatedData.pigeon.sex === 'male' ? 'Samiec' : validatedData.pigeon.sex === 'female' ? 'Samica' : 'Nieznana',
                    birthDate: new Date(),
                    color: validatedData.pigeon.featherColor || 'Nieznany',
                    weight: 0,
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

        // Utwórz zasoby aukcji
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

        // Log successful auction creation
        // logUserAction(decodedToken.uid, 'auction_created', {
        //     auctionId: auction.id,
        //     title: auction.title,
        //     category: auction.category
        // })

        // logBusinessEvent('auction_created', {
        //     auctionId: auction.id,
        //     sellerId: decodedToken.uid,
        //     category: auction.category,
        //     startingPrice: auction.startingPrice
        // })

        return NextResponse.json(
            {
                success: true,
                data: { auction },
                message: 'Aukcja została utworzona i oczekuje na zatwierdzenie'
            },
            { status: 201 }
        )

    } catch (error) {
        console.error('Błąd podczas tworzenia aukcji:', error)
        return NextResponse.json(
            { error: 'Wystąpił błąd podczas tworzenia aukcji' },
            { status: 500 }
        )
    }
}
