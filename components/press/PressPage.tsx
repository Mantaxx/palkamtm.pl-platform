'use client'

import { SmartImage } from '@/components/ui/SmartImage'
import { Text3D } from '@/components/ui/Text3D'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'

// Automatyczne wykrywanie gazet z folderów
const newspaperFolders = [
  {
    id: 1,
    name: 'Dobry Lot',
    path: '/press/articles/older/1/',
    cover: 'dobry-lot.jpg',
    images: [
      'dobry-lot-11.jpg',
      'dobry-lot-21.jpg',
      'dobry-lot-31.jpg',
      'dobry-lot-41.jpg'
    ],
    year: '2023'
  },
  {
    id: 2,
    name: 'Hodowca - Część 1',
    path: '/press/articles/older/2/',
    cover: 'Hodowca.jpg',
    images: [
      'Hodowca-1-001.jpg',
      'Hodowca-2-001.jpg',
      'Hodowca-3-001.jpg'
    ],
    year: '2023'
  },
  {
    id: 3,
    name: 'Gazety Kolekcja',
    path: '/press/articles/older/3/',
    cover: 'Newspapers.jpg',
    images: [
      'Newspapers-1-708x1024.jpg',
      'Newspapers-1.jpg',
      'Newspapers-2.jpg',
      'Newspapers-3.jpg'
    ],
    year: '2023'
  },
  {
    id: 4,
    name: 'Hodowca 2014',
    path: '/press/articles/older/4/',
    cover: 'Hodowca2014m.jpg',
    images: [
      'Hodowca20142s (1).jpg',
      'Hodowca20143s.jpg',
      'Hodowca20144s.jpg'
    ],
    year: '2014'
  }
]


export function PressPage() {
  const [selectedImagePair, setSelectedImagePair] = useState<{ left: string, right: string, folderId: number } | null>(null)
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [isNewspaperOpen, setIsNewspaperOpen] = useState(false)
  const [currentNewspaperImages, setCurrentNewspaperImages] = useState<string[]>([])

  // Obsługa klawiatury dla modala
  useEffect(() => {
    // Sprawdź czy jesteśmy w przeglądarce
    if (typeof document === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImagePair && e.key === 'Escape') {
        setSelectedImagePair(null)
      }
    }

    if (selectedImagePair) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImagePair])

  return (
    <div className="relative">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 pt-8 pb-20 px-4 sm:px-6 lg:px-8"
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
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
          >
            Artykuły, wywiady i materiały prasowe o hodowli MTM Pałka
          </motion.p>
        </div>
      </motion.section>

      {/* Content */}
      <div className="relative z-10 px-2 sm:px-4 lg:px-6 pb-20">
        <div className="max-w-none mx-auto">
          {/* DVD Section - na górze */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <UnifiedCard
              variant="glass"
              glow={true}
              className="p-8 lg:p-12 xl:p-16 2xl:p-20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500"
            >
              <div className="text-center mb-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-bold text-white mb-4"
                >
                  🎬 Film o hodowli MTM Pałka
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="text-white/80 text-lg"
                >
                  Zobacz naszą hodowlę w akcji
                </motion.p>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 2xl:gap-20 items-center w-full">
                {/* Film YouTube */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex justify-center order-2 xl:order-1"
                >
                  <div className="relative w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 group">
                    <iframe
                      src="https://www.youtube.com/embed/utXkaMWyZfk"
                      title="Film o hodowli MTM Pałka"
                      className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl">▶️</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Opis filmu */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="order-1 xl:order-2 text-center xl:text-left"
                >
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-white/10"
                    >
                      <h3 className="text-2xl font-bold text-white mb-3">
                        🏆 Nasza historia
                      </h3>
                      <p className="text-white/80 leading-relaxed">
                        Odkryj historię hodowli MTM Pałka, nasze osiągnięcia i pasję do hodowli gołębi pocztowych. 
                        Film przedstawia nasze najlepsze okazy i metody hodowli.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="flex flex-wrap gap-3 justify-center xl:justify-start"
                    >
                      <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-400/30">
                        🎯 Profesjonalna hodowla
                      </span>
                      <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium border border-purple-400/30">
                        🏅 Mistrzowskie okazy
                      </span>
                      <span className="px-4 py-2 bg-green-500/20 text-green-300 rounded-full text-sm font-medium border border-green-400/30">
                        📈 Sprawdzona genetyka
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </UnifiedCard>
          </motion.section>


          {/* Gazety Grid - na dole */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 lg:gap-12 max-w-full mx-auto px-4">
              {newspaperFolders.map((folder, index) => (
                <motion.div
                  key={folder.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-[36rem] md:h-[48rem] lg:h-[52rem] xl:h-[56rem]"
                >
                  <UnifiedCard
                    variant="glass"
                    glow={true}
                    className="w-full h-full relative group overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20"
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-lg z-10"></div>
                    
                    {/* Image container with enhanced effects */}
                    <div className="relative w-full h-full overflow-hidden rounded-lg">
                      <SmartImage
                        src={`/press/articles/older/${folder.id}/${folder.cover}`}
                        alt={`Okładka ${folder.name}`}
                        width={400}
                        height={600}
                        fitMode="cover"
                        aspectRatio="portrait"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={() => {
                          console.error('Błąd ładowania obrazu:', `/press/articles/older/${folder.id}/${folder.cover}`)
                        }}
                      />
                      
                      {/* Animated border effect */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/50 rounded-lg transition-all duration-500"></div>
                    </div>

                    {/* Enhanced overlay with better styling */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-lg flex flex-col justify-end items-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                      {/* Title */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-center mb-6 px-4"
                      >
                        <h3 className="text-white text-xl font-bold mb-2 drop-shadow-lg">
                          {folder.name}
                        </h3>
                        <p className="text-white/80 text-sm">
                          Rok: {folder.year}
                        </p>
                      </motion.div>

                      {/* Enhanced button */}
                      <motion.button
                        onClick={() => {
                          console.log('Kliknięto przycisk dla folderu:', folder.name, 'ID:', folder.id)
                          setSelectedImagePair({
                            left: folder.cover,
                            right: folder.images[0] || folder.cover,
                            folderId: folder.id
                          })
                          setCurrentNewspaperImages(folder.images)
                          setIsNewspaperOpen(false)
                          setCurrentPageIndex(0)
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm font-semibold hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 border border-white/20 backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        📖 Zobacz gazetę
                      </motion.button>
                    </div>

                    {/* Corner decoration */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">📰</span>
                    </div>
                  </UnifiedCard>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

      {/* Modal dla zdjęć - poza layout */}
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
              <button
                onClick={() => setIsNewspaperOpen(true)}
                className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 bg-blue-500/90 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl group"
                title="Otwórz gazetę"
              >
                <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            )}

            {/* Nawigacja między stronami */}
            {isNewspaperOpen && currentNewspaperImages.length > 0 && (
              <>
                <button
                  onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 2))}
                  disabled={currentPageIndex === 0}
                  className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-gray-500/90 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl"
                  title="Poprzednie strony"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setCurrentPageIndex(Math.min(currentNewspaperImages.length - 2, currentPageIndex + 2))}
                  disabled={currentPageIndex >= currentNewspaperImages.length - 2}
                  className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-gray-500/90 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-2xl"
                  title="Następne strony"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Okładka lub Strony gazety */}
            {!isNewspaperOpen ? (
              // Okładka gazety
              <motion.div
                key="cover"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-auto h-auto max-w-[90vw] max-h-[90vh]"
              >
                <SmartImage
                  src={`/press/articles/older/${selectedImagePair.folderId}/${selectedImagePair.left}`}
                  alt="Okładka gazety"
                  width={800}
                  height={1200}
                  fitMode="contain"
                  aspectRatio="portrait"
                  className="w-auto h-full max-h-[90vh] rounded-lg shadow-2xl"
                />
              </motion.div>
            ) : (
              // Strony gazety - 2 obok siebie
              <motion.div
                key={`pages-${currentPageIndex}`}
                initial={{ opacity: 0, x: 100, rotateY: 15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -15 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex gap-4 w-full h-full items-center justify-center"
              >
                {/* Lewa strona */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 max-w-[45vw] max-h-[90vh]"
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
                    className="flex-1 max-w-[45vw] max-h-[90vh]"
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${Math.floor(currentPageIndex / 2) === index ? 'bg-blue-500 scale-125' : 'bg-gray-400 hover:bg-gray-300'
                      }`}
                    title={`Strony ${index * 2 + 1}-${index * 2 + 2}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
