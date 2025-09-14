'use client'

import { motion } from 'framer-motion'
import { Clock, Eye, Gavel, Heart, Plus, Star, Users } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Pusta lista aukcji - dane będą pobierane z localStorage lub API
const getAuctions = () => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('auctions')
        return stored ? JSON.parse(stored) : []
    }
    return []
}

export function AuctionsPage() {
    const { data: session, status } = useSession()
    const [auctions, setAuctions] = useState<any[]>([])

    useEffect(() => {
        setAuctions(getAuctions())
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="font-display font-bold text-4xl lg:text-5xl mb-6"
                    >
                        Aukcje Gołębi Pocztowych
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-primary-100 max-w-3xl mx-auto"
                    >
                        Platforma do organizowania aukcji wyjątkowych championów
                    </motion.p>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Create Auction Panel */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-12"
                >
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Utwórz Nową Aukcję
                                </h2>
                                <p className="text-gray-600">
                                    Dodaj swojego championa do aukcji i znajdź najlepszego kupca
                                </p>
                            </div>
                            {session ? (
                                <Link
                                    href="/seller/create-auction"
                                    className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Utwórz Aukcję
                                </Link>
                            ) : (
                                <Link
                                    href="/auth/signin"
                                    className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Zaloguj się, aby utworzyć aukcję
                                </Link>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-primary-600 mb-1">
                                    {auctions.length}
                                </div>
                                <div className="text-sm text-gray-600">Aktywne Aukcje</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-primary-600 mb-1">
                                    0
                                </div>
                                <div className="text-sm text-gray-600">Zakończone</div>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-bold text-primary-600 mb-1">
                                    0
                                </div>
                                <div className="text-sm text-gray-600">Sprzedane</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Auctions List */}
                {auctions.length > 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Aktywne Aukcje
                            </h3>
                            <Link
                                href="/seller/dashboard"
                                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                            >
                                Zarządzaj Aukcjami
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {auctions.map((auction, index) => (
                                <motion.div
                                    key={auction.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                                >
                                    {/* Image */}
                                    <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                        <Gavel className="w-16 h-16 text-primary-600" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h4 className="font-semibold text-gray-900 mb-2">
                                            {auction.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {auction.description}
                                        </p>

                                        {/* Details */}
                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <Clock className="w-4 h-4 mr-2 text-primary-600" />
                                                <span>Kończy się: {new Date(auction.endTime).toLocaleString('pl-PL')}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 text-sm">
                                                <Users className="w-4 h-4 mr-2 text-primary-600" />
                                                <span>{auction.bids || 0} ofert</span>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center justify-between">
                                            <Link
                                                href={`/auctions/${auction.id}`}
                                                className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                                            >
                                                Zobacz Aukcję
                                            </Link>
                                            <div className="flex items-center space-x-2">
                                                <button
                                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                                    aria-label="Zobacz szczegóły"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button
                                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                    aria-label="Dodaj do ulubionych"
                                                >
                                                    <Heart className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    /* Empty State */
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center py-20"
                    >
                        <div className="max-w-md mx-auto">
                            {/* Icon */}
                            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gavel className="w-12 h-12 text-primary-600" />
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Brak aktywnych aukcji
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 mb-8">
                                Obecnie nie ma żadnych aktywnych aukcji. Utwórz pierwszą aukcję,
                                aby rozpocząć sprzedaż swoich championów.
                            </p>

                            {/* Action Button */}
                            {session ? (
                                <Link
                                    href="/seller/create-auction"
                                    className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Utwórz Pierwszą Aukcję
                                </Link>
                            ) : (
                                <Link
                                    href="/auth/signin"
                                    className="inline-flex items-center bg-gray-600 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Zaloguj się, aby utworzyć aukcję
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Features Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-20"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Jak działa nasza platforma aukcyjna?
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Prosty i intuicyjny system aukcyjny dla hodowców gołębi pocztowych
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Plus className="w-8 h-8 text-primary-600" />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Utwórz Aukcję
                            </h4>
                            <p className="text-gray-600">
                                Dodaj zdjęcia, opisy i szczegóły swojego championa w prostym formularzu
                            </p>
                        </div>

                        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="w-8 h-8 text-primary-600" />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Otrzymaj Oferty
                            </h4>
                            <p className="text-gray-600">
                                Hodowcy z całej Polski mogą składać oferty na Twoje gołębie
                            </p>
                        </div>

                        <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="w-8 h-8 text-primary-600" />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">
                                Sprzedaj Championa
                            </h4>
                            <p className="text-gray-600">
                                Wybierz najlepszą ofertę i sfinalizuj sprzedaż swojego championa
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}