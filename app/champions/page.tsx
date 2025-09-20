import { ChampionsList } from '@/components/champions/ChampionsList'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'

export const metadata = {
  title: 'Championy Gołębi - Lista Wszystkich Championów',
  description: 'Poznaj wszystkich championów gołębi pocztowych. Zobacz ich osiągnięcia, rodowody i galerie zdjęć.',
}

export default function ChampionsPage() {
  return (
    <UnifiedLayout>
      <ChampionsList />
    </UnifiedLayout>
  )
}
