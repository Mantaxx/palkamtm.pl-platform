'use client'

import ImageModal from '@/components/ImageModal'
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
    pedigree?: string
}

interface ChampionData {
    id?: string;
    name?: string;
    ringNumber?: string;
    bloodline?: string;
    images?: Array<string | { url?: string }>;
    pedigree?: string;
}

export function SimpleChampionsList() {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null)
    const [champions, setChampions] = useState<Champion[]>([])
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [allImages, setAllImages] = useState<Array<{ src: string; alt: string }>>([])

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
                const championsList = championsData.map((championData: ChampionData) => {
                    const apiImages = Array.isArray(championData.images) ? championData.images : []
                    const gallery = apiImages.map((img: string | { url?: string }) => {
                        if (typeof img === 'string') return img
                        if (typeof img === 'object' && img !== null) {
                            return String(img.url || '')
                        }
                        return ''
                    }).filter(Boolean)

                    return {
                        id: String(championData.id || ''),
                        name: championData.name || `Champion ${championData.id}`,
                        ringNumber: championData.ringNumber || `PL-2024-${String(championData.id).padStart(3, '0')}`,
                        bloodline: championData.bloodline || 'Janssen',
                        images: gallery,
                        pedigree: championData.pedigree
                    }
                }).filter((c: Champion) => c && c.id)

                setChampions(championsList)

                // Przygotuj wszystkie zdjęcia do nawigacji w modalu
                const flatImages = championsList
                    .flatMap(champion =>
                        champion.images.map(src => ({ src, alt: `Zdjęcie championa ${champion.name}` }))
                    )
                    .slice(0, 20) // Ogranicz do 20, tak jak w renderowaniu

                setAllImages(flatImages)
            } catch (error) {
                console.error('Błąd podczas ładowania championów:', error)
            } finally {
                setIsLoading(false)
            }
        }

        loadChampions()
    }, [])

    const handleImageClick = (imageSrc: string, index: number) => {
        // Używamy lokalnego stanu zamiast kontekstu
        setSelectedImage({ src: imageSrc, alt: `Zdjęcie ${index + 1}` });
        setSelectedImageIndex(index);
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <span className="ml-4 text-white">Ładowanie championów...</span>
            </div>
        )
    }

    return (
        <>
            {/* Simple Champions List - 4 w rzędzie */}
            <div className="mx-auto px-6">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
                    {champions.length === 0 ? (
                        <div className="col-span-2 sm:col-span-2 md:col-span-4 text-center py-12">
                            <p className="text-white">Brak championów do wyświetlenia.</p>
                        </div>
                    ) : (
                        champions.flatMap((champion) => champion.images)
                            .slice(0, 20)
                            .map((src, imgIndex) => (
                                <motion.div
                                    key={imgIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: imgIndex * 0.1 }}
                                    className="relative w-full max-w-xs aspect-[4/3] cursor-pointer group overflow-hidden rounded-lg bg-white border-2 border-white shadow-lg champion-image-glow"
                                    onClick={() => handleImageClick(src, imgIndex)}
                                >
                                    {src ? (
                                        <Image
                                            src={src}
                                            alt={`Zdjęcie ${imgIndex + 1}`}
                                            fill
                                            sizes="(max-width: 768px) 50vw, 20vw"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
                                            <TreePine className="w-8 h-8 text-white/60" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                                </motion.div>
                            ))
                    )}
                </div>
            </div>

            {/* Image Modal - renderowany lokalnie */}
            {selectedImage && selectedImageIndex !== null && (
                <ImageModal
                    image={{ id: `champion-image-${selectedImageIndex}`, src: selectedImage.src, alt: selectedImage.alt }}
                    onClose={() => {
                        setSelectedImage(null);
                        setSelectedImageIndex(null);
                    }}
                    onPrevious={selectedImageIndex > 0 ? () => handleImageClick(allImages[selectedImageIndex - 1].src, selectedImageIndex - 1) : undefined}
                    onNext={selectedImageIndex < allImages.length - 1 ? () => handleImageClick(allImages[selectedImageIndex + 1].src, selectedImageIndex + 1) : undefined}
                    hasPrevious={selectedImageIndex > 0}
                    hasNext={selectedImageIndex < allImages.length - 1}
                    currentIndex={selectedImageIndex}
                    totalImages={allImages.length}
                />
            )}
        </>
    )
}
