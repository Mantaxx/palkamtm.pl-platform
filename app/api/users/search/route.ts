import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { apiRateLimit } from '@/lib/rate-limit'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// GET /api/users/search - Wyszukaj użytkowników
export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions)
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Nieautoryzowany dostęp' }, { status: 401 })
        }

        const rateLimitResponse = apiRateLimit(request)
        if (rateLimitResponse) {
            return rateLimitResponse
        }

        const { searchParams } = new URL(request.url)
        const query = searchParams.get('q')?.trim()
        const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 20)

        if (!query || query.length < 2) {
            return NextResponse.json({ users: [] })
        }

        // Wyszukaj użytkowników po imieniu, nazwisku lub emailu
        const users = await prisma.user.findMany({
            where: {
                AND: [
                    { isActive: true },
                    { id: { not: session.user.id } }, // Wyklucz aktualnego użytkownika
                    {
                        OR: [
                            { firstName: { contains: query } },
                            { lastName: { contains: query } },
                            { email: { contains: query } }
                        ]
                    }
                ]
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                image: true
            },
            take: limit,
            orderBy: [
                { firstName: 'asc' },
                { lastName: 'asc' }
            ]
        })

        return NextResponse.json({ users })

    } catch (error) {
        console.error('Error searching users:', error)
        return NextResponse.json(
            { error: 'Nie udało się wyszukać użytkowników' },
            { status: 500 }
        )
    }
}
