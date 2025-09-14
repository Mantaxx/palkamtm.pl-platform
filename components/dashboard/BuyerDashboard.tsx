'use client'

import PaymentManagement from '@/components/payments/PaymentManagement'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { motion } from 'framer-motion'
import {
    Bell,
    CreditCard,
    Eye,
    Filter,
    Gavel,
    Heart,
    Lock,
    MapPin,
    Package,
    Search,
    Settings,
    ShoppingCart,
    TrendingUp,
    Trophy,
    User
} from 'lucide-react'
import { useState } from 'react'

// Mock data - w rzeczywistej aplikacji dane będą pobierane z API
const mockData = {
    watchlist: [
        {
            id: 1,
            title: 'Thunder Storm - Champion Międzynarodowy',
            currentPrice: 2500,
            endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 dni
            image: '/api/placeholder/200/150',
            bids: 15,
        },
        {
            id: 2,
            title: 'Golden Eagle - Linia Janssen',
            currentPrice: 1800,
            endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 dni
            image: '/api/placeholder/200/150',
            bids: 8,
        },
    ],
    recentBids: [
        {
            id: 1,
            auctionTitle: 'Silver Arrow - Mistrz Polski',
            bidAmount: 3200,
            isWinning: true,
            timeLeft: '1 dzień 5 godzin',
            image: '/api/placeholder/100/100',
        },
        {
            id: 2,
            auctionTitle: 'Storm King - Linia Van Loon',
            bidAmount: 2100,
            isWinning: false,
            timeLeft: '3 dni 2 godziny',
            image: '/api/placeholder/100/100',
        },
    ],
    purchaseHistory: [
        {
            id: 1,
            title: 'Lightning Bolt - Champion Europy',
            purchasePrice: 4500,
            purchaseDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            status: 'delivered',
            image: '/api/placeholder/100/100',
        },
        {
            id: 2,
            title: 'Wind Dancer - Mistrzyni Długodystansowa',
            purchasePrice: 3800,
            purchaseDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
            status: 'shipped',
            image: '/api/placeholder/100/100',
        },
    ],
    statistics: {
        totalSpent: 8300,
        auctionsWon: 2,
        watchlistItems: 5,
        activeBids: 3,
    }
}

export function BuyerDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'watchlist' | 'bids' | 'history' | 'payments' | 'settings'>('overview')

    const tabs = [
        { id: 'overview', label: 'Przegląd', icon: TrendingUp },
        { id: 'watchlist', label: 'Obserwowane', icon: Heart },
        { id: 'bids', label: 'Moje Oferty', icon: Gavel },
        { id: 'payments', label: 'Płatności', icon: CreditCard },
        { id: 'history', label: 'Historia', icon: Package },
        { id: 'settings', label: 'Ustawienia', icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-display font-bold text-2xl text-gray-900">
                                Panel Kupującego
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Zarządzaj swoimi aukcjami i zakupami
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors">
                                <Bell className="w-6 h-6" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                    3
                                </span>
                            </button>
                            <button className="btn-primary">
                                Nowa Aukcja
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${activeTab === tab.id
                                    ? 'border-primary-500 text-primary-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        {/* Statistics Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                {
                                    title: 'Wydane Łącznie',
                                    value: `${mockData.statistics.totalSpent.toLocaleString()} zł`,
                                    icon: ShoppingCart,
                                    color: 'from-blue-500 to-blue-600'
                                },
                                {
                                    title: 'Wygrane Aukcje',
                                    value: mockData.statistics.auctionsWon.toString(),
                                    icon: Trophy,
                                    color: 'from-yellow-500 to-yellow-600'
                                },
                                {
                                    title: 'Obserwowane',
                                    value: mockData.statistics.watchlistItems.toString(),
                                    icon: Heart,
                                    color: 'from-red-500 to-red-600'
                                },
                                {
                                    title: 'Aktywne Oferty',
                                    value: mockData.statistics.activeBids.toString(),
                                    icon: Gavel,
                                    color: 'from-green-500 to-green-600'
                                },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                        </div>
                                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                                            <stat.icon className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Watchlist */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-display font-bold text-xl text-gray-900">
                                        Obserwowane Aukcje
                                    </h3>
                                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                                        Zobacz wszystkie
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {mockData.watchlist.map((item) => (
                                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                                                <span className="text-primary-600 font-bold text-sm">TS</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 text-sm">{item.title}</h4>
                                                <p className="text-primary-600 font-semibold">{item.currentPrice.toLocaleString()} zł</p>
                                                <p className="text-gray-500 text-xs">
                                                    {item.bids} ofert • Kończy się {format(item.endTime, 'dd MMM', { locale: pl })}
                                                </p>
                                            </div>
                                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                                <Heart className="w-5 h-5 fill-current" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Bids */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-display font-bold text-xl text-gray-900">
                                        Ostatnie Oferty
                                    </h3>
                                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                                        Zobacz wszystkie
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {mockData.recentBids.map((bid) => (
                                        <div key={bid.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                                            <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                                                <span className="text-primary-600 font-bold text-sm">SA</span>
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-gray-900 text-sm">{bid.auctionTitle}</h4>
                                                <p className="text-primary-600 font-semibold">{bid.bidAmount.toLocaleString()} zł</p>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`text-xs px-2 py-1 rounded-full ${bid.isWinning
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-yellow-100 text-yellow-800'
                                                        }`}>
                                                        {bid.isWinning ? 'Wygrywasz' : 'Przegrywasz'}
                                                    </span>
                                                    <span className="text-gray-500 text-xs">{bid.timeLeft}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'watchlist' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display font-bold text-xl text-gray-900">
                                    Obserwowane Aukcje
                                </h3>
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Szukaj aukcji..."
                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                        <Filter className="w-4 h-4" />
                                        <span>Filtry</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mockData.watchlist.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                                        <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                                            <span className="text-primary-600 font-bold text-lg">Zdjęcie</span>
                                        </div>
                                        <div className="p-4">
                                            <h4 className="font-medium text-gray-900 mb-2">{item.title}</h4>
                                            <p className="text-primary-600 font-semibold text-lg mb-2">
                                                {item.currentPrice.toLocaleString()} zł
                                            </p>
                                            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                                <span>{item.bids} ofert</span>
                                                <span>Kończy się {format(item.endTime, 'dd MMM', { locale: pl })}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="flex-1 btn-primary text-sm py-2">
                                                    Licytuj
                                                </button>
                                                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <Heart className="w-4 h-4 fill-current text-red-500" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'bids' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-display font-bold text-xl text-gray-900 mb-6">
                                Moje Oferty
                            </h3>

                            <div className="space-y-4">
                                {mockData.recentBids.map((bid) => (
                                    <div key={bid.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                                            <span className="text-primary-600 font-bold">SA</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{bid.auctionTitle}</h4>
                                            <p className="text-primary-600 font-semibold text-lg">
                                                {bid.bidAmount.toLocaleString()} zł
                                            </p>
                                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                <span>Złożona: {format(new Date(), 'dd MMM yyyy', { locale: pl })}</span>
                                                <span>Pozostało: {bid.timeLeft}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${bid.isWinning
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {bid.isWinning ? 'Wygrywasz' : 'Przegrywasz'}
                                            </div>
                                            <div className="mt-2">
                                                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                                                    Zwiększ ofertę
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'history' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-display font-bold text-xl text-gray-900 mb-6">
                                Historia Zakupów
                            </h3>

                            <div className="space-y-4">
                                {mockData.purchaseHistory.map((purchase) => (
                                    <div key={purchase.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                                        <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
                                            <span className="text-primary-600 font-bold">LB</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{purchase.title}</h4>
                                            <p className="text-primary-600 font-semibold text-lg">
                                                {purchase.purchasePrice.toLocaleString()} zł
                                            </p>
                                            <p className="text-gray-500 text-sm">
                                                Zakup: {format(purchase.purchaseDate, 'dd MMMM yyyy', { locale: pl })}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${purchase.status === 'delivered'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {purchase.status === 'delivered' ? 'Dostarczone' : 'Wysłane'}
                                            </div>
                                            <div className="mt-2">
                                                <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                                                    Szczegóły
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Payments Tab */}
                {activeTab === 'payments' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
                    >
                        <PaymentManagement />
                    </motion.div>
                )}

                {/* Settings Tab */}
                {activeTab === 'settings' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        <UserSettings />
                    </motion.div>
                )}
            </div>
        </div>
    )
}

// Komponent ustawień użytkownika
function UserSettings() {
    const [activeSettingsTab, setActiveSettingsTab] = useState<'profile' | 'password' | 'contact'>('profile')
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    // Stan formularzy
    const [profileData, setProfileData] = useState({
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan.kowalski@example.com'
    })

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    const [contactData, setContactData] = useState({
        address: 'ul. Przykładowa 123',
        city: 'Lubań',
        postalCode: '59-800',
        phoneNumber: '+48 123 456 789'
    })

    const settingsTabs = [
        { id: 'profile', label: 'Profil', icon: User },
        { id: 'password', label: 'Hasło', icon: Lock },
        { id: 'contact', label: 'Kontakt', icon: MapPin },
    ]

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        try {
            // Symulacja API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            setMessage({ type: 'success', text: 'Profil został zaktualizowany' })
        } catch (error) {
            setMessage({ type: 'error', text: 'Błąd podczas aktualizacji profilu' })
        } finally {
            setIsLoading(false)
        }
    }

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: 'error', text: 'Hasła nie są identyczne' })
            setIsLoading(false)
            return
        }

        if (passwordData.newPassword.length < 8) {
            setMessage({ type: 'error', text: 'Hasło musi mieć co najmniej 8 znaków' })
            setIsLoading(false)
            return
        }

        try {
            // Symulacja API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            setMessage({ type: 'success', text: 'Hasło zostało zmienione' })
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        } catch (error) {
            setMessage({ type: 'error', text: 'Błąd podczas zmiany hasła' })
        } finally {
            setIsLoading(false)
        }
    }

    const handleContactUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setMessage(null)

        // Walidacja numeru telefonu
        const phoneRegex = /^(\+48\s?)?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/
        if (!phoneRegex.test(contactData.phoneNumber)) {
            setMessage({ type: 'error', text: 'Nieprawidłowy format numeru telefonu' })
            setIsLoading(false)
            return
        }

        // Walidacja kodu pocztowego
        const postalCodeRegex = /^[0-9]{2}-[0-9]{3}$/
        if (!postalCodeRegex.test(contactData.postalCode)) {
            setMessage({ type: 'error', text: 'Nieprawidłowy format kodu pocztowego (XX-XXX)' })
            setIsLoading(false)
            return
        }

        try {
            // Symulacja API call
            await new Promise(resolve => setTimeout(resolve, 1000))
            setMessage({ type: 'success', text: 'Dane kontaktowe zostały zaktualizowane' })
        } catch (error) {
            setMessage({ type: 'error', text: 'Błąd podczas aktualizacji danych kontaktowych' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="font-display font-bold text-2xl text-gray-900 mb-2">
                    Ustawienia Konta
                </h2>
                <p className="text-gray-600">
                    Zarządzaj swoimi danymi osobowymi, hasłem i informacjami kontaktowymi
                </p>
            </div>

            {/* Settings Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="border-b border-gray-200">
                    <div className="flex space-x-8 px-6">
                        {settingsTabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveSettingsTab(tab.id as any)}
                                className={`flex items-center space-x-2 py-4 border-b-2 font-medium transition-colors ${activeSettingsTab === tab.id
                                        ? 'border-primary-500 text-primary-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <tab.icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="p-6">
                    {/* Message */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-lg ${message.type === 'success'
                                ? 'bg-green-50 text-green-800 border border-green-200'
                                : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                            {message.text}
                        </div>
                    )}

                    {/* Profile Tab */}
                    {activeSettingsTab === 'profile' && (
                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Imię *
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.firstName}
                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nazwisko *
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.lastName}
                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Password Tab */}
                    {activeSettingsTab === 'password' && (
                        <form onSubmit={handlePasswordChange} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Aktualne hasło *
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.currentPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nowe hasło *
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    required
                                    minLength={8}
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Hasło musi mieć co najmniej 8 znaków
                                </p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Potwierdź nowe hasło *
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Zmienianie...' : 'Zmień hasło'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Contact Tab */}
                    {activeSettingsTab === 'contact' && (
                        <form onSubmit={handleContactUpdate} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Adres *
                                </label>
                                <input
                                    type="text"
                                    value={contactData.address}
                                    onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Miasto *
                                    </label>
                                    <input
                                        type="text"
                                        value={contactData.city}
                                        onChange={(e) => setContactData({ ...contactData, city: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Kod pocztowy *
                                    </label>
                                    <input
                                        type="text"
                                        value={contactData.postalCode}
                                        onChange={(e) => setContactData({ ...contactData, postalCode: e.target.value })}
                                        placeholder="XX-XXX"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        required
                                        pattern="[0-9]{2}-[0-9]{3}"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Numer telefonu *
                                </label>
                                <input
                                    type="tel"
                                    value={contactData.phoneNumber}
                                    onChange={(e) => setContactData({ ...contactData, phoneNumber: e.target.value })}
                                    placeholder="+48 123 456 789"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    required
                                />
                                <p className="text-sm text-gray-500 mt-1">
                                    Format: +48 123 456 789 lub 123 456 789
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? 'Zapisywanie...' : 'Zapisz zmiany'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
