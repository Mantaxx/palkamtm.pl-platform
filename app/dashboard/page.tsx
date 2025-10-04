import AuthPage from '@/app/auth/page'
import { UserDashboard } from '@/components/dashboard/UserDashboard'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return <AuthPage />
  }

  // Renderuj odpowiedni dashboard na podstawie roli użytkownika
  switch (session.user.role) {
    case 'ADMIN':
      redirect('/admin/dashboard')
      break
    case 'USER':
    default:
      return <UserDashboard />
  }
}
