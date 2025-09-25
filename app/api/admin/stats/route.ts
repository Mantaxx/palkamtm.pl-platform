import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

export async function GET() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Nieautoryzowany dostęp' }, { status: 401 })
    }

    try {
        const [totalUsers, totalAuctions, totalTransactions, disputes] = await Promise.all([
            prisma.user.count(),
            prisma.auction.count({ where: { status: 'ACTIVE' } }),
            prisma.transaction.count(),
            prisma.transaction.count({ where: { status: 'DISPUTED' } }).catch(() => 0)
        ])

        return NextResponse.json({
            totalUsers,
            totalAuctions,
            totalTransactions,
            disputes
        })
    } catch (e) {
        console.error('Admin stats error', e)
        return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
    }
}


