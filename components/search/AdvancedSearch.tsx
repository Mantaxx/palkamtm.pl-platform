'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Star,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface SearchFilters {
  query: string
  category: string
  bloodline: string
  priceMin: number
  priceMax: number
  ageMin: number
  ageMax: number
  sex: string
  location: string
  sellerRating: number
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

interface SearchResult {
  id: string
  title: string
  description: string
  currentPrice: number
  startingPrice: number
  buyNowPrice?: number
  endTime: Date
  status: 'active' | 'ending' | 'ended'
  category: string
  bloodline: string
  age: number
  sex: 'male' | 'female'
  location: string
  seller: {
    id: string
    name: string
    rating: number
    salesCount: number
  }
  images: string[]
  bids: number
  watchers: number
  views: number
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'Champion "Thunder Storm" - Linia Janssen',
    description: 'Wybitny gołąb pocztowy z doskonałymi wynikami w zawodach.',
    currentPrice: 8750,
    startingPrice: 5000,
    buyNowPrice: 15000,
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    status: 'active',
    category: 'Pigeon',
    bloodline: 'Janssen',
    age: 3,
    sex: 'male',
    location: 'Kraków, Polska',
    seller: {
      id: '1',
      name: 'Jan Kowalski',
      rating: 4.9,
      salesCount: 127
    },
    images: ['/pigeons/champion1-1.jpg'],
    bids: 8,
    watchers: 23,
    views: 156
  },
  {
    id: '2',
    title: 'Para hodowlana - Linia Sion',
    description: 'Para doświadczonych gołębi hodowlanych.',
    currentPrice: 12000,
    startingPrice: 8000,
    endTime: new Date(Date.now() + 30 * 60 * 1000),
    status: 'ending',
    category: 'Pigeon',
    bloodline: 'Sion',
    age: 4,
    sex: 'male',
    location: 'Warszawa, Polska',
    seller: {
      id: '2',
      name: 'Anna Nowak',
      rating: 4.7,
      salesCount: 89
    },
    images: ['/pigeons/champion2-1.jpg'],
    bids: 12,
    watchers: 15,
    views: 89
  },
  {
    id: '3',
    title: 'Suplementy witaminowe Premium',
    description: 'Kompleks witamin dla gołębi pocztowych.',
    currentPrice: 250,
    startingPrice: 200,
    buyNowPrice: 300,
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    status: 'active',
    category: 'Supplements',
    bloodline: '',
    age: 0,
    sex: 'male',
    location: 'Gdańsk, Polska',
    seller: {
      id: '3',
      name: 'Piotr Wiśniewski',
      rating: 4.5,
      salesCount: 45
    },
    images: ['/supplements/vitamins.jpg'],
    bids: 5,
    watchers: 8,
    views: 45
  }
]

const categories = [
  { value: '', label: 'Wszystkie kategorie' },
  { value: 'Pigeon', label: 'Gołębie Pocztowe' },
  { value: 'Supplements', label: 'Suplementy' },
  { value: 'Accessories', label: 'Akcesoria' }
]

const bloodlines = [
  { value: '', label: 'Wszystkie linie' },
  { value: 'Janssen', label: 'Janssen' },
  { value: 'Sion', label: 'Sion' },
  { value: 'Bricoux', label: 'Bricoux' },
  { value: 'Van Loon', label: 'Van Loon' },
  { value: 'Heremans', label: 'Heremans' }
]

const sortOptions = [
  { value: 'endTime', label: 'Czas zakończenia' },
  { value: 'currentPrice', label: 'Cena' },
  { value: 'bids', label: 'Liczba ofert' },
  { value: 'views', label: 'Popularność' },
  { value: 'createdAt', label: 'Data dodania' }
]

export default function AdvancedSearch() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    bloodline: '',
    priceMin: 0,
    priceMax: 100000,
    ageMin: 0,
    ageMax: 10,
    sex: '',
    location: '',
    sellerRating: 0,
    sortBy: 'endTime',
    sortOrder: 'asc'
  })

  const [results, setResults] = useState<SearchResult[]>(mockResults)
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSearch = async () => {
    setIsLoading(true)
    
    // Symulacja wyszukiwania
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Filtrowanie wyników
    let filteredResults = mockResults.filter(result => {
      // Wyszukiwanie tekstowe
      if (filters.query && !result.title.toLowerCase().includes(filters.query.toLowerCase()) &&
          !result.description.toLowerCase().includes(filters.query.toLowerCase())) {
        return false
      }

      // Kategoria
      if (filters.category && result.category !== filters.category) {
        return false
      }

      // Linia krwi
      if (filters.bloodline && result.bloodline !== filters.bloodline) {
        return false
      }

      // Cena
      if (result.currentPrice < filters.priceMin || result.currentPrice > filters.priceMax) {
        return false
      }

      // Wiek
      if (result.age < filters.ageMin || result.age > filters.ageMax) {
        return false
      }

      // Płeć
      if (filters.sex && result.sex !== filters.sex) {
        return false
      }

      // Lokalizacja
      if (filters.location && !result.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }

      // Ocena sprzedawcy
      if (result.seller.rating < filters.sellerRating) {
        return false
      }

      return true
    })

    // Sortowanie
    filteredResults.sort((a, b) => {
      let aValue: any, bValue: any

      switch (filters.sortBy) {
        case 'currentPrice':
          aValue = a.currentPrice
          bValue = b.currentPrice
          break
        case 'bids':
          aValue = a.bids
          bValue = b.bids
          break
        case 'views':
          aValue = a.views
          bValue = b.views
          break
        case 'endTime':
          aValue = a.endTime.getTime()
          bValue = b.endTime.getTime()
          break
        default:
          aValue = a.currentPrice
          bValue = b.currentPrice
      }

      if (filters.sortOrder === 'asc') {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })

    setResults(filteredResults)
    setIsLoading(false)
  }

  const clearFilters = () => {
    setFilters({
      query: '',
      category: '',
      bloodline: '',
      priceMin: 0,
      priceMax: 100000,
      ageMin: 0,
      ageMax: 10,
      sex: '',
      location: '',
      sellerRating: 0,
      sortBy: 'endTime',
      sortOrder: 'asc'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'ending':
        return 'bg-yellow-100 text-yellow-800'
      case 'ended':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktywna'
      case 'ending':
        return 'Kończy się'
      case 'ended':
        return 'Zakończona'
      default:
        return status
    }
  }

  useEffect(() => {
    handleSearch()
  }, [filters])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wyszukiwanie aukcji</h1>
          <p className="text-gray-600">Znajdź idealnego gołębia pocztowego lub akcesoria</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar z filtrami */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filtry</h2>
                <button
                  onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isFiltersOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
              </div>

              <AnimatePresence>
                {(isFiltersOpen || window.innerWidth >= 1024) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
                  >
                    {/* Wyszukiwanie tekstowe */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Szukaj
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={filters.query}
                          onChange={(e) => handleFilterChange('query', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Nazwa, opis..."
                        />
                      </div>
                    </div>

                    {/* Kategoria */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kategoria
                      </label>
                      <select
                        value={filters.category}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {categories.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Linia krwi */}
                    {filters.category === 'Pigeon' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Linia krwi
                        </label>
                        <select
                          value={filters.bloodline}
                          onChange={(e) => handleFilterChange('bloodline', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {bloodlines.map(bloodline => (
                            <option key={bloodline.value} value={bloodline.value}>
                              {bloodline.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Przedział cenowy */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cena (zł)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="number"
                          value={filters.priceMin}
                          onChange={(e) => handleFilterChange('priceMin', parseInt(e.target.value) || 0)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Min"
                        />
                        <input
                          type="number"
                          value={filters.priceMax}
                          onChange={(e) => handleFilterChange('priceMax', parseInt(e.target.value) || 100000)}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Max"
                        />
                      </div>
                    </div>

                    {/* Wiek (tylko dla gołębi) */}
                    {filters.category === 'Pigeon' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Wiek (lata)
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            value={filters.ageMin}
                            onChange={(e) => handleFilterChange('ageMin', parseInt(e.target.value) || 0)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Min"
                          />
                          <input
                            type="number"
                            value={filters.ageMax}
                            onChange={(e) => handleFilterChange('ageMax', parseInt(e.target.value) || 10)}
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Max"
                          />
                        </div>
                      </div>
                    )}

                    {/* Płeć (tylko dla gołębi) */}
                    {filters.category === 'Pigeon' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Płeć
                        </label>
                        <select
                          value={filters.sex}
                          onChange={(e) => handleFilterChange('sex', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Wszystkie</option>
                          <option value="male">Samiec</option>
                          <option value="female">Samica</option>
                        </select>
                      </div>
                    )}

                    {/* Lokalizacja */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lokalizacja
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          value={filters.location}
                          onChange={(e) => handleFilterChange('location', e.target.value)}
                          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Miasto, region..."
                        />
                      </div>
                    </div>

                    {/* Ocena sprzedawcy */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Min. ocena sprzedawcy
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="5"
                          step="0.1"
                          value={filters.sellerRating}
                          onChange={(e) => handleFilterChange('sellerRating', parseFloat(e.target.value))}
                          className="flex-1"
                        />
                        <span className="text-sm font-medium text-gray-600">
                          {filters.sellerRating.toFixed(1)}★
                        </span>
                      </div>
                    </div>

                    {/* Sortowanie */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sortuj według
                      </label>
                      <div className="space-y-2">
                        <select
                          value={filters.sortBy}
                          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          {sortOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <select
                          value={filters.sortOrder}
                          onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="asc">Rosnąco</option>
                          <option value="desc">Malejąco</option>
                        </select>
                      </div>
                    </div>

                    {/* Przyciski */}
                    <div className="flex gap-2">
                      <button
                        onClick={clearFilters}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        Wyczyść
                      </button>
                      <button
                        onClick={handleSearch}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
                      >
                        {isLoading ? 'Szukam...' : 'Szukaj'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Wyniki wyszukiwania */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Znaleziono {results.length} wyników
                </h2>
                <p className="text-sm text-gray-600">
                  {filters.query && `dla zapytania "${filters.query}"`}
                </p>
              </div>
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filtry
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Wyszukuję...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {results.map((result) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-6">
                      <div className="w-32 h-32 bg-gray-200 rounded-lg flex-shrink-0" />
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {result.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(result.status)}`}>
                            {getStatusText(result.status)}
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {result.description}
                        </p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <DollarSign className="w-4 h-4" />
                            <span>{result.currentPrice.toLocaleString()} zł</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Users className="w-4 h-4" />
                            <span>{result.bids} ofert</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{result.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Star className="w-4 h-4" />
                            <span>{result.seller.rating} ({result.seller.salesCount})</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            Sprzedawca: {result.seller.name}
                          </div>
                          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                            Zobacz szczegóły
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {results.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Brak wyników</h3>
                    <p className="text-gray-600">Spróbuj zmienić kryteria wyszukiwania</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
