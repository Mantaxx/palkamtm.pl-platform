// import { cacheKeys, withCache } from '@/lib/cache'
import { prisma } from '@/lib/prisma'
import { apiRateLimit } from '@/lib/rate-limit'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const achievementSchema = z.object({
    pigeon: z.string(),
    ringNumber: z.string(),
    results: z.array(z.object({
        competition: z.string(),
        place: z.number(),
        date: z.string()
    }))
})

const createReferenceSchema = z.object({
    breederName: z.string(),
    location: z.string(),
    experience: z.string(),
    testimonial: z.string(),
    rating: z.number().min(1).max(5),
    achievements: z.array(achievementSchema)
})

export async function GET() {
    try {
        const references = await prisma.reference.findMany({
            where: {
                isApproved: true
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                breederName: true,
                location: true,
                experience: true,
                testimonial: true,
                rating: true,
                achievements: true,
                createdAt: true
            }
        })

        const formattedReferences = references.map((ref) => ({
            id: ref.id,
            breeder: {
                name: ref.breederName,
                location: ref.location,
                experience: ref.experience,
                avatar: '/api/placeholder/100/100'
            },
            testimonial: ref.testimonial,
            achievements: JSON.parse(ref.achievements),
            rating: ref.rating,
            date: ref.createdAt.toISOString().split('T')[0]
        }))

        return NextResponse.json(formattedReferences)
    } catch (error) {
        console.error('Error fetching references:', error)
        return NextResponse.json(
            { error: 'Nie udało się pobrać referencji' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        // Apply rate limiting
        const rateLimitResponse = apiRateLimit(request)
        if (rateLimitResponse) {
            return rateLimitResponse
        }

        const body = await request.json()
        const parsedData = createReferenceSchema.parse(body)

        const reference = await prisma.reference.create({
            data: {
                breederName: parsedData.breederName,
                location: parsedData.location,
                experience: parsedData.experience,
                testimonial: parsedData.testimonial,
                rating: parsedData.rating,
                achievements: JSON.stringify(parsedData.achievements || []),
                isApproved: false // Nowe referencje wymagają zatwierdzenia
            }
        })

        return NextResponse.json({
            message: 'Referencja została dodana i oczekuje na zatwierdzenie',
            id: reference.id
        }, { status: 201 })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
        }
        console.error('Error creating reference:', error)
        return NextResponse.json(
            { error: 'Nie udało się dodać referencji' },
            { status: 500 }
        )
    }
}
