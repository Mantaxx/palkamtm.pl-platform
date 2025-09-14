import { Metadata } from 'next'
import AdvancedSearch from '@/components/search/AdvancedSearch'

export const metadata: Metadata = {
  title: 'Wyszukiwanie aukcji - Gołębie Pocztowe',
  description: 'Znajdź idealnego gołębia pocztowego lub akcesoria na naszej platformie aukcyjnej'
}

export default function SearchPage() {
  return <AdvancedSearch />
}
