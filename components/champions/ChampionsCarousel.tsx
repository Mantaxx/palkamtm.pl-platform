'use client'

import { SmartImage } from '@/components/ui/SmartImage'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface Champion {
    id: string
    images: string[]
    pedigreeImage?: string
}

interface ChampionsCarouselProps {
    champions: Champion[]
    onImageClick: (imageSrc: string, index: number) => void
    onPedigreeClick: (pedigreeImage: string) => void
}

interface ChampionImage {
    championId: string
    imageSrc: string
    championIndex: number
    imageIndex: number
}

export function ChampionsCarousel({ champions, onImageClick, onPedigreeClick }: ChampionsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)

    // Przygotuj wszystkie zdjęcia z wszystkich championów
    const allImages: ChampionImage[] = champions.flatMap((champion, championIndex) =>
        champion.images.map((imageSrc, imageIndex) => ({
            championId: champion.id,
            imageSrc: imageSrc,
            championIndex,
            imageIndex
        }))
    )

    console.log('ChampionsCarousel - Total champions:', champions.length)
    console.log('ChampionsCarousel - Total images:', allImages.length)
    console.log('ChampionsCarousel - Champions data:', champions.map(c => ({ id: c.id, imagesCount: c.images.length })))

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % allImages.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
    }

    if (allImages.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-white">Brak zdjęć championów do wyświetlenia.</p>
            </div>
        )
    }

    // Wybierz zdjęcia do wyświetlenia (aktualne + 4 po bokach = 5 łącznie)
    const getVisibleImages = () => {
        const visible: Array<{
            imageData: {
                championId: string;
                imageSrc: string;
                championIndex: number;
                imageIndex: number;
            };
            champion: {
                id: string;
                images: string[];
                pedigreeImage?: string;
            };
            position: number;
            index: number;
            championIndex: number;
        }> = []
        const total = allImages.length

        // Jeśli mamy mniej niż 5 zdjęć, powtarzaj zdjęcia
        if (total === 0) return visible

        for (let i = -2; i <= 2; i++) {
            const index = (currentIndex + i + total) % total
            const imageData = allImages[index]
            const champion = champions[imageData.championIndex]

            visible.push({
                imageData,
                champion,
                position: i, // -2: far left, -1: left, 0: center, 1: right, 2: far right
                index,
                championIndex: imageData.championIndex
            })
        }

        return visible
    }

    const visibleImages = getVisibleImages()

    console.log('Visible images count:', visibleImages.length)
    console.log('Visible images positions:', visibleImages.map(v => ({ position: v.position, championId: v.champion.id })))

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4">
            {/* Carousel Container */}
            <div
                className="relative h-[550px] sm:h-[650px] overflow-hidden"
            >
                <AnimatePresence>
                    {visibleImages.map(({ imageData, champion, position, index }) => (
                        <motion.div
                            key={`${imageData.championId}-${imageData.imageIndex}-${index}`}
                            className={`absolute inset-0 flex items-start justify-center pt-8 ${position === 0 ? 'z-30' :
                                position === -1 || position === 1 ? 'z-20' : 'z-10'
                                }`}
                            initial={{
                                x: position * 25 + '%',
                                scale: position === 0 ? 1 :
                                    position === -1 || position === 1 ? 0.85 : 0.7,
                                opacity: position === 0 ? 1 :
                                    position === -1 || position === 1 ? 0.8 : 0.5
                            }}
                            animate={{
                                x: position * 25 + '%',
                                scale: position === 0 ? 1 :
                                    position === -1 || position === 1 ? 0.85 : 0.7,
                                opacity: position === 0 ? 1 :
                                    position === -1 || position === 1 ? 0.8 : 0.5
                            }}
                            exit={{
                                x: position === -2 ? '-200%' :
                                    position === -1 ? '-100%' :
                                        position === 1 ? '100%' :
                                            position === 2 ? '200%' : '0%',
                                scale: 0.7,
                                opacity: 0
                            }}
                            transition={{
                                type: "tween",
                                duration: 1.2,
                                ease: "easeInOut"
                            }}
                        >
                            {/* Champion Card */}
                            <motion.div
                                className={`relative bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white overflow-hidden shadow-2xl cursor-pointer ${position === 0 ? 'w-[700px] h-[500px]' :
                                    position === -1 || position === 1 ? 'w-[560px] h-[400px]' :
                                        'w-[420px] h-[300px]'
                                    }`}
                                whileHover={{
                                    scale: position === 0 ? 1.05 :
                                        position === -1 || position === 1 ? 0.9 : 0.8,
                                    boxShadow: '0 0 40px rgba(255, 255, 255, 0.8)',
                                    filter: 'none',
                                    transition: { duration: 0.8 }
                                }}
                                onClick={() => {
                                    if (position === 0) {
                                        onImageClick(imageData.imageSrc, index)
                                    } else if (position !== 0) {
                                        goToSlide(index)
                                    }
                                }}
                            >
                                {/* Champion Image */}
                                <div className="relative w-full h-full flex items-center justify-center">
                                    <SmartImage
                                        src={imageData.imageSrc}
                                        alt={`Champion ${champion.id} - Zdjęcie ${imageData.imageIndex + 1}`}
                                        width={0}
                                        height={0}
                                        fitMode="contain"
                                        aspectRatio="auto"
                                        className={`w-full h-full object-contain transition-all duration-500 ${position === 0 ? 'grayscale-0' : 'grayscale'}`}
                                        sizes="100vw"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Dots Indicator - Pod zdjęciami w kontenerze */}
                {allImages.length > 1 && (
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {allImages.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-white scale-125'
                                    : 'bg-white/50 hover:bg-white/70'
                                    }`}
                                aria-label={`Przejdź do zdjęcia ${index + 1}`}
                            />
                        ))}
                    </div>
                )}

                {/* Rodowód Button - Prosty */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-50">
                    <button
                        onClick={() => {
                            // Znajdź aktualnie wyświetlanego championa (pozycja 0 = środkowy)
                            const centerImage = visibleImages.find(v => v.position === 0)
                            const currentChampion = centerImage ? champions[centerImage.championIndex] : champions[0]
                            const pedigreeImage = currentChampion?.pedigreeImage || '/champions/1/pedigree/DV-02906-11-98.1.jpg'

                            console.log('PRZYCISK KLIKNIĘTY!')
                            console.log('Current champion:', currentChampion?.id)
                            console.log('Pedigree:', pedigreeImage)
                            onPedigreeClick(pedigreeImage)
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded text-lg font-bold hover:bg-red-600 transition-colors"
                    >
                        RODOWÓD
                    </button>
                </div>
            </div>

            {/* Navigation Arrows */}
            {allImages.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 hover:scale-110"
                        aria-label="Poprzedni champion"
                    >
                        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 hover:scale-110"
                        aria-label="Następny champion"
                    >
                        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </>
            )}
        </div>
    )
}
