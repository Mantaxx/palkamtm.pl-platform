
import { SimpleChampionsList } from '@/components/champions/SimpleChampionsList'

export const metadata = {
  title: 'Championy Gołębi - Lista Wszystkich Championów',
  description: 'Poznaj wszystkich championów gołębi pocztowych. Zobacz ich osiągnięcia, rodowody i galerie zdjęć.',
}

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'

export default function ChampionsPage() {
  return (
    <UnifiedLayout>
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 pt-48">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-2xl">
            Nasze Championy
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Poznaj nasze wybitne championy gołębi pocztowych. Każdy z nich to wyjątkowy przedstawiciel naszej linii hodowlanej PAŁKA MTM.
          </p>
        </div>

        <SimpleChampionsList />
      </div>
    </UnifiedLayout>
  )
}
