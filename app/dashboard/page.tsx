import AuthPage from '@/app/auth/page'
import { BuyerDashboard } from '@/components/dashboard/BuyerDashboard'
import SellerDashboard from '@/components/dashboard/SellerDashboard'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return (
      <UnifiedLayout>
        <AuthPage />
      </UnifiedLayout>
    )
  }

  // Renderuj odpowiedni dashboard na podstawie roli użytkownika
  switch (session.user.role) {
    case 'ADMIN':
      // Załóżmy, że istnieje komponent AdminDashboard
      // return <AdminDashboard />
      // Na razie przekierowujemy, jeśli nie ma dedykowanego komponentu
      redirect('/admin/dashboard') // lub renderuj komponent
      break
    case 'SELLER':
      return (
        <UnifiedLayout>
          <SellerDashboard />
        </UnifiedLayout>
      )
    case 'BUYER':
    default:
      return (
        <UnifiedLayout>
          <BuyerDashboard />
        </UnifiedLayout>
      )
  }
}
