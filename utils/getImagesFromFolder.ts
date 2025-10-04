// Funkcja do automatycznego wykrywania zdjęć w folderze
// Używa API endpoint do pobierania aktualnych zdjęć z cacheowaniem

// Cache dla obrazów
const imageCache = new Map<string, { data: string[], timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minut

export const getImagesFromFolder = async (folderPath: string): Promise<string[]> => {
    try {
        // Sprawdź cache
        const cached = imageCache.get(folderPath)
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return cached.data
        }

        // Pobierz dane z API
        const response = await fetch('/api/champions/images', {
            headers: {
                'Cache-Control': 'max-age=300', // 5 minut cache
            }
        })

        if (!response.ok) {
            throw new Error('Nie udało się pobrać zdjęć championów')
        }

        const champions = await response.json()

        // Znajdź championa na podstawie ścieżki
        const championId = folderPath.split('/').find(part =>
            part !== 'champions' && part !== 'gallery' && part !== 'pedigree' && part !== 'offspring' && part !== 'videos'
        )

        if (!championId) {
            return []
        }

        const champion = champions.find((c: any) => c.id === championId)
        if (!champion) {
            return []
        }

        let result: string[] = []

        // Zwróć odpowiednie zdjęcia na podstawie ścieżki
        if (folderPath.includes('gallery')) {
            result = champion.gallery || []
        } else if (folderPath.includes('pedigree')) {
            result = champion.pedigree || []
        } else if (folderPath.includes('offspring')) {
            result = champion.offspring || []
        } else if (folderPath.includes('videos')) {
            result = champion.videos || []
        }

        // Zapisz w cache
        imageCache.set(folderPath, {
            data: result,
            timestamp: Date.now()
        })

        return result

    } catch (error) {
        console.error('Błąd podczas pobierania zdjęć:', error)

        // Sprawdź cache w przypadku błędu
        const cached = imageCache.get(folderPath)
        if (cached) {
            return cached.data
        }

        // Fallback do hardkodowanej listy w przypadku błędu
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

        if (folderPath.includes('thunder-storm/gallery')) {
            const result = knownImages.map(img => `${folderPath}/${img}`)
            // Zapisz w cache
            imageCache.set(folderPath, {
                data: result,
                timestamp: Date.now()
            })
            return result
        }

        return []
    }
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
