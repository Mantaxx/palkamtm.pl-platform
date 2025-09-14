import TimelineSection from '@/components/heritage/TimelineSection'
import { PhilosophySection } from '@/components/heritage/PhilosophySection'
import { ModernMethodsSection } from '@/components/heritage/ModernMethodsSection'

export const metadata = {
  title: 'Nasze Dziedzictwo - Gołębie Pocztowe',
  description: 'Poznaj bogatą historię naszej hodowli gołębi pocztowych i filozofię hodowli.',
}

export default function HeritagePage() {
  return (
    <div className="min-h-screen">
      <TimelineSection />
      <PhilosophySection />
      <ModernMethodsSection />
    </div>
  )
}
