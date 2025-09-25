'use client'

import ImageModal from '@/components/ImageModal'
import { Text3D } from '@/components/ui/Text3D'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { motion } from 'framer-motion'
import { TreePine } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Champion {
  id: string
  name: string
  ringNumber: string
  bloodline: string
  images: string[]
  pedigree: string
  pedigreeImages?: string[]
}

export function ChampionsList() {
  const [selectedImage, setSelectedImage] = useState<{ championId: string; imageIndex: number } | null>(null)
  const [allImages, setAllImages] = useState<Array<{ championId: string; imageIndex: number; src: string; alt: string }>>([])
  const [selectedChampion, setSelectedChampion] = useState<Champion | null>(null)
  const [showPedigreeModal, setShowPedigreeModal] = useState(false)
  const [selectedPedigreeImage, setSelectedPedigreeImage] = useState<string | null>(null)
  const [champions, setChampions] = useState<Champion[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Ładowanie championów z API
  useEffect(() => {
    const loadChampions = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/champions/images')
        if (!response.ok) {
          throw new Error('Nie udało się pobrać danych championów')
        }

        const responseData = await response.json()
        const championsData = responseData.champions || []

        // Konwertuj dane z API na format Champion
        const championsList: Champion[] = championsData.map((championData: unknown) => {
          if (!championData || typeof championData !== 'object') {
            return {
              id: '',
              name: 'Nieznany',
              ringNumber: 'N/A',
              bloodline: 'Nieznana',
              images: [],
              pedigree: ''
            }
          }
          const data = championData as Record<string, unknown>

          // Konwertuj images z API na tablicę stringów
          const apiImages = Array.isArray(data.images) ? data.images : []
          const gallery = apiImages.map((img: unknown) => {
            if (typeof img === 'string') return img
            if (typeof img === 'object' && img !== null) {
              const imgObj = img as Record<string, unknown>
              return String(imgObj.url || '')
            }
            return ''
          }).filter(Boolean)

          return {
            id: String(data.id || ''),
            name: String(data.name || `Champion ${data.id}`),
            ringNumber: String(data.ringNumber || 'N/A'),
            bloodline: String(data.bloodline || 'Nieznana'),
            images: gallery,
            pedigree: String(data.pedigree || ''),
            pedigreeImages: [] // Na razie puste, można dodać później
          }
        }).filter((champion: Champion | null): champion is Champion => champion !== null)

        console.log('Champions loaded:', championsList)
        setChampions(championsList)

        // Przygotuj wszystkie zdjęcia do nawigacji
        const allImagesList: Array<{ championId: string; imageIndex: number; src: string; alt: string }> = []
        championsList.forEach(champion => {
          champion.images.forEach((image, imageIndex) => {
            allImagesList.push({
              championId: champion.id,
              imageIndex,
              src: image,
              alt: `Zdjęcie championa ${champion.name}`
            })
          })
        })
        setAllImages(allImagesList)
      } catch (error) {
        console.error('Błąd podczas ładowania championów:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadChampions()
  }, [])

  const handleImageClick = (championId: string, imageIndex: number) => {
    setSelectedImage({ championId, imageIndex })
  }

  const handlePedigreeClick = (champion: Champion) => {
    console.log('=== KLIKNIĘTO RODOWÓD ===')
    console.log('Champion:', champion.name)
    console.log('Pedigree images:', champion.pedigreeImages)
    console.log('Pedigree images length:', champion.pedigreeImages?.length)
    console.log('Pierwsze zdjęcie:', champion.pedigreeImages?.[0])

    // Otwórz pierwsze zdjęcie rodowodu w ImageModal
    if (champion.pedigreeImages && champion.pedigreeImages.length > 0) {
      console.log('OTWIERAM ZDJĘCIE RODOWODU:', champion.pedigreeImages[0])
      setSelectedPedigreeImage(champion.pedigreeImages[0])
    } else {
      console.log('BRAK ZDJĘĆ RODOWODU - POKAZUJĘ MODAL Z TEKSTEM')
      // Jeśli nie ma zdjęć, pokaż modal z tekstem
      setSelectedChampion(champion)
      setShowPedigreeModal(true)
    }
  }

  const handlePedigreeImageClick = (imageUrl: string) => {
    setSelectedPedigreeImage(imageUrl)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <UnifiedCard variant="3d" glow={true} className="p-8 text-center border-2 border-white shadow-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <Text3D variant="glow" intensity="medium" className="text-lg">
            Ładowanie championów...
          </Text3D>
        </UnifiedCard>
      </div>
    )
  }

  return (
    <>
      {/* Simple Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Nasi Championy</h1>
        <p className="text-gray-600">Poznaj naszych wybitnych championów gołębi pocztowych</p>
      </div>

      {/* Simple Champions List */}
      <div className="space-y-6 w-full max-w-4xl mx-auto">
        {champions.map((champion, index) => (
          <motion.div
            key={champion.id}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="champion-card flex items-center space-x-6"
          >
            <div className="champion-card-image relative cursor-pointer"
              onClick={() => champion.images.length > 0 && handleImageClick(champion.id, 0)}
            >
              {champion.images.length > 0 ? (
                <Image
                  src={champion.images[0]}
                  alt={`Zdjęcie championa ${champion.name}`}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-500/20 to-slate-400/20 flex items-center justify-center">
                  <TreePine className="w-16 h-16 text-blue-400/50" />
                </div>
              )}

              {/* Przycisk Rodowodu - Na kontenerze */}
              <div className="absolute bottom-16 right-4 z-10">
                {(champion.pedigreeImages && champion.pedigreeImages.length > 0) || champion.pedigree ? (
                  <button
                    className="w-16 h-16 bg-green-600/90 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg z-20"
                    onClick={() => handlePedigreeClick(champion)}
                    title="Zobacz rodowód"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                ) : (
                  <button
                    className="w-16 h-16 bg-gray-500/90 text-white rounded-full flex items-center justify-center cursor-not-allowed shadow-lg"
                    disabled
                    title="Brak danych rodowodu"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {champions.length === 0 && (
        <UnifiedCard variant="glass" glow={true} className="p-12 text-center">
          <Text3D variant="gradient" intensity="medium" className="text-2xl font-bold mb-4">
            Brak championów
          </Text3D>
          <p className="text-white/80">
            Nie znaleziono żadnych championów do wyświetlenia.
          </p>
        </UnifiedCard>
      )}

      {/* Image Modal */}
      <div className="z-[9999] relative">{
        selectedImage && (() => {
          console.log('Selected image:', selectedImage);
          console.log('All images length:', allImages.length);
          console.log('All images:', allImages);

          const currentImageData = allImages.find(img =>
            img.championId === selectedImage.championId && img.imageIndex === selectedImage.imageIndex
          );

          if (!currentImageData) {
            console.log('No current image data found, using fallback');
            // Fallback do starej logiki
            const champion = champions.find(c => c.id === selectedImage.championId);
            const images = champion?.images || [];
            const currentImage = images[selectedImage.imageIndex];

            if (!currentImage) return null;

            return (
              <ImageModal
                image={{
                  id: selectedImage.championId,
                  src: currentImage,
                  alt: champion?.name || 'Champion'
                }}
                onClose={() => setSelectedImage(null)}
                onPrevious={selectedImage.imageIndex > 0 ? () => setSelectedImage({
                  championId: selectedImage.championId,
                  imageIndex: selectedImage.imageIndex - 1
                }) : undefined}
                onNext={selectedImage.imageIndex < images.length - 1 ? () => setSelectedImage({
                  championId: selectedImage.championId,
                  imageIndex: selectedImage.imageIndex + 1
                }) : undefined}
                hasPrevious={selectedImage.imageIndex > 0}
                hasNext={selectedImage.imageIndex < images.length - 1}
                currentIndex={selectedImage.imageIndex}
                totalImages={images.length}
              />
            );
          }

          const currentIndex = allImages.findIndex(img =>
            img.championId === selectedImage.championId && img.imageIndex === selectedImage.imageIndex
          );

          console.log('Current index:', currentIndex);
          console.log('Has previous:', currentIndex > 0);
          console.log('Has next:', currentIndex < allImages.length - 1);

          return (
            <ImageModal
              image={{
                id: currentImageData.championId,
                src: currentImageData.src,
                alt: currentImageData.alt
              }}
              onClose={() => setSelectedImage(null)}
              onPrevious={currentIndex > 0 ? () => {
                const prevImage = allImages[currentIndex - 1];
                setSelectedImage({
                  championId: prevImage.championId,
                  imageIndex: prevImage.imageIndex
                });
              } : undefined}
              onNext={currentIndex < allImages.length - 1 ? () => {
                const nextImage = allImages[currentIndex + 1];
                setSelectedImage({
                  championId: nextImage.championId,
                  imageIndex: nextImage.imageIndex
                });
              } : undefined}
              hasPrevious={currentIndex > 0}
              hasNext={currentIndex < allImages.length - 1}
              currentIndex={currentIndex}
              totalImages={allImages.length}
            />
          );
        })()
      }</div>

      {/* Pedigree Modal */}
      <div className="z-[9999] relative">{
        showPedigreeModal && selectedChampion && (
          <div className="fixed inset-0 bg-black/80 z-[99998] flex items-center justify-center p-4">
            <div className="relative w-full max-w-7xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setShowPedigreeModal(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
              >
                ×
              </button>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Rodowód - {selectedChampion.name}
                </h3>

                {selectedChampion.pedigreeImages && selectedChampion.pedigreeImages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedChampion.pedigreeImages.map((imageUrl, index) => (
                      <Image
                        key={index}
                        src={imageUrl}
                        alt={`Rodowód ${selectedChampion.name} - strona ${index + 1}`}
                        width={400}
                        height={600}
                        className="w-full h-auto rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => handlePedigreeImageClick(imageUrl)}
                      />
                    ))}
                  </div>
                ) : selectedChampion.pedigree ? (
                  <div className="bg-gray-100 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold mb-4">Informacje o rodowodzie:</h4>
                    <p className="text-gray-700 whitespace-pre-line">{selectedChampion.pedigree}</p>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600 text-lg">Brak danych rodowodu dla tego championa.</p>
                    <p className="text-gray-500 text-sm mt-2">Dane rodowodu mogą być dodane przez administratora.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      }</div>

      {/* Pedigree Image Zoom Modal */}
      <div className="z-[9999] relative">{
        selectedPedigreeImage && (
          <ImageModal
            image={{
              id: 'pedigree-image',
              src: selectedPedigreeImage,
              alt: `Rodowód`
            }}
            onClose={() => setSelectedPedigreeImage(null)}
          />
        )
      }</div>
    </>
  )
}
