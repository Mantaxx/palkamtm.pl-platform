'use client'

import PaymentModal from '@/components/payments/PaymentModal'
import { AUCTIONS_DATA } from '@/lib/data/auctions'
import { useAppStore } from '@/store/useAppStore'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { motion } from 'framer-motion'
import {
  AlertCircle,
  Calendar,
  Eye,
  MapPin,
  Users
} from 'lucide-react'
import { useSession } from 'next-auth/react'
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

// Funkcja do pobierania aukcji z localStorage lub z przykładowych danych
const getAuctionById = (id: string): Auction | null => {
  if (typeof window !== 'undefined') {
    const auctions = JSON.parse(localStorage.getItem('auctions') || '[]')
    const auction = auctions.find((a: unknown) =>
      a && typeof a === 'object' && 'id' in a && a.id === id
    )

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

// Fallback do przykładowych danych (serwer i klient)
const getSampleAuction = (id: string): Auction | null => {
  const sample = AUCTIONS_DATA.find(a => a.id === id) || AUCTIONS_DATA[0]
  if (!sample) return null
  const now = new Date()
  const end = new Date(sample.endTime)
  return {
    id: sample.id,
    title: sample.title,
    description: sample.description,
    startingPrice: sample.startingPrice,
    currentPrice: sample.currentPrice,
    buyNowPrice: sample.buyNowPrice,
    endTime: end,
    status: 'active',
    category: sample.category,
    bloodline: '',
    age: 2,
    sex: 'male',
    location: 'Polska',
    seller: {
      id: sample.sellerId,
      name: sample.sellerId,
      rating: 5,
      salesCount: 100
    },
    images: sample.images?.length ? sample.images : ['/api/placeholder/800/600'],
    videos: [],
    bids: [
      { id: 'b1', amount: sample.currentPrice, bidder: { id: 'u1', name: 'Campeon' }, timestamp: now, isWinning: true },
      { id: 'b0', amount: sample.currentPrice - 100, bidder: { id: 'u2', name: 'Crunch' }, timestamp: new Date(now.getTime() - 86400000), isWinning: false }
    ],
    watchersCount: 12,
    viewsCount: 256
  }
}

export default function AuctionDetails({ auctionId }: AuctionDetailsProps) {
  const { data: session, status: sessionStatus } = useSession()
  const currencyStore = useAppStore()
  const [auction, setAuction] = useState<Auction | null>(null)
  const [bidAmount, setBidAmount] = useState('')
  const [isWatching, setIsWatching] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')
  const [isBidding, setIsBidding] = useState(false)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  // Ładowanie aukcji
  useEffect(() => {
    const loadedAuction = getAuctionById(auctionId) || getSampleAuction(auctionId)
    setAuction(loadedAuction)
  }, [auctionId])

  // Timer effect
  useEffect(() => {
    if (!auction) return
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
  }, [auction?.endTime, auction])

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

  const handleBid = async () => {
    if (!bidAmount || parseFloat(bidAmount) <= auction.currentPrice) {
      return
    }

    setIsBidding(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    const newBid: Bid = {
      id: Date.now().toString(),
      amount: parseFloat(bidAmount),
      bidder: {
        id: session?.user?.id || 'guest',
        name: session?.user?.name || 'Ty'
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
  }

  const minBidAmount = auction.currentPrice + 100
  const formatEur = (value: number) => `${value.toLocaleString('pl-PL')} EUR`
  const formatPrice = (value: number) => {
    if (currencyStore.currency === 'EUR') {
      const eur = Math.round(value / currencyStore.ratePLNperEUR)
      return `${eur.toLocaleString('pl-PL')} EUR`
    }
    return `${value.toLocaleString('pl-PL')} PLN`
  }

  const renderBiddingPanel = () => {
    if (sessionStatus === 'loading') {
      return <div className="text-center p-4">Ładowanie...</div>
    }

    if (sessionStatus === 'unauthenticated' || !session?.user.isPhoneVerified) {
      return (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <ShieldAlert className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                {sessionStatus === 'unauthenticated'
                  ? 'Musisz być zalogowany, aby licytować.'
                  : 'Wymagana jest weryfikacja numeru telefonu.'}
                <Link
                  href={sessionStatus === 'unauthenticated' ? '/auth/signin' : '/settings/profile'}
                  className="font-medium underline text-yellow-800 hover:text-yellow-900 ml-2"
                >
                  {sessionStatus === 'unauthenticated' ? 'Zaloguj się' : 'Zweryfikuj numer'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Twoja oferta (min. {formatPrice(minBidAmount)})
          </label>
          <input
            type="number"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            min={minBidAmount}
            step="50"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            placeholder="Wprowadź kwotę"
          />
        </div>

        <button
          onClick={handleBid}
          disabled={!bidAmount || parseFloat(bidAmount) < minBidAmount || isBidding}
          className="w-full bg-slate-600 text-white py-3 px-4 rounded-md font-medium hover:bg-slate-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isBidding ? 'Licytuję...' : 'Złóż ofertę'}
        </button>

        {auction.buyNowPrice && (
          <button
            onClick={handleBuyNow}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 transition-colors"
          >
            Kup teraz za {formatPrice(auction.buyNowPrice)}
          </button>
        )}
      </div>
    )
  }

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
              <div className="relative bg-white h-[420px] sm:h-[500px] md:h-[560px] lg:h-[640px] xl:h-[720px]">
                <Image
                  src={auction.images[0]}
                  alt={auction.title}
                  fill
                  className="object-contain p-4 md:p-6"
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

            {/* Rodowód */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Rodowód</h2>
              <div className="relative w-full border rounded-md overflow-hidden bg-gray-100">
                <Image src={auction.images[0]} alt={`${auction.title} pedigree`} width={1600} height={900} className="w-full h-auto object-contain" />
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

          {/* Prawa kolumna */}
          <div className="space-y-6">
            {/* Odliczanie + Oferty */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-sm p-6 sticky top-6"
            >
              {/* Countdown */}
              <div className="text-center mb-6">
                <div className="text-sm text-gray-600">Pozostało czasu</div>
                <div className={`text-2xl font-bold ${auction.status === 'ending' ? 'text-red-600' : 'text-gray-900'}`}>{timeLeft || '—'}</div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-4">Oferty</h3>
              <div className="space-y-4">
                {auction.bids.slice(0, 5).map((bid) => (
                  <div key={bid.id} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500"></span>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500">
                        {format(bid.timestamp, 'dd MMM • HH:mm', { locale: pl })}
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold">{formatPrice(bid.amount)}</span>
                        <span className="text-gray-500"> od {bid.bidder.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors">
                Pokaż wszystkie oferty
              </button>
            </motion.div>

            {/* Breeder/Supplier */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h4 className="text-sm font-semibold text-gray-900">Breeder(s)</h4>
              <p className="text-sm text-gray-600 mt-1">{auction.seller.name}</p>
              <div className="h-px bg-gray-200 my-4" />
              <h4 className="text-sm font-semibold text-gray-900">Supplier(s)</h4>
              <p className="text-sm text-gray-600 mt-1">{auction.seller.name}</p>
            </motion.div>

            {/* Wyłącznie na PIPA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Wyłącznie na PIPA</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Gołębie oferowane na tej aukcji pochodzą bezpośrednio od sprzedawcy i nie są oferowane przez niego na innych portalach.
              </p>
            </motion.div>

            {/* Charakterystyka */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Charakterystyka</h4>
              <dl className="grid grid-cols-2 gap-y-2 text-sm">
                <dt className="text-gray-500">Płeć</dt><dd className="text-gray-900">{auction.sex === 'male' ? 'Samiec' : 'Samica'}</dd>
                <dt className="text-gray-500">Kolor oka</dt><dd className="text-gray-900">żółty</dd>
                <dt className="text-gray-500">Barwa gołębia</dt><dd className="text-gray-900">szpak</dd>
                <dt className="text-gray-500">Dyscypliny</dt><dd className="text-gray-900">krótki dystans, średni dystans</dd>
                <dt className="text-gray-500">Certyfikat DNA</dt><dd className="text-gray-900">Oboje rodziców</dd>
              </dl>
            </motion.div>

            {/* PPQC */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h4 className="text-sm font-semibold text-gray-900 mb-3">PPQC</h4>
              <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Ogólny opis</h5>
              <div className="text-sm divide-y">
                {[
                  ['Wielkość', 'średni'],
                  ['Budowa korpusu', 'normalny'],
                  ['Witalność', 'silny'],
                  ['Gęstość barwy', 'bardzo silny'],
                  ['Długość', 'średni'],
                  ['Wytrzymałość', 'silny'],
                  ['Siła widełek', 'silny'],
                  ['Układ widełek', 'lekko otwarty'],
                  ['Mięśnie', 'giętki'],
                  ['Balans', 'zbalansowany'],
                  ['Plecy', 'przeciętny']
                ].map(([label, value]) => (
                  <div key={label as string} className="flex items-center justify-between py-1.5">
                    <span className="text-gray-600">{label as string}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-medium">{value as string}</span>
                      <span className="h-3 w-3 rounded-full bg-sky-500" aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </div>

              <h5 className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Opis skrzydła</h5>
              <div className="text-sm divide-y">
                {[
                  ['Pióra rozpłodowe', 'za młody'],
                  ['Lotki', 'długi, normalny'],
                  ['Upierzenie', 'normalne upierzenie'],
                  ['Jakość piór', 'miękki'],
                  ['Lotki II-go rzędu', 'normalny'],
                  ['Elastyczność', 'bardzo giętki']
                ].map(([label, value]) => (
                  <div key={label as string} className="flex items-center justify-between py-1.5">
                    <span className="text-gray-600">{label as string}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-medium">{value as string}</span>
                      <span className="h-3 w-3 rounded-full bg-sky-500" aria-hidden="true" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t text-xs text-gray-600 flex items-center justify-between">
                <span>Kontrola Jakości PIPA</span>
                <span className="text-gray-900 font-medium">{format(new Date(), 'dd/MM/yyyy HH:mm', { locale: pl })}</span>
              </div>
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

      {/* Sticky bottom bar - latest bid */}
      <div className="fixed inset-x-0 bottom-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-4 rounded-md bg-gray-900 text-white px-4 py-2 text-sm flex items-center justify-between">
            <span className="opacity-80">Latest bid</span>
            <span className="font-semibold">{formatEur(auction.currentPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}