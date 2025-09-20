// Centralized champion data management
export interface ChampionData {
    id: string
    name: string
    ringNumber: string
    bloodline: string
    pedigree: string
    description?: string
    achievements?: string[]
    galleryPath: string
    pedigreePath: string
    offspringPath?: string
    videosPath?: string
}

// Static champion data - in production this would come from database
export const CHAMPIONS_DATA: ChampionData[] = [
    {
        id: 'thunder-storm',
        name: 'Thunder Storm',
        ringNumber: 'PL-2023-001',
        bloodline: 'Janssen x Van Loon',
        pedigree: 'Elitarny rodowód mistrzów sprintu',
        description: 'Wybitny champion z doskonałymi wynikami w konkursach krajowych i międzynarodowych.',
        achievements: [
            '1. miejsce - Mistrzostwa Polski 2023',
            '2. miejsce - Puchar Europy 2023',
            '3. miejsce - Mistrzostwa Świata 2022'
        ],
        galleryPath: '/champions/thunder-storm/gallery',
        pedigreePath: '/champions/thunder-storm/pedigree',
        offspringPath: '/champions/thunder-storm/offspring',
        videosPath: '/champions/thunder-storm/videos'
    },
    {
        id: 'lightning-bolt',
        name: 'Lightning Bolt',
        ringNumber: 'PL-2023-002',
        bloodline: 'Janssen',
        pedigree: 'Linia mistrzów sprintu',
        description: 'Szybki jak błyskawica, doskonały w krótkich dystansach.',
        achievements: [
            '1. miejsce - Sprint Cup 2023',
            '2. miejsce - Mistrzostwa Regionu 2023'
        ],
        galleryPath: '/champions/lightning-bolt/gallery',
        pedigreePath: '/champions/lightning-bolt/pedigree'
    },
    {
        id: 'storm-queen',
        name: 'Storm Queen',
        ringNumber: 'PL-2023-003',
        bloodline: 'Van Loon',
        pedigree: 'Królowa nieba',
        description: 'Elegancka i szybka, prawdziwa królowa wśród championów.',
        achievements: [
            '1. miejsce - Queen\'s Cup 2023',
            '3. miejsce - Mistrzostwa Polski 2023'
        ],
        galleryPath: '/champions/storm-queen/gallery',
        pedigreePath: '/champions/storm-queen/pedigree'
    }
]

// Helper functions
export function getChampionById(id: string): ChampionData | undefined {
    return CHAMPIONS_DATA.find(champion => champion.id === id)
}

export function getChampionsByBloodline(bloodline: string): ChampionData[] {
    return CHAMPIONS_DATA.filter(champion =>
        champion.bloodline.toLowerCase().includes(bloodline.toLowerCase())
    )
}

export function searchChampions(query: string): ChampionData[] {
    const lowercaseQuery = query.toLowerCase()
    return CHAMPIONS_DATA.filter(champion =>
        champion.name.toLowerCase().includes(lowercaseQuery) ||
        champion.ringNumber.toLowerCase().includes(lowercaseQuery) ||
        champion.bloodline.toLowerCase().includes(lowercaseQuery) ||
        champion.pedigree.toLowerCase().includes(lowercaseQuery)
    )
}

export function getAllBloodlines(): string[] {
    const bloodlines = new Set<string>()
    CHAMPIONS_DATA.forEach(champion => {
        champion.bloodline.split(' x ').forEach(bloodline => {
            bloodlines.add(bloodline.trim())
        })
    })
    return Array.from(bloodlines).sort()
}
