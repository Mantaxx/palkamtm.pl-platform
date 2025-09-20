'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { UnifiedButton } from '@/components/ui/UnifiedButton'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { AUCTIONS_DATA } from '@/lib/data/auctions'
import { useAppStore, useError, useFilteredAuctions, useLoading } from '@/store/useAppStore'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, Eye, Gavel, Heart, Plus, Search, Users } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CreateAuctionForm from './CreateAuctionForm'

export function AuctionsPage() {
    const { data: session, status } = useSession()
    const { setAuctions, setSearchTerm, setSortBy, setSelectedCategory, setLoading, setError, searchTerm, sortBy, auctions } = useAppStore()
    const filteredAuctions = useFilteredAuctions()
    const isLoading = useLoading()
    const error = useError()
    const [filterStatus, setFilterStatus] = useState('all')
    const [showCreateForm, setShowCreateForm] = useState(false)

    useEffect(() => {
        // Load auctions data
        setLoading(true)
        try {
            // Transform AuctionData to Auction format
            const transformedAuctions = AUCTIONS_DATA.map(auction => ({
                ...auction,
                seller: {
                    id: auction.sellerId,
                    name: 'Hodowca',
                    avatar: '/api/placeholder/40/40'
                }
            }))
            setAuctions(transformedAuctions)
        } catch (err) {
            setError('Błąd podczas ładowania aukcji')
        } finally {
            setLoading(false)
        }
    }, [setAuctions, setLoading, setError])

    // Filter by status
    const statusFilteredAuctions = filteredAuctions.filter(auction =>
        filterStatus === 'all' || auction.status === filterStatus
    )

    if (isLoading) {
        return (
            <UnifiedLayout>
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
            </UnifiedLayout>
        )
    }

    if (error) {
        return (
            <UnifiedLayout>
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
                className="relative z-10 pt-80 pb-20 px-4 sm:px-6 lg:px-8"
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        Aukcje Gołębi
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
                    >
                        Licytuj ekskluzywne gołębie pocztowe z rodowodami championów
                    </motion.p>
                </div>
            </motion.section>

            {/* Content */}
            <div className="relative z-10 px-2 sm:px-4 lg:px-6 xl:px-8 2xl:px-12 pb-20">
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
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 solid-morphism rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 relative overflow-hidden group-hover:glass-morphism-strong border-2 border-white"
                                    />
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-2xl"></div>
                                </motion.div>

                                {/* Status Filter */}
                                <div className="flex gap-2">
                                    {['all', 'active', 'ending', 'ended'].map((status) => (
                                        <motion.div
                                            key={status}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        >
                                            <UnifiedButton
                                                variant={filterStatus === status ? 'primary' : 'outline'}
                                                size="sm"
                                                onClick={() => setFilterStatus(status)}
                                                intensity="medium"
                                                className="relative overflow-hidden group"
                                            >
                                                <span className="relative z-10">
                                                    {status === 'all' ? 'Wszystkie' :
                                                        status === 'active' ? 'Aktywne' :
                                                            status === 'ending' ? 'Kończące się' : 'Zakończone'}
                                                </span>
                                                {/* Shimmer effect */}
                                                <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                                            </UnifiedButton>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Sort */}
                                <motion.div
                                    className="relative group"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        title="Sortuj według"
                                        className="px-4 py-3 solid-morphism rounded-2xl text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-slate-500/50 transition-all duration-300 relative overflow-hidden group-hover:glass-morphism-strong appearance-none cursor-pointer"
                                    >
                                        <option value="newest">Najnowsze</option>
                                        <option value="ending">Kończące się</option>
                                        <option value="price-high">Cena: od najwyższej</option>
                                        <option value="price-low">Cena: od najniższej</option>
                                    </select>
                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out rounded-2xl"></div>
                                    {/* Custom dropdown arrow */}
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </motion.div>

                                {/* Create Auction Button */}
                                {session?.user?.role === 'SELLER' && (
                                    <UnifiedButton
                                        variant="primary"
                                        size="md"
                                        onClick={() => setShowCreateForm(true)}
                                        intensity="high"
                                        title="Dodaj nową aukcję"
                                        ariaLabel="Dodaj nową aukcję"
                                    >
                                        <Plus className="w-5 h-5 mr-2" />
                                        Dodaj Aukcję
                                    </UnifiedButton>
                                )}
                            </div>
                        </UnifiedCard>
                    </motion.section>

                    {/* Auctions Grid */}
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8 sm:gap-10 xl:gap-12 2xl:gap-16 3xl:gap-20">
                            {statusFilteredAuctions.map((auction, index) => (
                                <motion.div
                                    key={auction.id}
                                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <UnifiedCard variant="glass" className="overflow-hidden border-2 border-white shadow-2xl">
                                        {/* Auction Image */}
                                        <div className="relative h-80 xl:h-96 2xl:h-[28rem] overflow-hidden">
                                            <img
                                                src={auction.images?.[0] || '/api/placeholder/400/300'}
                                                alt={auction.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-4 right-4">
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${auction.status === 'ACTIVE' ? 'bg-green-500/80 text-white' :
                                                    auction.status === 'PENDING' ? 'bg-orange-500/80 text-white' :
                                                        'bg-gray-500/80 text-white'
                                                    }`}>
                                                    {auction.status === 'ACTIVE' ? 'Aktywna' :
                                                        auction.status === 'PENDING' ? 'Oczekuje' : 'Zakończona'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Auction Content */}
                                        <div className="p-8 xl:p-10 2xl:p-12">
                                            <h3 className="text-2xl xl:text-3xl 2xl:text-4xl font-bold text-white mb-3 line-clamp-2">
                                                {auction.title}
                                            </h3>
                                            <p className="text-slate-200 text-base xl:text-lg 2xl:text-xl mb-6 line-clamp-2">
                                                {auction.description}
                                            </p>

                                            {/* Auction Details */}
                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-center text-base xl:text-lg 2xl:text-xl text-white/80">
                                                    <Gavel className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 mr-3 text-slate-400" />
                                                    <span>Obecna cena: <span className="font-semibold text-slate-300">{auction.startingPrice} zł</span></span>
                                                </div>
                                                <div className="flex items-center text-base xl:text-lg 2xl:text-xl text-white/80">
                                                    <Calendar className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 mr-3 text-slate-400" />
                                                    <span>Kończy się: {new Date(auction.endTime).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center text-base xl:text-lg 2xl:text-xl text-white/80">
                                                    <Users className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 mr-3 text-slate-300" />
                                                    <span>0 licytujących</span>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-3">
                                                <Link
                                                    href={`/auctions/${auction.id}`}
                                                    className="flex-1"
                                                >
                                                    <UnifiedButton
                                                        variant="primary"
                                                        size="md"
                                                        intensity="high"
                                                        className="w-full text-base xl:text-lg 2xl:text-xl py-3 xl:py-4 2xl:py-5"
                                                    >
                                                        <Eye className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7 mr-2" />
                                                        Zobacz
                                                    </UnifiedButton>
                                                </Link>
                                                <UnifiedButton
                                                    variant="outline"
                                                    size="md"
                                                    intensity="medium"
                                                    className="px-4 xl:px-5 2xl:px-6 py-3 xl:py-4 2xl:py-5"
                                                >
                                                    <Heart className="w-5 h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
                                                </UnifiedButton>
                                            </div>
                                        </div>
                                    </UnifiedCard>
                                </motion.div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {statusFilteredAuctions.length === 0 && (
                            <UnifiedCard variant="glass" className="p-12 text-center border-2 border-white shadow-2xl">
                                <h2 className="text-2xl font-bold mb-4">
                                    Brak aukcji
                                </h2>
                                <p className="text-white/80 mb-6">
                                    Nie znaleziono aukcji spełniających kryteria wyszukiwania.
                                </p>
                                <UnifiedButton
                                    variant="primary"
                                    onClick={() => {
                                        setSearchTerm('')
                                        setFilterStatus('all')
                                    }}
                                    intensity="high"
                                >
                                    Wyczyść filtry
                                </UnifiedButton>
                            </UnifiedCard>
                        )}
                    </motion.section>
                </div>
            </div>

            {/* Create Auction Modal */}
            <AnimatePresence>
                {showCreateForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                        >
                            <UnifiedCard variant="3d" glow={true} className="p-8 border-2 border-white shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-white">
                                        Dodaj Nową Aukcję
                                    </h2>
                                    <button
                                        onClick={() => setShowCreateForm(false)}
                                        className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
                                        aria-label="Zamknij formularz dodawania aukcji"
                                        title="Zamknij"
                                    >
                                        ×
                                    </button>
                                </div>

                                <CreateAuctionForm
                                    onSuccess={() => {
                                        setShowCreateForm(false)
                                        // Refresh auctions list
                                        window.location.reload()
                                    }}
                                    onCancel={() => setShowCreateForm(false)}
                                />
                            </UnifiedCard>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </UnifiedLayout>
    )
}