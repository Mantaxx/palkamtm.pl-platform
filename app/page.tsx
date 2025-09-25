import { HeroSection } from '@/components/home/HeroSection'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import dynamic from 'next/dynamic'

// Lazy loading dla komponentów - OPTYMALIZACJA WYDAJNOŚCI
const BentoGrid = dynamic(() => import('@/components/home/BentoGrid').then(mod => ({ default: mod.BentoGrid })), {
  loading: () => <div className="h-96 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl animate-pulse" />
})

const FeaturedChampions = dynamic(() => import('@/components/home/FeaturedChampions').then(mod => ({ default: mod.FeaturedChampions })), {
  loading: () => <div className="h-96 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl animate-pulse" />
})

const UpcomingAuctions = dynamic(() => import('@/components/home/UpcomingAuctions').then(mod => ({ default: mod.UpcomingAuctions })), {
  loading: () => <div className="h-96 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl animate-pulse" />
})

const PhilosophySection = dynamic(() => import('@/components/home/PhilosophySection').then(mod => ({ default: mod.PhilosophySection })), {
  loading: () => <div className="h-96 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl animate-pulse" />
})

export default function HomePage() {
  return (
    <UnifiedLayout>
      <div className="mt-24">
        <HeroSection />
        <BentoGrid />
        <FeaturedChampions />
        <UpcomingAuctions />
        <PhilosophySection />
      </div>
    </UnifiedLayout>
  )
}
