'use client'

import { motion } from 'framer-motion'
import { Calendar, Eye, FileText, Quote, X } from 'lucide-react'
import React, { useState } from 'react'
import ImageModal from '@/components/ImageModal'

// Automatyczne wykrywanie gazet z folderów
const newspaperFolders = [
  {
    id: 1,
    name: 'Dobry Lot',
    path: '/press/articles/older/1/',
    cover: 'dobry-lot.jpg', // Okładka
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
    cover: 'Hodowca.jpg', // Okładka
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
    cover: 'Newspapers.jpg', // Okładka
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
    cover: 'Hodowca2014m.jpg', // Okładka
    images: [
      'Hodowca20142s (1).jpg',
      'Hodowca20143s.jpg',
      'Hodowca20144s.jpg'
    ],
    year: '2014'
  }
]

// Generowanie listy wszystkich zdjęć z folderów (okładka + strony)
const newspaperImages = newspaperFolders.flatMap(folder => {
  // Okładka jako pierwsza strona
  const coverImage = {
    src: `${folder.path}${folder.cover}`,
    title: `${folder.name} - Okładka`,
    date: folder.year,
    folderId: folder.id,
    folderName: folder.name,
    isCover: true
  }

  // Pozostałe strony
  const pageImages = folder.images.map(image => ({
    src: `${folder.path}${image}`,
    title: `${folder.name} - ${image.replace(/\.(jpg|jpeg|png)$/i, '')}`,
    date: folder.year,
    folderId: folder.id,
    folderName: folder.name,
    isCover: false
  }))

  return [coverImage, ...pageImages]
})

const pressArticles: Array<{
  id: number
  title: string
  source: string
  date: string
  excerpt: string
  url: string
  image: string
  featured: boolean
}> = []

const mediaQuotes: Array<{
  text: string
  author: string
  source: string
}> = []

export function PressPage() {
  const [selectedImage, setSelectedImage] = useState<{ src: string, title: string, folderId: number } | null>(null)

  const goToNextPage = () => {
    if (isAnimating || !selectedImagePair) return

    // Znajdź aktualną gazetę
    const currentImage = newspaperImages.find(img => img.src === selectedImagePair.left)
    if (!currentImage) return

    const currentFolder = newspaperFolders.find(folder => folder.id === currentImage.folderId)
    if (!currentFolder) return

    // Oblicz maksymalną liczbę stron dla tej gazety
    const maxPages = Math.ceil((currentFolder.images.length + 1) / 2) // +1 dla okładki
    const nextIndex = (currentPageIndex + 1) % maxPages

    setIsAnimating(true)
    setTimeout(() => {
      setCurrentPageIndex(nextIndex)
      setIsAnimating(false)
    }, 300)
  }

  const goToPreviousPage = () => {
    if (isAnimating || !selectedImagePair) return

    // Znajdź aktualną gazetę
    const currentImage = newspaperImages.find(img => img.src === selectedImagePair.left)
    if (!currentImage) return

    const currentFolder = newspaperFolders.find(folder => folder.id === currentImage.folderId)
    if (!currentFolder) return

    // Oblicz maksymalną liczbę stron dla tej gazety
    const maxPages = Math.ceil((currentFolder.images.length + 1) / 2) // +1 dla okładki
    const prevIndex = currentPageIndex === 0 ? maxPages - 1 : currentPageIndex - 1

    setIsAnimating(true)
    setTimeout(() => {
      setCurrentPageIndex(prevIndex)
      setIsAnimating(false)
    }, 300)
  }

  const getCurrentPageImages = () => {
    if (!selectedImagePair) return { left: '', right: '' }

    // Znajdź aktualną gazetę na podstawie lewego zdjęcia
    const currentImage = newspaperImages.find(img => img.src === selectedImagePair.left)
    if (!currentImage) return selectedImagePair

    const currentFolder = newspaperFolders.find(folder => folder.id === currentImage.folderId)
    if (!currentFolder) return selectedImagePair

    // Pobierz wszystkie zdjęcia z aktualnej gazety
    const folderImages = newspaperImages.filter(img => img.folderId === currentImage.folderId)

    if (currentPageIndex === 0) {
      // Okładka + pierwsza strona
      const coverImage = folderImages.find(img => img.isCover)
      const firstPageImage = folderImages.find(img => !img.isCover)
      return {
        left: coverImage?.src || '',
        right: firstPageImage?.src || coverImage?.src || ''
      }
    } else {
      // Pary stron
      const pageImages = folderImages.filter(img => !img.isCover)
      const leftIndex = (currentPageIndex - 1) * 2
      const rightIndex = leftIndex + 1

      return {
        left: pageImages[leftIndex]?.src || '',
        right: pageImages[rightIndex]?.src || pageImages[leftIndex]?.src || ''
      }
    }
  }

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 300))
  }

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50))
  }

  const handleResetZoom = () => {
    setZoomLevel(100)
    setImagePosition({ x: 0, y: 0 })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 100) {
      setIsDragging(true)
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 100) {
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
    if (e.deltaY < 0) {
      handleZoomIn()
    } else {
      handleZoomOut()
    }
  }

  // Obsługa klawiatury
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImagePair) {
        setSelectedImagePair(null)
      }
    }

    if (selectedImagePair) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImagePair])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Prasa i Media
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Artykuły prasowe, wywiady i materiały medialne o naszej hodowli gołębi pocztowych
            </p>
          </motion.div>
        </div>
      </section>


      {/* Film DVD */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Film o Naszej Hodowli</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Obejrzyj film dokumentalny o naszej hodowli gołębi
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Okładka DVD */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <div className="relative group">
                {/* Cień DVD */}
                <div className="absolute inset-0 bg-black/20 rounded-lg transform rotate-3 translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-all duration-300"></div>

                {/* Ramka DVD */}
                <div className="relative bg-white rounded-lg p-6 shadow-2xl border-4 border-gray-200 group-hover:border-primary-300 transition-all duration-300">
                  <img
                    src="/press/articles/older/movie-cover.jpg"
                    alt="Okładka DVD - Film o hodowli gołębi"
                    className="w-full max-w-lg h-auto rounded-lg shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />

                  {/* Overlay z ikoną play */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center rounded-lg">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Film YouTube */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl max-w-2xl mx-auto">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/utXkaMWyZfk"
                  title="Film o hodowli gołębi"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Dokument o Naszej Hodowli
                </h3>
                <p className="text-gray-600">
                  Zobacz jak wygląda nasza codzienna praca z gołębiami
                </p>
                <a
                  href="https://www.youtube.com/watch?v=utXkaMWyZfk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Otwórz na YouTube
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newspaper Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6">
              Artykuły z Gazet
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kliknij na zdjęcie, aby zobaczyć artykuł w pełnym rozmiarze
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {newspaperFolders.map((folder, index) => (
              <motion.div
                key={folder.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
                onClick={() => {
                  // Znajdź okładkę tej gazety
                  const coverImage = newspaperImages.find(img => img.folderId === folder.id && img.isCover)
                  const firstPageImage = newspaperImages.find(img => img.folderId === folder.id && !img.isCover)

                  setCurrentPageIndex(0)
                  setSelectedImagePair({
                    left: coverImage?.src || '',
                    right: firstPageImage?.src || coverImage?.src || ''
                  })
                }}
              >
                {/* Gazeta z efektem 3D */}
                <div className="relative transform transition-all duration-300 group-hover:scale-105 group-hover:-rotate-2">
                  {/* Cień gazety */}
                  <div className="absolute inset-0 bg-black/20 rounded-lg transform rotate-2 translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-all duration-300"></div>

                  {/* Ramka gazety */}
                  <div className="relative bg-white rounded-lg p-2 shadow-2xl border-4 border-gray-200 group-hover:border-primary-300 transition-all duration-300">
                    {/* Zdjęcie okładki */}
                    <div className="relative overflow-hidden rounded-md">
                      <img
                        src={`${folder.path}${folder.cover}`}
                        alt={`${folder.name} - Okładka`}
                        className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />

                      {/* Overlay z ikoną */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100" />
                      </div>
                    </div>

                    {/* Informacje o gazecie */}
                    <div className="mt-3 p-2">
                      <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                        {folder.name}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{folder.year}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {folder.images.length + 1} stron
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Quotes */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6">
              Co Mówią o Nas Media
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mediaQuotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200"
              >
                <Quote className="w-8 h-8 text-primary-600 mb-4" />
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{quote.text}"
                </p>
                <div className="border-t border-gray-300 pt-4">
                  <p className="font-semibold text-gray-900">{quote.author}</p>
                  <p className="text-sm text-gray-600">{quote.source}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Media */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6">
              Kontakt dla Mediów
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Jesteś dziennikarzem lub przedstawicielem mediów? Skontaktuj się z nami, aby uzyskać materiały prasowe, zdjęcia lub umówić wywiad.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold"
            >
              <FileText className="w-5 h-5 mr-2" />
              Skontaktuj się z nami
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal do wyświetlania gazety w formie rozłożonej */}
      {selectedImagePair && (
        <div
          className="fixed inset-0 bg-black/90 flex items-start justify-center pt-8 pb-8 z-50 overflow-hidden"
        >
          <div className="relative w-full max-w-[95vw] h-[90vh] bg-gray-100 rounded-lg overflow-hidden shadow-2xl">
            {/* Symulacja rozłożonej gazety */}
            <div
              className={`flex h-full transition-transform duration-300 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              style={{
                transform: `scale(${zoomLevel / 100}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                transformOrigin: 'center center'
              }}
            >
              {/* Lewa strona gazety */}
              <div className="flex-1 bg-white border-r-2 border-gray-300 relative">
                <img
                  src={getCurrentPageImages().left}
                  alt="Lewa strona gazety"
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                />
                {/* Fałd w środku */}
                <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-gray-400 via-gray-500 to-gray-400 shadow-inner"></div>
              </div>

              {/* Prawa strona gazety */}
              <div className="flex-1 bg-white relative">
                <img
                  src={getCurrentPageImages().right}
                  alt="Prawa strona gazety"
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                />
                {/* Fałd w środku */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gray-400 via-gray-500 to-gray-400 shadow-inner"></div>
              </div>
            </div>

            {/* Cienie gazety */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-2 left-2 right-2 h-2 bg-black/10 rounded-t-lg"></div>
              <div className="absolute bottom-2 left-2 right-2 h-2 bg-black/10 rounded-b-lg"></div>
              <div className="absolute top-2 left-2 bottom-2 w-2 bg-black/10 rounded-l-lg"></div>
              <div className="absolute top-2 right-2 bottom-2 w-2 bg-black/10 rounded-r-lg"></div>
            </div>

            {/* Przycisk zamknięcia */}
            <button
              onClick={() => setSelectedImagePair(null)}
              className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full transition-colors shadow-lg z-10 group"
              title="Zamknij gazetę (ESC)"
            >
              <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            {/* Nawigacja między stronami */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex flex-col gap-4 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToPreviousPage()
                }}
                disabled={isAnimating}
                className="bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex flex-col gap-4 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  goToNextPage()
                }}
                disabled={isAnimating}
                className="bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Kontrolki Zoom */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleZoomOut()
                }}
                disabled={zoomLevel <= 50}
                className="bg-black/70 text-white p-2 rounded-lg hover:bg-black/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>

              <div className="bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-medium min-w-[60px] text-center">
                {zoomLevel}%
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleZoomIn()
                }}
                disabled={zoomLevel >= 300}
                className="bg-black/70 text-white p-2 rounded-lg hover:bg-black/90 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleResetZoom()
                }}
                className="bg-black/70 text-white p-2 rounded-lg hover:bg-black/90 transition-colors shadow-lg"
                title="Resetuj zoom"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>

            {/* Informacja o stronie */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-lg text-sm">
              {(() => {
                if (!selectedImagePair) return ''
                const currentImage = newspaperImages.find(img => img.src === selectedImagePair.left)
                if (!currentImage) return ''
                const currentFolder = newspaperFolders.find(folder => folder.id === currentImage.folderId)
                if (!currentFolder) return ''
                const maxPages = Math.ceil((currentFolder.images.length + 1) / 2)
                return `${currentPageIndex === 0 ? 'Okładka' : `Strona ${currentPageIndex}`} z ${maxPages} - ${currentFolder.name}`
              })()}
            </div>

            {/* Informacja o trybie wyświetlania */}
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
              Rozłożona gazeta - kliknij X lub naciśnij ESC aby zamknąć
            </div>

            {/* Instrukcje zoom */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Scroll do zoom • Przeciągnij do przesuwania</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
