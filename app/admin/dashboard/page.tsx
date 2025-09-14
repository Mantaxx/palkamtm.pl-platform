import { Metadata } from 'next'
import AdminDashboard from '@/components/dashboard/AdminDashboard'

export const metadata: Metadata = {
  title: 'Panel Administratora - Gołębie Pocztowe',
  description: 'Zarządzaj platformą i użytkownikami'
}

export default function AdminDashboardPage() {
  return <AdminDashboard />
}
