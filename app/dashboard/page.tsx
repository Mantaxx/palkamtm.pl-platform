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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden">
      {/* Tło z animowanymi elementami */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 text-center">
        <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-white mb-2">Przekierowywanie...</h2>
        <p className="text-gray-300">Przygotowujemy Twój panel</p>
      </div>
    </div>
  )
}
