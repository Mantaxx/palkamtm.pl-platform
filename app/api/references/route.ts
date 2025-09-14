import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

interface Achievement {
    pigeon: string
    ringNumber: string
    results: Array<{
        competition: string
        place: number
        date: string
    }>
}

interface CreateReferenceRequest {
    breederName: string
    location: string
    experience: string
    testimonial: string
    rating: number
    achievements: Achievement[]
}

export async function GET() {
    try {
        const references = await prisma.reference.findMany({
            where: {
                isApproved: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const formattedReferences = references.map(ref => ({
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
        const body: CreateReferenceRequest = await request.json()

        // Walidacja danych
        if (!body.breederName || !body.location || !body.experience || !body.testimonial) {
            return NextResponse.json(
                { error: 'Wszystkie pola są wymagane' },
                { status: 400 }
            )
        }

        if (body.rating < 1 || body.rating > 5) {
            return NextResponse.json(
                { error: 'Ocena musi być między 1 a 5' },
                { status: 400 }
            )
        }

        if (!Array.isArray(body.achievements)) {
            return NextResponse.json(
                { error: 'Osiągnięcia muszą być tablicą' },
                { status: 400 }
            )
        }

        // Walidacja osiągnięć
        for (const achievement of body.achievements) {
            if (!achievement.pigeon || !achievement.ringNumber || !Array.isArray(achievement.results)) {
                return NextResponse.json(
                    { error: 'Nieprawidłowy format osiągnięć' },
                    { status: 400 }
                )
            }
        }

        const reference = await prisma.reference.create({
            data: {
                breederName: body.breederName,
                location: body.location,
                experience: body.experience,
                testimonial: body.testimonial,
                rating: body.rating,
                achievements: JSON.stringify(body.achievements),
                isApproved: false // Nowe referencje wymagają zatwierdzenia
            }
        })

        return NextResponse.json({
            message: 'Referencja została dodana i oczekuje na zatwierdzenie',
            id: reference.id
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating reference:', error)
        return NextResponse.json(
            { error: 'Nie udało się dodać referencji' },
            { status: 500 }
        )
    }
}
