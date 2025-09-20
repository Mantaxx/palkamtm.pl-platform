import { readdir } from 'fs/promises'
import { NextResponse } from 'next/server'
import { join } from 'path'

export async function GET() {
  try {
    const championsFolder = join(process.cwd(), 'public', 'champions')

    // Skanuj foldery championów
    const championFolders = await readdir(championsFolder, { withFileTypes: true })
    const champions = []

    for (const folder of championFolders) {
      // Pomiń foldery systemowe i pliki
      if (folder.isDirectory() &&
        folder.name !== 'gallery' &&
        folder.name !== 'pedigree' &&
        folder.name !== 'offspring' &&
        folder.name !== 'videos' &&
        folder.name !== 'thunder-storm' &&
        !folder.name.includes('README')) {

        const championId = folder.name
        const championPath = join(championsFolder, championId)

        // Skanuj galerię
        const galleryPath = join(championPath, 'gallery')
        let galleryImages: string[] = []

        try {
          const galleryFiles = await readdir(galleryPath)
          galleryImages = galleryFiles
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/champions/${championId}/gallery/${file}`)
        } catch (error) {
          // Folder gallery może nie istnieć
          console.log(`Brak folderu gallery dla ${championId}`)
        }

        // Skanuj rodowód
        const pedigreePath = join(championPath, 'pedigree')
        let pedigreeImages: string[] = []

        try {
          const pedigreeFiles = await readdir(pedigreePath)
          pedigreeImages = pedigreeFiles
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/champions/${championId}/pedigree/${file}`)
        } catch (error) {
          // Folder pedigree może nie istnieć
          console.log(`Brak folderu pedigree dla ${championId}`)
        }

        // Skanuj potomstwo
        const offspringPath = join(championPath, 'offspring')
        let offspringImages: string[] = []

        try {
          const offspringFiles = await readdir(offspringPath)
          offspringImages = offspringFiles
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/champions/${championId}/offspring/${file}`)
        } catch (error) {
          // Folder offspring może nie istnieć
          console.log(`Brak folderu offspring dla ${championId}`)
        }

        // Skanuj filmy
        const videosPath = join(championPath, 'videos')
        let videoThumbnails: string[] = []

        try {
          const videoFiles = await readdir(videosPath)
          videoThumbnails = videoFiles
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/champions/${championId}/videos/${file}`)
        } catch (error) {
          // Folder videos może nie istnieć
          console.log(`Brak folderu videos dla ${championId}`)
        }

        // Tylko dodaj championa jeśli ma zdjęcia
        if (galleryImages.length > 0 || pedigreeImages.length > 0) {
          champions.push({
            id: championId,
            gallery: galleryImages,
            pedigree: pedigreeImages,
            offspring: offspringImages,
            videos: videoThumbnails
          })
        }
      }
    }

    // Sortuj championów według ID (numerycznie)
    champions.sort((a, b) => parseInt(a.id) - parseInt(b.id))

    return NextResponse.json(champions)

  } catch (error) {
    console.error('Błąd podczas skanowania zdjęć championów:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania zdjęć championów' },
      { status: 500 }
    )
  }
}
