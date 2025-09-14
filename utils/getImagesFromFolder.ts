// Funkcja do automatycznego wykrywania zdjęć w folderze
// W środowisku produkcyjnym można by to zrobić przez API endpoint

export const getImagesFromFolder = (folderPath: string): string[] => {
    // Lista znanych plików w folderze thunder-storm/gallery
    const knownImages = [
        'DRUŻYNA-A-2014-olimp-r1.jpg',
        'DRUŻYNA-B-2014-olimp-r1.jpg',
        'DV-02906-11-98t_OLIMP (1).jpg',
        'DV-02906-11-98t_OLIMP.jpg',
        'Golebie_gazeta-poprawione2b.jpg',
        'PL-0446-12-1007t_b.jpg',
        'PL-0446-12-1016-2014r (1).jpg',
        'PL-0446-12-1016-2014r.jpg',
        'PL-0446-12-328_2KK.jpg',
        'PL-0446-12-336_KK21.jpg',
        'PL-0446-13-5015.jpg',
        'PL-0446-13-5048_KK2.jpg',
        'PL-0446-13-5071_KK-OLIMP.jpg',
        'PL-11-160651t_b2 (1).jpg',
        'PL-11-160651t_b2.jpg',
    ]

    // Lista znanych plików w folderze golden-pair/photos
    const goldenPairImages = [
        'DV-02906-00-1360-D.jpg',
        'DV-0987-05-1184-D.jpg',
        'golden-pair.jpg',
    ]

    if (folderPath.includes('thunder-storm/gallery')) {
        return knownImages.map(img => `${folderPath}/${img}`)
    }

    if (folderPath.includes('golden-pair/photos')) {
        return goldenPairImages.map(img => `${folderPath}/${img}`)
    }

    // Lista znanych plików w folderach wizyt u hodowców
    const breederVisitsImages = {
        'breeder-visits/polska': [
            'wizyta-poznan-1.jpg',
            'wizyta-poznan-2.jpg',
            'wizyta-krakow-1.jpg',
            'wizyta-krakow-2.jpg',
            'wizyta-warszawa-1.jpg',
            'wizyta-warszawa-2.jpg',
        ],
        'breeder-visits/zagranica': [
            'wizyta-belgia-1.jpg',
            'wizyta-belgia-2.jpg',
            'wizyta-holandia-1.jpg',
            'wizyta-holandia-2.jpg',
            'wizyta-niemcy-1.jpg',
            'wizyta-niemcy-2.jpg',
        ],
        'breeder-visits/wystawy': [
            'wystawa-2024-1.jpg',
            'wystawa-2024-2.jpg',
            'wystawa-2023-1.jpg',
            'wystawa-2023-2.jpg',
            'targi-2024-1.jpg',
            'targi-2024-2.jpg',
        ],
        'breeder-visits/galeria': [
            'galeria-1.jpg',
            'galeria-2.jpg',
            'galeria-3.jpg',
            'galeria-4.jpg',
            'galeria-5.jpg',
            'galeria-6.jpg',
        ]
    }

    // Sprawdź czy folderPath zawiera ścieżkę do wizyt u hodowców
    for (const [path, images] of Object.entries(breederVisitsImages)) {
        if (folderPath.includes(path)) {
            return images.map(img => `/${path}/${img}`)
        }
    }

    // Lista znanych plików w folderach spotkań z hodowcami
    const meetingsWithBreedersImages = {
        'meetings with breeders/Geert Munnik': [
            'DSC_0031.jpg',
            'DSC_0038.jpg',
            'DSC_0044.jpg',
            'DSC_0399.jpg',
            'DSC_03991.jpg',
            'DSC_0409.jpg',
        ],
        'meetings with breeders/Jan Oost': [
            'DSC_0002.jpg',
            'DSC_0004.jpg',
            'DSC_0006.jpg',
            'DSC_0011.jpg',
            'DSC_0017.jpg',
            'DSC_0018.jpg',
            'DSC_0422.jpg',
            'DSC_0423.jpg',
            'DSC_0426.jpg',
        ],
        'meetings with breeders/Marginus Oostenbrink': [
            'DSC_0431.jpg',
            'DSC_0433.jpg',
            'DSC_0435.jpg',
        ],
        'meetings with breeders/Theo Lehnen': [
            'Theo-1.jpg',
            'Theo-2.jpg',
            'Theo-3.jpg',
            'Theo.jpg',
        ],
        'meetings with breeders/Toni van Ravenstein': [
            'DSC_0001.jpg',
            'DSC_0003.jpg',
            'DSCF2556.jpg',
            'DSCF2559.jpg',
            'DSCF2578.jpg',
            'TONI-1.jpg',
            'TONI-2.jpg',
        ]
    }

    // Sprawdź czy folderPath zawiera ścieżkę do spotkań z hodowcami
    for (const [path, images] of Object.entries(meetingsWithBreedersImages)) {
        if (folderPath === path) {
            return images.map(img => `/${path}/${img}`)
        }
    }

    return []
}

// Funkcja do podziału zdjęć między championów
export const distributeImages = (images: string[], championCount: number): string[][] => {
    const result: string[][] = []
    const imagesPerChampion = Math.ceil(images.length / championCount)

    for (let i = 0; i < championCount; i++) {
        const start = i * imagesPerChampion
        const end = Math.min(start + imagesPerChampion, images.length)
        result.push(images.slice(start, end))
    }

    return result
}
