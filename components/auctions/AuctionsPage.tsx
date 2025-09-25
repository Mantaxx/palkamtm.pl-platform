'use client'

import CreateAuctionForm from '@/components/auctions/CreateAuctionForm'
import { UnifiedButton } from '@/components/ui/UnifiedButton'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { AUCTIONS_DATA } from '@/lib/data/auctions'
import { useAppStore, useError, useFilteredAuctions, useLoading } from '@/store/useAppStore'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Gavel, Plus, Search } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function AuctionsPage() {
    const { data: session } = useSession()
    const { setAuctions, setSearchTerm, setLoading, setError, searchTerm } = useAppStore()
    const filteredAuctions = useFilteredAuctions()
    const isLoading = useLoading()
    const error = useError()
    const [filterStatus, setFilterStatus] = useState<'all' | 'ACTIVE' | 'ENDED' | 'CANCELLED' | 'PENDING'>('all')
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [nowTs, setNowTs] = useState<number>(Date.now())

    useEffect(() => {
        // Load auctions data
        setLoading(true)
        try {
            setAuctions(AUCTIONS_DATA)
        } catch (err) {
            setError('Błąd podczas ładowania aukcji')
        } finally {
            setLoading(false)
        }
    }, [setAuctions, setLoading, setError])

    // Live ticking for countdowns
    useEffect(() => {
        const interval = setInterval(() => setNowTs(Date.now()), 1000)
        return () => clearInterval(interval)
    }, [])

    const formatTimeLeft = (endTimeStr: string) => {
        const diff = new Date(endTimeStr).getTime() - nowTs
        if (diff <= 0) return 'Zakończona'
        const days = Math.floor(diff / 86400000)
        const hours = Math.floor((diff % 86400000) / 3600000)
        const minutes = Math.floor((diff % 3600000) / 60000)
        const seconds = Math.floor((diff % 60000) / 1000)
        if (days > 0) return `${days}d ${hours}h ${minutes}m`
        if (hours > 0) return `${hours}h ${minutes}m`
        return `${minutes}m ${seconds}s`
    }

    const isEndingSoon = (endTimeStr: string) => {
        const diff = new Date(endTimeStr).getTime() - nowTs
        return diff > 0 && diff <= 3600000 // < 1h
    }

    // Filter by status
    const statusFilteredAuctions = filteredAuctions.filter(auction =>
        filterStatus === 'all' || auction.status === filterStatus
    )

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden">
                {/* Tło z animowanymi elementami */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                </div>

                <UnifiedCard
                    variant="3d"
                    glow={true}
                    className="p-12 text-center border-2 border-white/20 backdrop-blur-xl relative z-10 shadow-2xl"
                >
                    <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full mx-auto animate-spin mb-8" />
                    <h2 className="text-2xl font-bold text-white mb-2">Ładowanie aukcji...</h2>
                    <p className="text-gray-300">Przygotowujemy najlepsze oferty dla Ciebie</p>
                </UnifiedCard>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <UnifiedCard variant="glass" className="p-8 text-center border-2 border-white shadow-xl">
                    <p className="text-lg mb-4 text-red-400">
                        {error}
                    </p>
                    <UnifiedButton
                        variant="primary"
                        onClick={() => window.location.reload()}
                        intensity="high"
                    >
                        Spróbuj ponownie
                    </UnifiedButton>
                </UnifiedCard>
            </div>
        )
    }

    return (
        <>
            <div className="pt-8 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="w-full mx-auto text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Aukcje Gołębi
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
                        Licytuj ekskluzywne gołębie pocztowe z rodowodami championów
                    </p>
                </div>

                {/* Content */}
                <div className="relative z-10 px-2 sm:px-4 lg:px-6 xl:px-8 2xl:px-12">
                    <div className="w-full">
                        {/* Filters */}
                        <motion.section
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="mb-12"
                        >
                            <UnifiedCard variant="glass" className="p-6 border-2 border-white shadow-xl">
                                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                                    {/* Search */}
                                    <motion.div
                                        className="relative flex-1 max-w-md group"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    >
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 z-10" />
                                        <input
                                            type="text"
                                            placeholder="Szukaj gołębi..."
                                            aria-label="Szukaj gołębi"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 solid-morphism rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 relative overflow-hidden group-hover:glass-morphism-strong border-2 border-white"
                                        />
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-2xl"></div>
                                    </motion.div>

                                    {/* Status Filter */}
                                    <div className="flex gap-2">
                                        {['all', 'ACTIVE', 'PENDING', 'CANCELLED', 'ENDED'].map((status) => (
                                            <motion.div
                                                key={status}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                            >
                                                <button
                                                    onClick={() => setFilterStatus(status as typeof filterStatus)}
                                                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${filterStatus === status
                                                        ? 'bg-gradient-to-r from-blue-600/80 to-blue-800/80 text-white'
                                                        : 'glass-morphism text-white/70 hover:glass-morphism-strong hover:text-white'
                                                        } relative overflow-hidden`}
                                                >
                                                    {status === 'all' && 'Wszystkie'}
                                                    {status === 'ACTIVE' && 'Aktywne'}
                                                    {status === 'PENDING' && 'Oczekujące'}
                                                    {status === 'CANCELLED' && 'Anulowane'}
                                                    {status === 'ENDED' && 'Zakończone'}
                                                    {filterStatus === status && (
                                                        <motion.div
                                                            layoutId="statusFilter"
                                                            className="absolute inset-0 -z-10 rounded-xl"
                                                            transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
                                                        />
                                                    )}
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Create Auction Button */}
                                    {session?.user?.role === 'SELLER' && (
                                        <Link
                                            href="/seller/create-auction"
                                            className="flex items-center gap-2 btn-primary"
                                            aria-label="Dodaj nową aukcję"
                                        >
                                            <Plus className="w-5 h-5" />
                                            <span>Dodaj aukcję</span>
                                        </Link>
                                    )}
                                </div>
                            </UnifiedCard>
                        </motion.section>

                        {/* Auctions Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-4">
                            {statusFilteredAuctions.length > 0 ? (
                                statusFilteredAuctions.map((auction, index) => (
                                    <motion.div
                                        key={auction.id}
                                        initial={{ opacity: 0, y: 50, rotateY: -10 }}
                                        whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                                        transition={{ duration: 0.8, delay: index * 0.05, type: "spring" }}
                                        viewport={{ once: true, margin: '-100px' }}
                                        className="group"
                                    >
                                        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-all duration-200 hover:shadow-md h-full flex flex-col">
                                            {/* Image */}
                                            <div className="relative w-full h-48 bg-gray-100">
                                                {auction.images?.[0] && (
                                                    <Image src={auction.images[0]} alt={auction.title} fill className="object-contain p-4" />
                                                )}
                                                {/* Status Badge */}
                                                <div className="absolute top-3 left-3">
                                                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium text-white
                                                        ${auction.status === 'ACTIVE' ? 'bg-emerald-600' : ''}
                                                        ${auction.status === 'PENDING' ? 'bg-amber-600' : ''}
                                                        ${auction.status === 'CANCELLED' ? 'bg-gray-500' : ''}
                                                        ${auction.status === 'ENDED' ? 'bg-rose-600' : ''}
                                                    `}>
                                                        {auction.status === 'ACTIVE' && 'Aktywna'}
                                                        {auction.status === 'PENDING' && 'Oczekuje'}
                                                        {auction.status === 'CANCELLED' && 'Anulowana'}
                                                        {auction.status === 'ENDED' && 'Zakończona'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-4 flex flex-col grow">
                                                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2">{auction.title}</h3>
                                                <p className="text-xs text-gray-600 line-clamp-3 mb-3">{auction.description}</p>

                                                <div className="text-xs text-gray-600 space-y-1 mb-4">
                                                    <div>
                                                        <span className="font-medium">Hodowca: </span>
                                                        <span>—</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-medium">Sprzedający: </span>
                                                        <span>{auction.sellerId}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="text-gray-900 font-semibold">
                                                        {`${Math.round(auction.currentPrice / useAppStore.getState().ratePLNperEUR)} EUR`}
                                                    </div>
                                                    <div className={`text-xs flex items-center gap-2 ${isEndingSoon(auction.endTime) ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
                                                        <Calendar className={`w-3.5 h-3.5 ${isEndingSoon(auction.endTime) ? 'text-red-600' : ''}`} />
                                                        <span>{formatTimeLeft(auction.endTime)}</span>
                                                    </div>
                                                </div>

                                                <div className="mt-auto pt-3">
                                                    {auction.status === 'ENDED' ? (
                                                        <Link href={`/auctions/${auction.id}`} className="inline-flex items-center justify-center w-full h-10 rounded-md bg-gray-700 text-white text-sm font-medium">
                                                            Zobacz aukcję
                                                        </Link>
                                                    ) : (
                                                        <div className="flex gap-2">
                                                            <Link href={`/auctions/${auction.id}`} className="inline-flex items-center justify-center flex-1 h-10 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
                                                                Licytuj
                                                            </Link>
                                                            <Link href={`/auctions/${auction.id}`} className="inline-flex items-center justify-center flex-1 h-10 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors">
                                                                Kup teraz
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-3 py-12">
                                    <UnifiedCard variant="glass" className="p-12 text-center">
                                        <Gavel className="w-16 h-16 text-white/30 mx-auto mb-4" />
                                        <h3 className="text-2xl font-semibold mb-2">Brak aukcji</h3>
                                        <p className="text-white/70 mb-6">
                                            Nie znaleziono aukcji spełniających kryteria wyszukiwania.
                                        </p>
                                        <UnifiedButton
                                            variant="secondary"
                                            onClick={() => {
                                                setSearchTerm('')
                                                setFilterStatus('all')
                                            }}
                                        >
                                            Wyczyść filtry
                                        </UnifiedButton>
                                    </UnifiedCard>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {/* Create Auction Modal */}
            <AnimatePresence>
                {showCreateForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center p-4"
                        onClick={() => setShowCreateForm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="w-full max-w-2xl max-h-[90vh] overflow-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <UnifiedCard variant="glass" className="p-6 border-2 border-white shadow-2xl relative">
                                <button
                                    onClick={() => setShowCreateForm(false)}
                                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full glass-morphism text-white/70 hover:text-white hover:glass-morphism-strong"
                                    aria-label="Zamknij"
                                >
                                    ✕
                                </button>
                                <h2 className="text-2xl font-bold mb-6">Dodaj nową aukcję</h2>
                                <CreateAuctionForm onSuccess={() => setShowCreateForm(false)} />
                            </UnifiedCard>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}