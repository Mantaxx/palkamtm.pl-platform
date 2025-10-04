'use client'

import { SmartImage } from '@/components/ui/SmartImage'
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization'
import { motion } from 'framer-motion'

interface OptimizedGalleryProps {
    images: string[]
    title?: string
    className?: string
}

/**
 * Zoptymalizowana galeria obrazów demonstrująca nowe funkcje
 */
export function OptimizedGallery({ images, title, className = '' }: OptimizedGalleryProps) {
    const { trackEvent } = usePerformanceOptimization('OptimizedGallery', {
        enableTracking: true,
        trackRenderTime: true,
    })

    const handleImageLoad = (index: number) => {
        trackEvent('image_loaded', index)
    }

    const handleImageError = (index: number) => {
        trackEvent('image_error', index)
    }

    return (
        <div className={`space-y-4 ${className}`}>
            {title && (
                <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((src, index) => (
                    <motion.div
                        key={src}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="group cursor-pointer"
                    >
                        <div className="relative overflow-hidden rounded-lg shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                            <SmartImage
                                src={src}
                                alt={`Obraz ${index + 1}`}
                                width={400}
                                height={300}
                                fitMode="contain"
                                aspectRatio="square"
                                quality={85}
                                priority={index < 3} // Pierwsze 3 obrazy mają priorytet
                                onLoad={() => handleImageLoad(index)}
                                onError={() => handleImageError(index)}
                                className="w-full h-64"
                            />

                            {/* Overlay z informacjami */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center">
                                    <p className="font-medium">Obraz {index + 1}</p>
                                    <p className="text-sm opacity-80">Kliknij aby powiększyć</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

/**
 * Komponent demonstrujący różne tryby wyświetlania obrazów
 */
export function ImageDisplayModes() {
    const sampleImage = '/champions/thunder-storm/gallery/PL-0446-13-5071_KK-OLIMP.jpg'

    const modes = [
        { name: 'Contain', fitMode: 'contain' as const, description: 'Cały obraz widoczny bez przycinania' },
        { name: 'Cover', fitMode: 'cover' as const, description: 'Obraz wypełnia kontener (może być przycięty)' },
        { name: 'Fill', fitMode: 'fill' as const, description: 'Obraz rozciągnięty do rozmiaru kontenera' },
        { name: 'Scale Down', fitMode: 'scale-down' as const, description: 'Obraz zmniejszony jeśli jest za duży' },
    ]

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center mb-8">Tryby Wyświetlania Obrazów</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {modes.map((mode) => (
                    <div key={mode.name} className="space-y-4">
                        <h3 className="text-lg font-semibold">{mode.name}</h3>
                        <p className="text-sm text-gray-600">{mode.description}</p>

                        <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                            <SmartImage
                                src={sampleImage}
                                alt={`Przykład trybu ${mode.name}`}
                                width={400}
                                height={300}
                                fitMode={mode.fitMode}
                                aspectRatio="video"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/**
 * Komponent demonstrujący cacheowanie obrazów
 */
export function CachedImageDemo() {
    const sampleImages = [
        '/champions/thunder-storm/gallery/PL-0446-13-5071_KK-OLIMP.jpg',
        '/champions/thunder-storm/gallery/PL-0446-13-5048_KK2.jpg',
        '/champions/thunder-storm/gallery/PL-0446-13-5015.jpg',
    ]

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center mb-8">Demonstracja Cacheowania</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sampleImages.map((src, index) => (
                    <div key={src} className="space-y-2">
                        <h3 className="font-medium">Obraz {index + 1}</h3>
                        <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                            <SmartImage
                                src={src}
                                alt={`Cached image ${index + 1}`}
                                width={300}
                                height={200}
                                fitMode="contain"
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
