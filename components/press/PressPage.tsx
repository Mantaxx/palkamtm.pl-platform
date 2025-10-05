'use client'

import { APIErrorBoundary } from '@/components/ui/APIErrorBoundary'
import { FlexContainer } from '@/components/ui/FlexContainer'
import { SmartImage } from '@/components/ui/SmartImage'
import { Text3D } from '@/components/ui/Text3D'
import { useAPIError } from '@/hooks/useAPIError'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ImageFolder {
  id: string
  name: string
  cover: string
  images: string[]
}

interface ImagePair {
  left: string
  right: string
  folderId: string
}

export default function PressPage() {
  const { error, clearError } = useAPIError()
  const [selectedImagePair, setSelectedImagePair] = useState<ImagePair | null>(null)
  const [isNewspaperOpen, setIsNewspaperOpen] = useState(false)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [currentNewspaperImages, setCurrentNewspaperImages] = useState<string[]>([])

  // Symulowane dane folderów z gazetami
  const folders: ImageFolder[] = [
    {
      id: '1',
      name: 'Dobry Lot 2024',
      cover: 'dobry-lot.jpg',
      images: ['dobry-lot-11.jpg', 'dobry-lot-21.jpg', 'dobry-lot-31.jpg', 'dobry-lot-41.jpg']
    },
    {
      id: '2',
      name: 'Hodowca 2024',
      cover: 'Hodowca.jpg',
      images: ['Hodowca-1-001.jpg', 'Hodowca-2-001.jpg', 'Hodowca-3-001.jpg']
    },
    {
      id: '3',
      name: 'Newspapers 2024',
      cover: 'Newspapers.jpg',
      images: ['Newspapers-1.jpg', 'Newspapers-2.jpg', 'Newspapers-3.jpg']
    },
    {
      id: '4',
      name: 'Hodowca 2014',
      cover: 'Hodowca2014m.jpg',
      images: ['Hodowca20142s (1).jpg', 'Hodowca20143s.jpg', 'Hodowca20144s.jpg']
    }
  ]

  useEffect(() => {
    if (typeof document === 'undefined') return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImagePair(null)
        setIsNewspaperOpen(false)
        setCurrentPageIndex(0)
      }
    }

    if (selectedImagePair) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImagePair])

  return (
    <APIErrorBoundary>
      <div className="relative">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6 text-red-400">
            <h3 className="font-semibold mb-2">Błąd</h3>
            <p className="text-sm">{error.message}</p>
            <button
              onClick={clearError}
              className="mt-2 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition-colors"
            >
              Zamknij
            </button>
          </div>
        )}

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{ position: 'relative', zIndex: 10, paddingTop: '12rem', paddingBottom: '5rem', paddingLeft: '1rem', paddingRight: '1rem' }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <Text3D
              variant="gradient"
              intensity="high"
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Prasa i Media
            </Text3D>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{ fontSize: '1.25rem', lineHeight: '1.75rem', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '2rem', maxWidth: '48rem', margin: '0 auto' }}
            >
              Artykuły, wywiady i materiały prasowe o hodowli MTM Pałka
            </motion.p>
          </div>
        </motion.section>

        {/* Content */}
        <div className="relative z-10 px-2 sm:px-4 lg:px-6 pb-20">
          <div className="max-w-none mx-auto">
            {/* DVD Section */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-16"
            >
              <div className="flex justify-center">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 items-center w-full max-w-6xl">
                  {/* Okładka DVD */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <div className="relative w-full max-w-64 xl:max-w-72 2xl:max-w-80 aspect-square rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group border-4 border-white hover-3d-lift">
                      <SmartImage
                        src="/press/articles/older/movie-cover.jpg"
                        alt="Okładka filmu o hodowli"
                        width={300}
                        height={300}
                        fitMode="contain"
                        aspectRatio="square"
                        className="w-full h-full object-contain transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl">▶️</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Film YouTube */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <div className="relative w-[28rem] xl:w-[32rem] 2xl:w-[36rem] aspect-video rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group border-4 border-white hover-3d-lift">
                      <iframe
                        src="https://www.youtube.com/embed/utXkaMWyZfk"
                        title="Film o hodowli MTM Pałka"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Gazety */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-16"
            >
              <FlexContainer className="gap-16 lg:gap-20" justify="center">
                {folders.map((folder, index) => (
                  <motion.div
                    key={folder.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className=""
                  >
                    <div
                      className="inline-block border-4 border-white rounded-lg shadow-2xl transition-all duration-500 cursor-pointer hover-3d-lift"
                      onClick={() => {
                        setSelectedImagePair({
                          left: folder.cover,
                          right: folder.images[0] || folder.cover,
                          folderId: folder.id
                        })
                        setCurrentNewspaperImages(folder.images)
                      }}
                    >
                      <SmartImage
                        src={`/press/articles/older/${folder.id}/${folder.cover}`}
                        alt={`Okładka ${folder.name}`}
                        width={300}
                        height={400}
                        fitMode="cover"
                        aspectRatio="portrait"
                        className="block transition-transform duration-700"
                      />
                    </div>
                  </motion.div>
                ))}
              </FlexContainer>
            </motion.section>
          </div>
        </div>

        {/* Modal dla zdjęć */}
        {selectedImagePair && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[99999] flex items-center justify-center p-1">
            <div className="relative w-full h-full bg-transparent flex items-center justify-center">
              <button
                onClick={() => {
                  setSelectedImagePair(null)
                  setIsNewspaperOpen(false)
                  setCurrentPageIndex(0)
                }}
                title="Zamknij (ESC)"
                className="absolute top-4 right-4 z-20 w-12 h-12 bg-red-500/90 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Strzałka do otwierania gazety */}
              {!isNewspaperOpen && currentNewspaperImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
                >
                  <button
                    onClick={() => setIsNewspaperOpen(true)}
                    className="bg-blue-500/90 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-all duration-300 hover:scale-110 shadow-2xl"
                  >
                    <span>Otwórz gazetę</span>
                    <span>📖</span>
                  </button>
                </motion.div>
              )}

              {/* Okładka gazety */}
              {!isNewspaperOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative max-w-2xl max-h-[90vh]"
                >
                  <SmartImage
                    src={`/press/articles/older/${selectedImagePair.folderId}/${selectedImagePair.left}`}
                    alt="Okładka gazety"
                    width={800}
                    height={1200}
                    fitMode="contain"
                    aspectRatio="portrait"
                    className="w-full h-full max-h-[90vh] rounded-lg shadow-2xl"
                  />
                </motion.div>
              )}

              {/* Strony gazety */}
              {isNewspaperOpen && currentNewspaperImages.length > 0 && (
                <motion.div
                  key={`pages-${currentPageIndex}`}
                  initial={{ opacity: 0, x: 100, rotateY: 15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center justify-center space-x-4 max-w-full max-h-[90vh]"
                >
                  {/* Lewa strona */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ flex: 1, maxWidth: '45vw', maxHeight: '90vh' }}
                  >
                    <SmartImage
                      src={`/press/articles/older/${selectedImagePair.folderId}/${currentNewspaperImages[currentPageIndex] || selectedImagePair.left}`}
                      alt={`Strona ${currentPageIndex + 1}`}
                      width={800}
                      height={1200}
                      fitMode="contain"
                      aspectRatio="portrait"
                      className="w-full h-full max-h-[90vh] rounded-lg shadow-2xl"
                    />
                  </motion.div>

                  {/* Prawa strona */}
                  {currentNewspaperImages[currentPageIndex + 1] && (
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      style={{ flex: 1, maxWidth: '45vw', maxHeight: '90vh' }}
                    >
                      <SmartImage
                        src={`/press/articles/older/${selectedImagePair.folderId}/${currentNewspaperImages[currentPageIndex + 1]}`}
                        alt={`Strona ${currentPageIndex + 2}`}
                        width={800}
                        height={1200}
                        fitMode="contain"
                        aspectRatio="portrait"
                        className="w-full h-full max-h-[90vh] rounded-lg shadow-2xl"
                      />
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Wskaźnik stron */}
              {isNewspaperOpen && currentNewspaperImages.length > 0 && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                  {Array.from({ length: Math.ceil(currentNewspaperImages.length / 2) }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPageIndex(index * 2)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(currentPageIndex / 2) === index ? 'bg-blue-500 scale-125' : 'bg-gray-400 hover:bg-gray-300'}`}
                      title={`Strony ${index * 2 + 1}-${index * 2 + 2}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </APIErrorBoundary>
  )
}