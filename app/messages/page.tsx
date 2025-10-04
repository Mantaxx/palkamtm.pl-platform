import { MessagesPage } from '@/components/messages/MessagesPage'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function MessagesPageRoute() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
        redirect('/auth/signin')
    }

    return <MessagesPage userId={session.user.id} />
}
