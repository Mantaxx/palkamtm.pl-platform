import { BentoGrid } from '@/components/home/BentoGrid'
import { FeaturedChampions } from '@/components/home/FeaturedChampions'
import { HeroSection } from '@/components/home/HeroSection'
import { PhilosophySection } from '@/components/home/PhilosophySection'
import { UpcomingAuctions } from '@/components/home/UpcomingAuctions'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <BentoGrid />
      <FeaturedChampions />
      <UpcomingAuctions />
      <PhilosophySection />
    </div>
  )
}
