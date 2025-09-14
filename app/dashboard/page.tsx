'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Nadal ładuje się

    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Przekieruj na podstawie roli użytkownika
    switch (session.user?.role) {
      case 'ADMIN':
        router.push('/admin/dashboard')
        break
      case 'SELLER':
        router.push('/seller/dashboard')
        break
      case 'BUYER':
      default:
        router.push('/buyer/dashboard')
        break
    }
  }, [session, status, router])

  // Pokazuj loader podczas przekierowania
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Przekierowywanie do panelu...</p>
      </div>
    </div>
  )
}
