'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { Text3D } from '@/components/ui/Text3D'
import { UnifiedButton } from '@/components/ui/UnifiedButton'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { getAllBreederMeetings } from '@/utils/getBreederMeetingImages'
import { motion } from 'framer-motion'
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface BreederMeeting {
    id: string
    name: string
    location: string
    date: string
    description: string
    images: string[]
}

export default function BreederMeetingsPage() {
    const { data: session } = useSession()
    const [breederMeetings, setBreederMeetings] = useState<BreederMeeting[]>([])
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const [selectedImage, setSelectedImage] = useState<{ meetingId: string; imageIndex: number } | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const loadMeetings = async () => {
            try {
                const meetings = getAllBreederMeetings()
                setBreederMeetings(meetings)
                setImagesLoaded(true)
            } catch (error) {
                console.error('Błąd podczas ładowania spotkań:', error)
                setImagesLoaded(true)
            }
        }

        loadMeetings()
    }, [])

    const handleImageClick = (meetingId: string, imageIndex: number) => {
        setSelectedImage({ meetingId, imageIndex })
        setCurrentImageIndex(imageIndex)
    }

    const handleNextImage = () => {
        if (selectedImage) {
            const meeting = breederMeetings.find(m => m.id === selectedImage.meetingId)
            if (meeting) {
                const nextIndex = (currentImageIndex + 1) % meeting.images.length
                setCurrentImageIndex(nextIndex)
            }
        }
    }

    const handlePrevImage = () => {
        if (selectedImage) {
            const meeting = breederMeetings.find(m => m.id === selectedImage.meetingId)
            if (meeting) {
                const prevIndex = currentImageIndex === 0 ? meeting.images.length - 1 : currentImageIndex - 1
                setCurrentImageIndex(prevIndex)
            }
        }
    }

    const handleCloseModal = () => {
        setSelectedImage(null)
        setCurrentImageIndex(0)
    }

    const handleDownload = (imageUrl: string, meetingName: string) => {
        const link = document.createElement('a')
        link.href = imageUrl
        link.download = `${meetingName}_${Date.now()}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    useEffect(() => {
        // Sprawdź czy jesteśmy w przeglądarce
        if (typeof document === 'undefined') return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleCloseModal()
            }
        }

        if (selectedImage) {
            document.addEventListener('keydown', handleEscape)
            return () => {
                document.removeEventListener('keydown', handleEscape)
            }
        }
    }, [selectedImage])

    if (!imagesLoaded) {
        return (
            <UnifiedLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <UnifiedCard variant="3d" glow={true} className="p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <Text3D variant="glow" intensity="medium" className="text-lg">
                            Ładowanie zdjęć...
                        </Text3D>
                    </UnifiedCard>
                </div>
            </UnifiedLayout>
        )
    }

    return (
        <UnifiedLayout>
            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                className="relative z-10 pt-80 pb-20 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <Text3D
                        variant="neon"
                        intensity="high"
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        Spotkania z Hodowcami
                    </Text3D>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
                    >
                        Galeria zdjęć z naszych spotkań z hodowcami gołębi pocztowych
                    </motion.p>
                </div>
            </motion.section>

            {/* Content */}
            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
                <div className="max-w-7xl mx-auto">
                    {/* Add Photo Button */}
                    {session && (
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <div className="text-center">
                                <UnifiedButton
                                    variant="primary"
                                    size="lg"
                                    intensity="high"
                                    glow={true}
                                    onClick={() => window.location.href = '/breeder-meetings/dodaj-zdjecie'}
                                >
                                    <Camera className="w-5 h-5 mr-2" />
                                    Dodaj Zdjęcie
                                </UnifiedButton>
                            </div>
                        </motion.section>
                    )}

                    {/* Breeder Meetings Grid */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="space-y-12">
                            {breederMeetings.map((meeting, index) => (
                                <motion.div
                                    key={meeting.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="champion-profile-card"
                                >
                                    {/* Meeting Title */}
                                    <div className="champion-profile-card-header">
                                        <h3 className="champion-profile-card-title text-center">
                                            {meeting.name}
                                        </h3>
                                    </div>

                                    {/* Gallery Grid */}
                                    <div className="champion-profile-card-content">
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {meeting.images.map((image, imageIndex) => (
                                                <motion.div
                                                    key={imageIndex}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.5, delay: imageIndex * 0.05 }}
                                                    viewport={{ once: true }}
                                                    className="relative h-48 overflow-hidden rounded-xl cursor-pointer group"
                                                    onClick={() => handleImageClick(meeting.id, imageIndex)}
                                                >
                                                    <img
                                                        src={image}
                                                        alt={`${meeting.name} - zdjęcie ${imageIndex + 1}`}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">{imageIndex + 1}</span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {breederMeetings.length === 0 && (
                            <UnifiedCard variant="glass" glow={true} className="p-12 text-center">
                                <Text3D variant="gradient" intensity="medium" className="text-2xl font-bold mb-4">
                                    Brak spotkań
                                </Text3D>
                                <p className="text-white/80 mb-6">
                                    Jeszcze nie ma zdjęć ze spotkań z hodowcami.
                                </p>
                                {session && (
                                    <UnifiedButton
                                        variant="primary"
                                        onClick={() => window.location.href = '/breeder-meetings/dodaj-zdjecie'}
                                        intensity="high"
                                        glow={true}
                                    >
                                        <Camera className="w-5 h-5 mr-2" />
                                        Dodaj Pierwsze Zdjęcie
                                    </UnifiedButton>
                                )}
                            </UnifiedCard>
                        )}
                    </motion.section>
                </div>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <button
                        onClick={handleCloseModal}
                        title="Zamknij"
                        className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="relative max-w-4xl max-h-full">
                        <img
                            src={breederMeetings.find(m => m.id === selectedImage.meetingId)?.images[currentImageIndex] || ''}
                            alt="Spotkanie z hodowcą"
                            className="max-w-full max-h-full object-contain rounded-lg"
                        />

                        {/* Navigation */}
                        {selectedImage && (breederMeetings.find(m => m.id === selectedImage.meetingId)?.images.length || 0) > 1 && (
                            <>
                                <button
                                    onClick={handlePrevImage}
                                    title="Poprzednie zdjęcie"
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    title="Następne zdjęcie"
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </>
                        )}

                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                            {currentImageIndex + 1} / {breederMeetings.find(m => m.id === selectedImage?.meetingId)?.images.length || 0}
                        </div>
                    </div>
                </div>
            )}
        </UnifiedLayout>
    )
}