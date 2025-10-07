'use client'

import { UserDashboard } from '@/components/dashboard/UserDashboard'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <UnifiedLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-white/70">Ładowanie...</p>
          </div>
        </div>
      </UnifiedLayout>
    )
  }

  if (!user) {
    return null
  }

  return <UserDashboard />
}
