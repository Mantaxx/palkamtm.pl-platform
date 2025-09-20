import { ChampionProfile } from '@/components/champions/ChampionProfile'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { notFound } from 'next/navigation'

// Mock data - w rzeczywistej aplikacji dane będą pobierane z API
const championData = {
  id: 'thunder-storm',
  name: 'Thunder Storm',
  ringNumber: 'PL-2023-001',
  bloodline: 'Janssen x Van Loon',
  gender: 'Samiec',
  birthDate: '2023-03-15',
  color: 'Niebieski z białymi plamkami',
  weight: '450g',
  breeder: 'Jan Kowalski',
  achievements: [
    {
      competition: 'Międzynarodowe Zawody 2024',
      place: 1,
      date: '2024-06-15',
      distance: '500km',
      participants: 1200,
    },
    {
      competition: 'Mistrzostwa Europy 2023',
      place: 2,
      date: '2023-09-20',
      distance: '600km',
      participants: 800,
    },
    {
      competition: 'Puchar Polski 2023',
      place: 1,
      date: '2023-07-10',
      distance: '400km',
      participants: 600,
    },
  ],
  pedigree: {
    father: {
      name: 'Lightning Bolt',
      ringNumber: 'PL-2021-045',
      bloodline: 'Janssen',
      achievements: ['Mistrz Polski 2022'],
    },
    mother: {
      name: 'Storm Queen',
      ringNumber: 'PL-2021-078',
      bloodline: 'Van Loon',
      achievements: ['Mistrzyni Europy 2022'],
    },
    grandfather: {
      name: 'Thunder King',
      ringNumber: 'PL-2019-012',
      bloodline: 'Janssen',
    },
    grandmother: {
      name: 'Lightning Lady',
      ringNumber: 'PL-2019-034',
      bloodline: 'Janssen',
    },
  },
  offspring: [
    {
      id: 'storm-junior-1',
      name: 'Storm Junior I',
      ringNumber: 'PL-2024-001',
      achievements: ['1. miejsce - Młodzieżowe Mistrzostwa 2024'],
    },
    {
      id: 'storm-junior-2',
      name: 'Storm Junior II',
      ringNumber: 'PL-2024-002',
      achievements: ['2. miejsce - Młodzieżowe Mistrzostwa 2024'],
    },
  ],
  gallery: [
    {
      id: '1',
      src: '/champions/thunder-storm/gallery/DV-02906-00-1360-D.jpg',
      alt: 'Thunder Storm - widok z przodu',
      thumbnail: '/champions/thunder-storm/gallery/DV-02906-00-1360-D.jpg',
    },
    {
      id: '2',
      src: '/champions/thunder-storm/gallery/DV-02906-11-98t_OLIMP.jpg',
      alt: 'Thunder Storm - widok z boku',
      thumbnail: '/champions/thunder-storm/gallery/DV-02906-11-98t_OLIMP.jpg',
    },
    {
      id: '3',
      src: '/champions/thunder-storm/gallery/PL-0446-12-1016-2014r.jpg',
      alt: 'Thunder Storm - podczas lotu',
      thumbnail: '/champions/thunder-storm/gallery/PL-0446-12-1016-2014r.jpg',
    },
    {
      id: '4',
      src: '/champions/thunder-storm/gallery/Złota-Para.jpg',
      alt: 'Thunder Storm - z trofeum',
      thumbnail: '/champions/thunder-storm/gallery/Złota-Para.jpg',
    },
    {
      id: '5',
      src: '/champions/thunder-storm/gallery/PL-0446-13-5071_KK-OLIMP.jpg',
      alt: 'Thunder Storm - olimpijczyk',
      thumbnail: '/champions/thunder-storm/gallery/PL-0446-13-5071_KK-OLIMP.jpg',
    },
    {
      id: '6',
      src: '/champions/thunder-storm/gallery/PL-0446-13-5015.jpg',
      alt: 'Thunder Storm - profil',
      thumbnail: '/champions/thunder-storm/gallery/PL-0446-13-5015.jpg',
    },
  ],
  videos: [
    {
      title: 'Lot treningowy - 300km',
      url: '/champions/thunder-storm/videos/training-flight.mp4',
      duration: '2:15',
      thumbnail: '/champions/thunder-storm/gallery/DV-02906-11-98t_OLIMP.jpg',
    },
    {
      title: 'Powrót z zawodów',
      url: '/champions/thunder-storm/videos/competition-return.mp4',
      duration: '1:45',
      thumbnail: '/champions/thunder-storm/gallery/PL-0446-12-1016-2014r.jpg',
    },
  ],
}

export const metadata = {
  title: `${championData.name} - Profil Championa`,
  description: `Poznaj ${championData.name}, championa z linii ${championData.bloodline}. Zobacz jego osiągnięcia, rodowód i galerię.`,
}

export default async function ChampionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // W rzeczywistej aplikacji tutaj będzie pobieranie danych z API
  if (id !== 'thunder-storm') {
    notFound()
  }

  return (
    <UnifiedLayout>
      <ChampionProfile champion={championData} />
    </UnifiedLayout>
  )
}
