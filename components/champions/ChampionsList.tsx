'use client'

import ImageModal from '@/components/ImageModal'
import { distributeImages, getImagesFromFolder } from '@/utils/getImagesFromFolder'
import { motion } from 'framer-motion'
import { Filter, Grid, List, Search } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Champion {
  id: string
  name: string
  ringNumber: string
  bloodline: string
  images: string[]
  pedigree: string
}

// Automatyczne wykrywanie zdjęć
const allImages = getImagesFromFolder('/champions/thunder-storm/gallery')
const distributedImages = distributeImages(allImages, 3)

const championsData: Champion[] = [
  {
    id: 'champion-1',
    name: '',
    ringNumber: '',
    bloodline: '',
    pedigree: '',
    images: distributedImages[0] || [],
  },
  {
    id: 'champion-2',
    name: '',
    ringNumber: '',
    bloodline: '',
    pedigree: '',
    images: distributedImages[1] || [],
  },
  {
    id: 'champion-3',
    name: '',
    ringNumber: '',
    bloodline: '',
    pedigree: '',
    images: distributedImages[2] || [],
  },
]

export function ChampionsList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBloodline, setSelectedBloodline] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedImage, setSelectedImage] = useState<{ championId: string; imageIndex: number } | null>(null)

  const bloodlines = Array.from(new Set(championsData.map(c => c.bloodline)))

  const filteredChampions = championsData.filter(champion => {
    const matchesSearch = champion.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      champion.ringNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      champion.bloodline.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBloodline = !selectedBloodline || champion.bloodline === selectedBloodline
    return matchesSearch && matchesBloodline
  })

  // Utwórz listę wszystkich obrazów z informacjami o championie
  const allImages = filteredChampions.flatMap(champion =>
    champion.images.map((image, imageIndex) => ({
      champion,
      image,
      imageIndex,
      championId: champion.id
    }))
  )

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
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Nasi Championy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary-100 max-w-3xl mx-auto"
          >
            Poznaj naszych najlepszych gołębi pocztowych - prawdziwych mistrzów nieba
          </motion.p>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Szukaj championów..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Bloodline Filter */}
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={selectedBloodline}
                onChange={(e) => setSelectedBloodline(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Wszystkie linie krwi</option>
                {bloodlines.map(bloodline => (
                  <option key={bloodline} value={bloodline}>{bloodline}</option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list'
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Champions Grid/List */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {allImages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Brak wyników</h3>
              <p className="text-gray-500">Spróbuj zmienić kryteria wyszukiwania</p>
            </div>
          ) : (
            <div className={viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'
              : 'space-y-4'
            }>
              {allImages.map(({ champion, image, imageIndex, championId }, index) => (
                <motion.div
                  key={`${championId}-${imageIndex}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`group cursor-pointer relative ${viewMode === 'list' ? 'flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md' : ''
                    }`}
                  onClick={() => setSelectedImage({ championId, imageIndex })}
                >
                  {/* Image */}
                  <div className={`${viewMode === 'grid'
                    ? 'aspect-[3/2] rounded-lg overflow-hidden bg-gray-100'
                    : 'w-32 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0'
                    }`}>
                    <img
                      src={image}
                      alt={`${champion.name} - zdjęcie ${imageIndex + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Champion Info (only in list view) */}
                  {viewMode === 'list' && (
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">{champion.name}</h3>
                      <p className="text-sm text-primary-600">{champion.ringNumber}</p>
                      <p className="text-sm text-gray-600 truncate">{champion.bloodline}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        <span className="font-medium">Rodowód:</span> {champion.pedigree.split('\n')[0]}...
                      </p>
                    </div>
                  )}

                  {/* Hover Overlay (only in grid view) */}
                  {viewMode === 'grid' && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center rounded-lg p-3">
                      <div className="bg-white/90 rounded-lg px-3 py-2">
                        <span className="text-primary-600 font-medium text-sm">Kliknij</span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          image={{
            id: `${selectedImage.championId}-${selectedImage.imageIndex}`,
            src: allImages.find(img => img.championId === selectedImage.championId && img.imageIndex === selectedImage.imageIndex)?.image || '',
            alt: `Champion - zdjęcie ${selectedImage.imageIndex + 1}`
          }}
          onClose={() => setSelectedImage(null)}
          onPrevious={() => {
            const currentIndex = allImages.findIndex(img =>
              img.championId === selectedImage.championId && img.imageIndex === selectedImage.imageIndex
            )
            if (currentIndex > 0) {
              const prevImage = allImages[currentIndex - 1]
              setSelectedImage({
                championId: prevImage.championId,
                imageIndex: prevImage.imageIndex
              })
            }
          }}
          onNext={() => {
            const currentIndex = allImages.findIndex(img =>
              img.championId === selectedImage.championId && img.imageIndex === selectedImage.imageIndex
            )
            if (currentIndex < allImages.length - 1) {
              const nextImage = allImages[currentIndex + 1]
              setSelectedImage({
                championId: nextImage.championId,
                imageIndex: nextImage.imageIndex
              })
            }
          }}
          hasPrevious={allImages.findIndex(img =>
            img.championId === selectedImage.championId && img.imageIndex === selectedImage.imageIndex
          ) > 0}
          hasNext={allImages.findIndex(img =>
            img.championId === selectedImage.championId && img.imageIndex === selectedImage.imageIndex
          ) < allImages.length - 1}
        />
      )}
    </div>
  )
}