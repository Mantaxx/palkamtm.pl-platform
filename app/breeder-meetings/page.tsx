'use client'

import ImageModal from '@/components/ImageModal'
import { getImagesFromFolder } from '@/utils/getImagesFromFolder'
import { motion } from 'framer-motion'
import { Calendar, Grid, List, MapPin, Search, Upload, User, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const breeders = [
    {
        id: 'geert-munnik',
        name: 'Geert Munnik',
        folder: 'meetings with breeders/Geert Munnik'
    },
    {
        id: 'jan-oost',
        name: 'Jan Oost',
        folder: 'meetings with breeders/Jan Oost'
    },
    {
        id: 'marginus-oostenbrink',
        name: 'Marginus Oostenbrink',
        folder: 'meetings with breeders/Marginus Oostenbrink'
    },
    {
        id: 'theo-lehnen',
        name: 'Theo Lehnen',
        folder: 'meetings with breeders/Theo Lehnen'
    },
    {
        id: 'toni-van-ravenstein',
        name: 'Toni van Ravenstein',
        folder: 'meetings with breeders/Toni van Ravenstein'
    }
]

export default function BreederMeetingsPage() {
    const { data: session } = useSession()
    const [searchTerm, setSearchTerm] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedImage, setSelectedImage] = useState<{ breederId: string; imageIndex: number } | null>(null)
    const [zoomLevel, setZoomLevel] = useState(1)
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 })
    const [showUploadForm, setShowUploadForm] = useState(false)
    const [uploadForm, setUploadForm] = useState({
        title: '',
        description: '',
        location: '',
        meetingDate: '',
        breederName: '',
        images: [] as File[]
    })
    const [isUploading, setIsUploading] = useState(false)
    const [uploadMessage, setUploadMessage] = useState('')
    const [mounted, setMounted] = useState(false)

    // Pobierz spotkania z bazy danych
    const [dbMeetings, setDbMeetings] = useState<any[]>([])

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await fetch('/api/breeder-meetings')
                if (response.ok) {
                    const meetings = await response.json()
                    setDbMeetings(meetings)
                }
            } catch (error) {
                console.error('Błąd podczas pobierania spotkań:', error)
            }
        }
        fetchMeetings()
    }, [])

    // Połącz statyczne hodowców z tymi z bazy danych
    const allBreeders = [
        ...breeders.map(breeder => ({
            ...breeder,
            images: getImagesFromFolder(breeder.folder),
            isStatic: true
        })),
        ...dbMeetings.map(meeting => ({
            id: `db-${meeting.id}`,
            name: meeting.breederName,
            folder: '',
            images: JSON.parse(meeting.images),
            isStatic: false,
            meeting: meeting
        }))
    ]

    // Filtruj hodowców na podstawie wyszukiwania
    const filteredBreeders = allBreeders.filter(breeder =>
        breeder.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev * 1.5, 5))
    }

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev / 1.5, 1))
    }

    const handleResetZoom = () => {
        setZoomLevel(1)
        setImagePosition({ x: 0, y: 0 })
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoomLevel > 1) {
            setIsDragging(true)
            setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y })
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && zoomLevel > 1) {
            setImagePosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            })
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.deltaY < 0) {
            handleZoomIn()
        } else {
            handleZoomOut()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        setUploadForm(prev => ({ ...prev, images: files }))
    }

    const handleUploadSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!session?.user?.id) return

        setIsUploading(true)
        setUploadMessage('')

        try {
            const formData = new FormData()
            formData.append('title', uploadForm.title)
            formData.append('description', uploadForm.description)
            formData.append('location', uploadForm.location)
            formData.append('meetingDate', uploadForm.meetingDate)
            formData.append('breederName', uploadForm.breederName)

            uploadForm.images.forEach((file, index) => {
                formData.append('images', file)
            })

            const response = await fetch('/api/breeder-meetings/upload', {
                method: 'POST',
                body: formData,
            })

            const result = await response.json()

            if (response.ok) {
                setUploadMessage('Zdjęcia zostały przesłane i oczekują na zatwierdzenie!')
                setUploadForm({
                    title: '',
                    description: '',
                    location: '',
                    meetingDate: '',
                    breederName: '',
                    images: []
                })
                setShowUploadForm(false)
            } else {
                setUploadMessage(result.error || 'Wystąpił błąd podczas przesyłania')
            }
        } catch (error) {
            setUploadMessage('Wystąpił błąd podczas przesyłania zdjęć')
        } finally {
            setIsUploading(false)
        }
    }

    // Ustaw mounted po zamontowaniu komponentu
    useEffect(() => {
        setMounted(true)
    }, [])

    // Obsługa klawisza Escape
    useEffect(() => {
        if (selectedImage) {
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    setSelectedImage(null)
                }
            }

            document.addEventListener('keydown', handleEscape)

            return () => {
                document.removeEventListener('keydown', handleEscape)
            }
        }
    }, [selectedImage])


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-display font-bold text-5xl lg:text-6xl mb-6"
                    >
                        Spotkania
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-primary-100 max-w-xl mx-auto mb-8"
                    >
                        Galeria zdjęć ze spotkań z hodowcami
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-primary-200 text-lg mb-8 max-w-4xl mx-auto"
                    >
                        <p className="text-base leading-relaxed">
                            🐦 <strong>Masz zdjęcia z naszego spotkania?</strong> Każde zdjęcie to historia, każda historia to wspomnienie, a każde wspomnienie to część naszej wspólnej pasji do gołębi pocztowych!
                            Pokaż światu te wyjątkowe chwile, gdy dzieliliśmy się doświadczeniami, wiedzą i miłością do tych niezwykłych ptaków.
                            Nie pozwól, żeby te wyjątkowe chwile zostały zapomniane - dołącz do naszej społeczności i podziel się wspomnieniami z innymi miłośnikami gołębi!
                        </p>
                    </motion.div>

                    {/* Upload Button - prominent placement */}
                    {session?.user?.id && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <button
                                onClick={() => setShowUploadForm(true)}
                                className="inline-flex items-center space-x-3 bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <Upload className="w-6 h-6" />
                                <span>📸 Pokaż światu nasze spotkanie!</span>
                            </button>
                            <div className="text-primary-200 text-sm mt-4 space-y-1">
                                <p>✨ <strong>Twoje zdjęcia</strong> będą widoczne dla wszystkich miłośników gołębi</p>
                                <p>🎯 <strong>Pomóż innym</strong> poznać naszą wspólną pasję</p>
                                <p>🏆 <strong>Stań się częścią</strong> tej wyjątkowej społeczności</p>
                            </div>
                        </motion.div>
                    )}

                    {!session?.user?.id && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-primary-200"
                        >
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <p className="text-base mb-4">
                                    Chcesz podzielić się swoimi zdjęciami? Dołącz do naszej społeczności!
                                </p>
                                <a
                                    href="/auth/signin"
                                    className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    <User className="w-5 h-5" />
                                    <span>🚀 Zaloguj się i dodaj zdjęcia!</span>
                                </a>
                                <p className="text-sm mt-3 opacity-80">
                                    ⏰ <strong>Rejestracja zajmuje tylko 2 minuty!</strong>
                                </p>
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Search and Filters */}
            <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Szukaj hodowcy..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                aria-label="Widok siatki"
                            >
                                <Grid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                aria-label="Widok listy"
                            >
                                <List className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-sm text-gray-600">
                        Znaleziono {filteredBreeders.length} hodowców
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredBreeders.length === 0 ? (
                        <div className="text-center py-20">
                            <div className="text-gray-400 text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-medium text-gray-900 mb-2">Nie znaleziono hodowców</h3>
                            <p className="text-gray-600">Spróbuj zmienić kryteria wyszukiwania</p>
                        </div>
                    ) : (
                        <div className="space-y-16">
                            {filteredBreeders.map((breeder, breederIndex) => (
                                <motion.div
                                    key={breeder.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: breederIndex * 0.1 }}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden"
                                >
                                    {/* Breeder Header */}
                                    <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-8 py-6">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {breeder.name}
                                        </h2>
                                        <p className="text-gray-600 mt-1">
                                            {breeder.images.length} {breeder.images.length === 1 ? 'zdjęcie' : 'zdjęć'}
                                            {!breeder.isStatic && breeder.meeting && (
                                                <span className="ml-2 text-sm text-primary-600">
                                                    • Przesłane przez: {breeder.meeting.uploaderName}
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    {/* Images Grid */}
                                    <div className="p-8">
                                        <div className={`${viewMode === 'grid'
                                            ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4'
                                            : 'space-y-2'
                                            }`}>
                                            {breeder.images.map((image: string, imageIndex: number) => (
                                                <motion.div
                                                    key={imageIndex}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ duration: 0.3, delay: imageIndex * 0.05 }}
                                                    className={`group cursor-pointer relative ${viewMode === 'list' ? 'flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md' : ''}`}
                                                    onClick={() => setSelectedImage({ breederId: breeder.id, imageIndex })}
                                                >
                                                    <div className={`${viewMode === 'grid'
                                                        ? 'aspect-[3/2] rounded-lg overflow-hidden bg-gray-100'
                                                        : 'w-48 h-36 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0'
                                                        }`}>
                                                        <img
                                                            src={image}
                                                            alt={`${breeder.name} - zdjęcie ${imageIndex + 1}`}
                                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>

                                                    {/* Breeder Info (only in list view) */}
                                                    {viewMode === 'list' && (
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="font-medium text-gray-900 truncate">{breeder.name}</h3>
                                                            <p className="text-sm text-primary-600">Hodowca gołębi pocztowych</p>
                                                            <p className="text-sm text-gray-600 truncate">Zdjęcie {imageIndex + 1} z {breeder.images.length}</p>
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Upload Form Modal */}
            {showUploadForm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    onClick={() => setShowUploadForm(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">📸 Dodaj zdjęcia ze spotkania</h2>
                                <p className="text-gray-600 mt-1">
                                    Pokaż światu te wyjątkowe chwile! 🐦✨
                                </p>
                            </div>
                            <button
                                onClick={() => setShowUploadForm(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleUploadSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tytuł spotkania *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={uploadForm.title}
                                    onChange={(e) => setUploadForm(prev => ({ ...prev, title: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="np. Spotkanie z Geert Munnik"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nazwa hodowcy *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={uploadForm.breederName}
                                    onChange={(e) => setUploadForm(prev => ({ ...prev, breederName: e.target.value }))}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="np. Geert Munnik"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <MapPin className="w-4 h-4 inline mr-1" />
                                        Miejsce
                                    </label>
                                    <input
                                        type="text"
                                        value={uploadForm.location}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, location: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                        placeholder="np. Holandia"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <Calendar className="w-4 h-4 inline mr-1" />
                                        Data spotkania
                                    </label>
                                    <input
                                        type="date"
                                        value={uploadForm.meetingDate}
                                        onChange={(e) => setUploadForm(prev => ({ ...prev, meetingDate: e.target.value }))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Opis spotkania
                                </label>
                                <textarea
                                    value={uploadForm.description}
                                    onChange={(e) => setUploadForm(prev => ({ ...prev, description: e.target.value }))}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="Opisz przebieg spotkania..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    📷 Zdjęcia * <span className="text-gray-500">(maksymalnie 10 zdjęć)</span>
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer text-primary-600 hover:text-primary-700 font-medium text-lg"
                                    >
                                        🎯 Przeciągnij zdjęcia tutaj lub kliknij
                                    </label>
                                    <p className="text-sm text-gray-500 mt-2">
                                        {uploadForm.images.length > 0
                                            ? `🎉 Świetnie! Wybrano ${uploadForm.images.length} zdjęć`
                                            : '💡 Najlepsze zdjęcia to te z gołębiami, hodowcami i uśmiechami!'
                                        }
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Obsługujemy: JPG, PNG, GIF (max 5MB na zdjęcie)
                                    </p>
                                </div>
                            </div>

                            {uploadMessage && (
                                <div className={`p-3 rounded-lg ${uploadMessage.includes('błąd') || uploadMessage.includes('Błąd')
                                    ? 'bg-red-50 text-red-700'
                                    : 'bg-green-50 text-green-700'
                                    }`}>
                                    {uploadMessage}
                                </div>
                            )}

                            <div className="flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowUploadForm(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Anuluj
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUploading || !uploadForm.title || !uploadForm.breederName || uploadForm.images.length === 0}
                                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-semibold"
                                >
                                    {isUploading ? '🚀 Przesyłanie...' : '✨ Pokaż światu nasze spotkanie!'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {/* Image Modal */}
            {selectedImage && (
                <ImageModal
                    image={{
                        id: `${selectedImage.breederId}-${selectedImage.imageIndex}`,
                        src: allBreeders.find(b => b.id === selectedImage.breederId)?.images[selectedImage.imageIndex] || '',
                        alt: `Spotkanie z hodowcą - zdjęcie ${selectedImage.imageIndex + 1}`
                    }}
                    onClose={() => setSelectedImage(null)}
                    onPrevious={() => {
                        const currentIndex = allBreeders.findIndex(b => b.id === selectedImage.breederId)
                        const currentBreeder = allBreeders[currentIndex]
                        if (selectedImage.imageIndex > 0) {
                            setSelectedImage({
                                breederId: selectedImage.breederId,
                                imageIndex: selectedImage.imageIndex - 1
                            })
                        } else if (currentIndex > 0) {
                            const prevBreeder = allBreeders[currentIndex - 1]
                            setSelectedImage({
                                breederId: prevBreeder.id,
                                imageIndex: prevBreeder.images.length - 1
                            })
                        }
                    }}
                    onNext={() => {
                        const currentIndex = allBreeders.findIndex(b => b.id === selectedImage.breederId)
                        const currentBreeder = allBreeders[currentIndex]
                        if (selectedImage.imageIndex < currentBreeder.images.length - 1) {
                            setSelectedImage({
                                breederId: selectedImage.breederId,
                                imageIndex: selectedImage.imageIndex + 1
                            })
                        } else if (currentIndex < allBreeders.length - 1) {
                            const nextBreeder = allBreeders[currentIndex + 1]
                            setSelectedImage({
                                breederId: nextBreeder.id,
                                imageIndex: 0
                            })
                        }
                    }}
                    hasPrevious={(() => {
                        const currentIndex = allBreeders.findIndex(b => b.id === selectedImage.breederId)
                        return selectedImage.imageIndex > 0 || currentIndex > 0
                    })()}
                    hasNext={(() => {
                        const currentIndex = allBreeders.findIndex(b => b.id === selectedImage.breederId)
                        const currentBreeder = allBreeders[currentIndex]
                        return selectedImage.imageIndex < currentBreeder.images.length - 1 || currentIndex < allBreeders.length - 1
                    })()}
                />
            )}
        </div>
    )
}
