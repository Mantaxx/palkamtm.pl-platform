import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(request: NextRequest, context: any) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Nieautoryzowany dostęp' }, { status: 401 })
    }

    const id = context?.params?.id as string
    try {
        const body = await request.json()
        const data: any = {}
        if (typeof body.firstName === 'string') data.firstName = body.firstName
        if (typeof body.lastName === 'string') data.lastName = body.lastName
        if (typeof body.isActive === 'boolean') data.isActive = body.isActive
        if (typeof body.role === 'string' && ['BUYER', 'SELLER', 'ADMIN'].includes(body.role)) data.role = body.role

        const updated = await prisma.user.update({ where: { id }, data })
        return NextResponse.json({ success: true, user: { id: updated.id } })
    } catch (e) {
        console.error('Admin user PATCH error', e)
        return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest, context: any) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'Nieautoryzowany dostęp' }, { status: 401 })
    }
    const id = context?.params?.id as string
    if (id === session.user.id) {
        return NextResponse.json({ error: 'Nie można usunąć własnego konta' }, { status: 400 })
    }
    try {
        await prisma.user.delete({ where: { id } })
        return NextResponse.json({ success: true })
    } catch (e) {
        console.error('Admin user DELETE error', e)
        return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 })
    }
}


