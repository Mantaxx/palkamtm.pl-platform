import { BentoGrid } from '@/components/home/BentoGrid'
import { FeaturedChampions } from '@/components/home/FeaturedChampions'
import { HeroSection } from '@/components/home/HeroSection'
import { PhilosophySection } from '@/components/home/PhilosophySection'
import { UpcomingAuctions } from '@/components/home/UpcomingAuctions'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'

export default function HomePage() {
  return (
    <UnifiedLayout>
      <HeroSection />
      <BentoGrid />
      <FeaturedChampions />
      <UpcomingAuctions />
      <PhilosophySection />
    </UnifiedLayout>
  )
}
