import { Metadata } from 'next'
import AdminDashboard from '@/components/dashboard/AdminDashboard'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'

export const metadata: Metadata = {
  title: 'Panel Administratora - Gołębie Pocztowe',
  description: 'Zarządzaj platformą i użytkownikami'
}

export default function AdminDashboardPage() {
  return (
    <UnifiedLayout>
      <AdminDashboard />
    </UnifiedLayout>
  )
}
