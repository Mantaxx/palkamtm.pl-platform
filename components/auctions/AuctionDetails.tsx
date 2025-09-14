'use client'

import PaymentModal from '@/components/payments/PaymentModal'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { AlertCircle, Calendar, Clock, Eye, Heart, MapPin, Share2, Users } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface AuctionDetailsProps {
  auctionId: string
}

interface Bid {
  id: string
  amount: number
  bidder: {
    id: string
    name: string
    avatar?: string
  }
  timestamp: Date
  isWinning: boolean
}

interface Auction {
  id: string
  title: string
  description: string
  startingPrice: number
  currentPrice: number
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
    avatar?: string
    rating: number
    salesCount: number
  }
  images: string[]
  videos?: string[]
  bids: Bid[]
  watchersCount: number
  viewsCount: number
}

// Funkcja do pobierania aukcji z localStorage
const getAuctionById = (id: string): Auction | null => {
  if (typeof window !== 'undefined') {
    const auctions = JSON.parse(localStorage.getItem('auctions') || '[]')
    const auction = auctions.find((a: any) => a.id === id)

    if (!auction) return null

    // Konwersja do formatu Auction
    return {
      id: auction.id,
      title: auction.title,
      description: auction.description,
      startingPrice: auction.startingPrice,
      currentPrice: auction.currentPrice,
      buyNowPrice: auction.buyNowPrice,
      endTime: new Date(auction.endTime),
      status: auction.status || 'active',
      category: auction.category,
      bloodline: auction.bloodline || '',
      age: auction.age ? parseInt(auction.age) : 0,
      sex: 'male', // domyślnie
      location: auction.location,
      seller: {
        id: '1',
        name: auction.seller || 'Pałka M.T.M.',
        avatar: '/avatars/seller1.jpg',
        rating: auction.sellerRating || 5.0,
        salesCount: 127
      },
      images: auction.images || ['/api/placeholder/400/300'],
      videos: [],
      bids: [],
      watchersCount: auction.watchers || 0,
      viewsCount: 156
    }
  }
  return null
}

export default function AuctionDetails({ auctionId }: AuctionDetailsProps) {
  const [auction, setAuction] = useState<Auction | null>(null)
  const [bidAmount, setBidAmount] = useState('')
  const [isWatching, setIsWatching] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')
  const [isBidding, setIsBidding] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  // Ładowanie aukcji
  useEffect(() => {
    const loadedAuction = getAuctionById(auctionId)
    setAuction(loadedAuction)
  }, [auctionId])

  if (!auction) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Aukcja nie została znaleziona</h1>
          <p className="text-gray-600 mb-6">Aukcja o podanym ID nie istnieje lub została usunięta.</p>
          <a href="/auctions" className="btn-primary">
            Powrót do aukcji
          </a>
        </div>
      </div>
    )
  }

  useEffect(() => {
    // Symulacja aktualizacji czasu w czasie rzeczywistym
    const interval = setInterval(() => {
      const now = new Date()
      const endTime = auction.endTime
      const diff = endTime.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft('Aukcja zakończona')
        setAuction(prev => prev ? { ...prev, status: 'ended' } : null)
        clearInterval(interval)
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`)
      } else if (minutes > 0) {
        setTimeLeft(`${minutes}m ${seconds}s`)
        if (minutes <= 1) {
          setAuction(prev => prev ? { ...prev, status: 'ending' } : null)
        }
      } else {
        setTimeLeft(`${seconds}s`)
        setAuction(prev => prev ? { ...prev, status: 'ending' } : null)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [auction.endTime])

  const handleBid = async () => {
    if (!bidAmount || parseFloat(bidAmount) <= auction.currentPrice) {
      return
    }

    setIsBidding(true)

    // Symulacja wysłania oferty
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newBid: Bid = {
      id: Date.now().toString(),
      amount: parseFloat(bidAmount),
      bidder: {
        id: 'current-user',
        name: 'Ty'
      },
      timestamp: new Date(),
      isWinning: true
    }

    setAuction(prev => prev ? {
      ...prev,
      currentPrice: newBid.amount,
      bids: [newBid, ...prev.bids.map(bid => ({ ...bid, isWinning: false }))]
    } : null)

    setBidAmount('')
    setIsBidding(false)
  }

  const handleBuyNow = () => {
    setIsPaymentModalOpen(true)
  }

  const handlePaymentSuccess = (paymentIntentId: string) => {
    console.log('Płatność zakończona pomyślnie:', paymentIntentId)
    setIsPaymentModalOpen(false)
    // Tutaj można dodać przekierowanie lub powiadomienie
  }

  const minBidAmount = auction.currentPrice + 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Główna zawartość */}
          <div className="lg:col-span-2 space-y-6">
            {/* Galeria zdjęć */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className="aspect-video relative">
                <Image
                  src={auction.images[0]}
                  alt={auction.title}
                  fill
                  className="object-cover"
                />
                {auction.status === 'ending' && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Kończy się wkrótce!
                  </div>
                )}
              </div>

              {auction.images.length > 1 && (
                <div className="p-4 grid grid-cols-4 gap-2">
                  {auction.images.slice(1).map((image, index) => (
                    <div key={index} className="aspect-square relative rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`${auction.title} ${index + 2}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Szczegóły aukcji */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{auction.title}</h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {auction.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  {auction.age} lat
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  {auction.sex === 'male' ? 'Samiec' : 'Samica'}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Eye className="w-4 h-4" />
                  {auction.viewsCount} wyświetleń
                </div>
              </div>

              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{auction.description}</p>
              </div>
            </motion.div>

            {/* Historia licytacji */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Historia licytacji</h2>

              <div className="space-y-3">
                {auction.bids.map((bid, index) => (
                  <div
                    key={bid.id}
                    className={`flex items-center justify-between p-3 rounded-lg ${bid.isWinning ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{bid.bidder.name}</p>
                        <p className="text-sm text-gray-500">
                          {format(bid.timestamp, 'dd.MM.yyyy HH:mm', { locale: pl })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{bid.amount.toLocaleString()} zł</p>
                      {bid.isWinning && (
                        <p className="text-sm text-green-600 font-medium">Wygrywa</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Panel licytacji */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 sticky top-6"
            >
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">Pozostało czasu</span>
                </div>
                <p className={`text-2xl font-bold ${auction.status === 'ending' ? 'text-red-600' : 'text-gray-900'
                  }`}>
                  {timeLeft}
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Aktualna cena</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {auction.currentPrice.toLocaleString()} zł
                  </p>
                </div>

                {auction.buyNowPrice && (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Kup teraz</p>
                    <p className="text-xl font-semibold text-blue-600">
                      {auction.buyNowPrice.toLocaleString()} zł
                    </p>
                  </div>
                )}
              </div>

              {auction.status === 'active' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twoja oferta (min. {minBidAmount.toLocaleString()} zł)
                    </label>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      min={minBidAmount}
                      step="50"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Wprowadź kwotę"
                    />
                  </div>

                  <button
                    onClick={handleBid}
                    disabled={!bidAmount || parseFloat(bidAmount) < minBidAmount || isBidding}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isBidding ? 'Licytuję...' : 'Złóż ofertę'}
                  </button>

                  {auction.buyNowPrice && (
                    <button
                      onClick={handleBuyNow}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 transition-colors"
                    >
                      Kup teraz za {auction.buyNowPrice.toLocaleString()} zł
                    </button>
                  )}
                </div>
              )}

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setIsWatching(!isWatching)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md font-medium transition-colors ${isWatching
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  <Heart className={`w-4 h-4 ${isWatching ? 'fill-current' : ''}`} />
                  {isWatching ? 'Obserwujesz' : 'Obserwuj'}
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-md font-medium hover:bg-gray-200 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Udostępnij
                </button>
              </div>
            </motion.div>

            {/* Informacje o sprzedawcy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sprzedawca</h3>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-600">
                    {auction.seller.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{auction.seller.name}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600">
                      {auction.seller.rating} ({auction.seller.salesCount} sprzedaży)
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors">
                Wyślij wiadomość
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Modal płatności */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        auctionId={auction.id}
        amount={auction.buyNowPrice || auction.currentPrice}
        auctionTitle={auction.title}
        sellerName={auction.seller.name}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  )
}
