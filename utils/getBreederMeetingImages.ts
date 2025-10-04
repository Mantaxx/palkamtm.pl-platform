// Funkcja do pobierania zdjęć ze spotkań z hodowcami
export const getBreederMeetingImages = (breederName: string): string[] => {
    const basePath = '/meetings with breeders'

    // Mapowanie nazw hodowców do ich folderów
    const breederFolders: Record<string, string[]> = {
        'Geert Munnik': [
            'DSC_0031.jpg',
            'DSC_0038.jpg',
            'DSC_0044.jpg',
            'DSC_0399.jpg',
            'DSC_03991.jpg',
            'DSC_0409.jpg'
        ],
        'Jan Oost': [
            'DSC_0002.jpg',
            'DSC_0004.jpg',
            'DSC_0006.jpg',
            'DSC_0011.jpg',
            'DSC_0017.jpg',
            'DSC_0018.jpg',
            'DSC_0422.jpg',
            'DSC_0423.jpg',
            'DSC_0426.jpg'
        ],
        'Marginus Oostenbrink': [
            'DSC_0431.jpg',
            'DSC_0433.jpg',
            'DSC_0435.jpg'
        ],
        'Theo Lehnen': [
            'Theo-1.jpg',
            'Theo-2.jpg',
            'Theo-3.jpg',
            'Theo.jpg'
        ],
        'Toni van Ravenstein': [
            'DSC_0001.jpg',
            'DSC_0003.jpg',
            'DSCF2556.jpg',
            'DSCF2559.jpg',
            'DSCF2578.jpg',
            'TONI-1.jpg',
            'TONI-2.jpg'
        ]
    }

    const images = breederFolders[breederName] || []
    return images.map(image => `${basePath}/${breederName}/${image}`)
}

// Funkcja do pobierania wszystkich zdjęć ze spotkań
export const getAllBreederMeetingImages = (): string[] => {
    const breeders = ['Geert Munnik', 'Jan Oost', 'Marginus Oostenbrink', 'Theo Lehnen', 'Toni van Ravenstein']
    const allImages: string[] = []

    breeders.forEach(breeder => {
        const images = getBreederMeetingImages(breeder)
        allImages.push(...images)
    })

    return allImages
}

// Funkcja do pobierania wszystkich spotkań z hodowcami
export const getAllBreederMeetings = async (): Promise<Array<{
    id: string
    name: string
    location: string
    date: string
    description: string
    images: string[]
}>> => {
    // Dane z rzeczywistych folderów
    const breeders = [
        {
            name: 'Geert Munnik',
            location: 'Holandia',
            date: '2023-05-15',
            description: 'Spotkanie z Geertem Munnikiem - doświadczonym hodowcą gołębi pocztowych z Holandii.'
        },
        {
            name: 'Jan Oost',
            location: 'Holandia',
            date: '2023-06-20',
            description: 'Wizyta u Jana Oosta - znanego hodowcy z wieloletnim doświadczeniem.'
        },
        {
            name: 'Marginus Oostenbrink',
            location: 'Holandia',
            date: '2023-07-10',
            description: 'Spotkanie z Marginusem Oostenbrinkiem - ekspertem w dziedzinie hodowli.'
        },
        {
            name: 'Theo Lehnen',
            location: 'Niemcy',
            date: '2023-08-05',
            description: 'Wizyta u Theo Lehnena - niemieckiego hodowcy gołębi pocztowych.'
        },
        {
            name: 'Toni van Ravenstein',
            location: 'Holandia',
            date: '2023-09-12',
            description: 'Spotkanie z Tonim van Ravensteinem - hodowcą z wieloletnim doświadczeniem.'
        }
    ]

    return breeders.map((breeder, index) => ({
        id: `meeting-${index + 1}`,
        name: breeder.name,
        location: breeder.location,
        date: breeder.date,
        description: breeder.description,
        images: getBreederMeetingImages(breeder.name)
    }))
}