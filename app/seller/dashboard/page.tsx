import { Metadata } from 'next'
import SellerDashboard from '@/components/dashboard/SellerDashboard'

export const metadata: Metadata = {
  title: 'Panel Sprzedawcy - Gołębie Pocztowe',
  description: 'Zarządzaj swoimi aukcjami i sprzedażami'
}

export default function SellerDashboardPage() {
  return <SellerDashboard />
}
