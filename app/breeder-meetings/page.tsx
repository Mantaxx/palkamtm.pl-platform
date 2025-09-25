'use client'

import ImageModal from '@/components/ImageModal'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { Text3D } from '@/components/ui/Text3D'
import { UnifiedButton } from '@/components/ui/UnifiedButton'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { getAllBreederMeetings } from '@/utils/getBreederMeetingImages'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Camera, CheckCircle, Upload, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
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
    const { data: session, status } = useSession()
    const router = useRouter()
    const [breederMeetings, setBreederMeetings] = useState<BreederMeeting[]>([])
    const [imagesLoaded, setImagesLoaded] = useState(false)
    const [selectedImage, setSelectedImage] = useState<{ meetingId: string; imageIndex: number } | null>(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        images: [] as File[]
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
        const loadMeetings = async () => {
            try {
                const meetings = await getAllBreederMeetings()
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
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            setErrorMessage("Musisz być zalogowany, aby dodać spotkanie.");
            setSubmitStatus('error');
            return;
        }
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('date', formData.date);

            formData.images.forEach((image) => {
                formDataToSend.append(`images`, image);
            });

            const response = await fetch('/api/breeder-meetings', {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ title: '', description: '', location: '', date: '', images: [] });
                setPreviewImages([]);
                // Odśwież listę spotkań po dodaniu nowego
                const meetings = await getAllBreederMeetings();
                setBreederMeetings(meetings);
            } else {
                const errorData = await response.json();
                setSubmitStatus('error');
                setErrorMessage(errorData.error || 'Wystąpił błąd podczas dodawania spotkania');
            }
        } catch (error) {
            setSubmitStatus('error');
            setErrorMessage('Wystąpił błąd podczas wysyłania formularza');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));

            const previews = files.map(file => URL.createObjectURL(file));
            setPreviewImages(prev => [...prev, ...previews]);
        }
    };

    const removeImage = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        const newPreviews = previewImages.filter((_, i) => i !== index);

        setFormData(prev => ({ ...prev, images: newImages }));
        setPreviewImages(newPreviews);
    };

    const handleCloseModal = () => {
        setSelectedImage(null)
    }

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedImage) {
                handleCloseModal()
            }
        }
        window.addEventListener('keydown', handleEscape)
        return () => window.removeEventListener('keydown', handleEscape)
    }, [selectedImage])

    if (!imagesLoaded || status === 'loading') {
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
                className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8"
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
                    {/* Add Meeting Form Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <UnifiedCard variant="glass" className="p-8 rounded-2xl border border-white/30 form-container-glow">
                            <div className="text-center mb-8">
                                <Text3D variant="neon" intensity="high" className="text-3xl font-bold mb-4">
                                    Dodaj Zdjęcia ze Spotkania
                                </Text3D>
                                <p className="text-white/80 text-lg">
                                    Podziel się zdjęciami z naszych spotkań z hodowcami
                                </p>
                            </div>

                            {session ? (
                                <>
                                    <AnimatePresence>
                                        {submitStatus === 'success' && (
                                            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center">
                                                <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                                                <span className="text-green-400">Spotkanie zostało dodane pomyślnie!</span>
                                            </motion.div>
                                        )}
                                        {submitStatus === 'error' && (
                                            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center">
                                                <AlertCircle className="w-5 h-5 text-red-400 mr-3" />
                                                <span className="text-red-400">{errorMessage}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-white text-sm font-medium mb-2">Tytuł spotkania *</label>
                                                <input type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" placeholder="np. Spotkanie w Lubaniu 2024" required />
                                            </div>
                                            <div>
                                                <label className="block text-white text-sm font-medium mb-2">Data spotkania *</label>
                                                <input type="date" value={formData.date} onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" title="Wybierz datę spotkania" required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-white text-sm font-medium mb-2">Lokalizacja *</label>
                                            <input type="text" value={formData.location} onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300" placeholder="Gdzie odbyło się spotkanie?" required />
                                        </div>
                                        <div>
                                            <label className="block text-white text-sm font-medium mb-2">Opis spotkania</label>
                                            <textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-24 resize-none" placeholder="Opisz przebieg spotkania, uczestników, tematy rozmów..." rows={4} />
                                        </div>
                                        <div>
                                            <label className="block text-white text-sm font-medium mb-2">Zdjęcia ze spotkania *</label>
                                            <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-white/50 transition-colors duration-300">
                                                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" id="image-upload" required={formData.images.length === 0} />
                                                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center space-y-4">
                                                    <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center"><Camera className="w-8 h-8 text-blue-400" /></div>
                                                    <div>
                                                        <p className="text-white font-medium">Kliknij aby wybrać zdjęcia</p>
                                                        <p className="text-white/60 text-sm">lub przeciągnij i upuść</p>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-blue-400"><Upload className="w-4 h-4" /> <span className="text-sm">Wybierz pliki</span></div>
                                                </label>
                                            </div>
                                            {previewImages.length > 0 && (
                                                <div className="mt-4">
                                                    <p className="text-white/70 text-sm mb-3">Wybrano {previewImages.length} zdjęć</p>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                                        {previewImages.map((preview, index) => (
                                                            <motion.div key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative group aspect-square">
                                                                <Image src={preview} alt={`Podgląd ${index + 1}`} fill sizes="150px" className="object-cover rounded-lg" />
                                                                <button type="button" onClick={() => removeImage(index)} title="Usuń zdjęcie" className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"><X className="w-4 h-4" /></button>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="pt-4">
                                            <UnifiedButton type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting} glow={true}>
                                                {isSubmitting ? (<div className="flex items-center justify-center"><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>Dodawanie...</div>) : (<div className="flex items-center justify-center"><Camera className="w-5 h-5 mr-2" />Dodaj Spotkanie</div>)}
                                            </UnifiedButton>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-8">
                                    <Text3D variant="gradient" intensity="medium" className="text-2xl font-bold mb-4">
                                        Dołącz do naszej społeczności!
                                    </Text3D>
                                    <p className="text-white/80 text-lg mb-6 max-w-md mx-auto">
                                        Aby dodać zdjęcia ze spotkania, musisz być zalogowanym i zweryfikowanym użytkownikiem.
                                    </p>
                                    <UnifiedButton
                                        variant="primary"
                                        size="lg"
                                        intensity="high"
                                        glow={true}
                                        onClick={() => router.push('/auth/signin?callbackUrl=/breeder-meetings')}
                                    >
                                        Zaloguj się lub Zarejestruj
                                    </UnifiedButton>
                                </div>
                            )}
                        </UnifiedCard>
                    </motion.section>

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
                                                    <Image
                                                        src={image}
                                                        alt={`${meeting.name} - zdjęcie ${imageIndex + 1}`}
                                                        width={300}
                                                        height={192}
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
                (() => {
                    const meeting = breederMeetings.find(m => m.id === selectedImage.meetingId);
                    if (!meeting) return null;

                    const currentImage = meeting.images[selectedImage.imageIndex];
                    if (!currentImage) return null;

                    return (
                        <ImageModal
                            image={{
                                id: `${meeting.id}-${selectedImage.imageIndex}`,
                                src: currentImage,
                                alt: `${meeting.name} - zdjęcie ${selectedImage.imageIndex + 1}`
                            }}
                            onClose={handleCloseModal}
                            onPrevious={selectedImage.imageIndex > 0
                                ? () => handleImageClick(meeting.id, selectedImage.imageIndex - 1)
                                : undefined
                            }
                            onNext={selectedImage.imageIndex < meeting.images.length - 1
                                ? () => handleImageClick(meeting.id, selectedImage.imageIndex + 1)
                                : undefined
                            }
                            hasPrevious={selectedImage.imageIndex > 0}
                            hasNext={selectedImage.imageIndex < meeting.images.length - 1}
                            currentIndex={selectedImage.imageIndex}
                            totalImages={meeting.images.length}
                        />
                    );
                })()
            )}
        </UnifiedLayout>
    )
}