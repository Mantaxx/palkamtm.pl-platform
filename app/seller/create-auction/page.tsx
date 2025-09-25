import { Metadata } from 'next'
import CreateAuctionForm from '@/components/auctions/CreateAuctionForm'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'

export const metadata: Metadata = {
  title: 'Utwórz nową aukcję - Gołębie Pocztowe',
  description: 'Dodaj nową aukcję gołębia pocztowego na platformę'
}

export default function CreateAuctionPage() {
  return (
    <UnifiedLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Utwórz nową aukcję</h1>
            <p className="text-gray-600 mt-2">
              Dodaj nową aukcję gołębia pocztowego, suplementów lub akcesoriów
            </p>
          </div>
          
          <CreateAuctionForm />
        </div>
      </div>
    </UnifiedLayout>
  )
}
