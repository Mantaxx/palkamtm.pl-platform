'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { Calendar, Mail, Settings, Shield, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ProfilePage() {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState('profile')

    if (!user) {
        return (
            <UnifiedLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-white mb-4">Nie jesteś zalogowany</h1>
                        <Link
                            href="/auth/signin"
                            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
                        >
                            Zaloguj się
                        </Link>
                    </div>
                </div>
            </UnifiedLayout>
        )
    }

    const tabs = [
        { id: 'profile', label: 'Profil', icon: User },
        { id: 'security', label: 'Bezpieczeństwo', icon: Shield },
        { id: 'settings', label: 'Ustawienia', icon: Settings }
    ]

    return (
        <UnifiedLayout>
            <div className="min-h-screen pt-20 pl-80 pr-8 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">Mój Profil</h1>
                        <p className="text-white/70">Zarządzaj swoim kontem i ustawieniami</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-1 mb-8 bg-white/10 rounded-xl p-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${activeTab === tab.id
                                        ? 'bg-blue-600 text-white'
                                        : 'text-white/70 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            )
                        })}
                    </div>

                    {/* Content */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
                        {activeTab === 'profile' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl font-bold text-white mb-6">Informacje Profilowe</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-white/70 text-sm mb-2">Imię i Nazwisko</label>
                                            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                                                <User className="w-5 h-5 text-white/50" />
                                                <span className="text-white">{user.displayName || 'Nie ustawiono'}</span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-white/70 text-sm mb-2">Email</label>
                                            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                                                <Mail className="w-5 h-5 text-white/50" />
                                                <span className="text-white">{user.email}</span>
                                                {user.emailVerified && (
                                                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                                        Zweryfikowany
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-white/70 text-sm mb-2">Data utworzenia konta</label>
                                            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                                                <Calendar className="w-5 h-5 text-white/50" />
                                                <span className="text-white">
                                                    {user.metadata?.creationTime ?
                                                        new Date(user.metadata.creationTime).toLocaleDateString('pl-PL') :
                                                        'Nieznana'
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-white/70 text-sm mb-2">Ostatnie logowanie</label>
                                            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                                                <Calendar className="w-5 h-5 text-white/50" />
                                                <span className="text-white">
                                                    {user.metadata?.lastSignInTime ?
                                                        new Date(user.metadata.lastSignInTime).toLocaleDateString('pl-PL') :
                                                        'Nieznane'
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-white/70 text-sm mb-2">Status konta</label>
                                            <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                                                <Shield className="w-5 h-5 text-white/50" />
                                                <span className="text-white">Aktywne</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'security' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl font-bold text-white mb-6">Bezpieczeństwo</h2>

                                <div className="space-y-6">
                                    <div className="p-6 bg-white/5 rounded-xl">
                                        <h3 className="text-lg font-semibold text-white mb-3">Weryfikacja Email</h3>
                                        <p className="text-white/70 mb-4">
                                            {user.emailVerified
                                                ? 'Twój email jest zweryfikowany i bezpieczny.'
                                                : 'Zweryfikuj swój email, aby zwiększyć bezpieczeństwo konta.'
                                            }
                                        </p>
                                        {!user.emailVerified && (
                                            <Link
                                                href="/auth/verify-email"
                                                className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                            >
                                                Zweryfikuj Email
                                            </Link>
                                        )}
                                    </div>

                                    <div className="p-6 bg-white/5 rounded-xl">
                                        <h3 className="text-lg font-semibold text-white mb-3">Zmiana Hasła</h3>
                                        <p className="text-white/70 mb-4">
                                            Regularnie zmieniaj hasło, aby zachować bezpieczeństwo konta.
                                        </p>
                                        <Link
                                            href="/auth/reset-password"
                                            className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                                        >
                                            Zmień Hasło
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl font-bold text-white mb-6">Ustawienia</h2>

                                <div className="space-y-6">
                                    <div className="p-6 bg-white/5 rounded-xl">
                                        <h3 className="text-lg font-semibold text-white mb-3">Powiadomienia</h3>
                                        <p className="text-white/70 mb-4">
                                            Zarządzaj powiadomieniami email i SMS.
                                        </p>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded" defaultChecked />
                                                <span className="text-white">Powiadomienia o nowych aukcjach</span>
                                            </label>
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded" defaultChecked />
                                                <span className="text-white">Powiadomienia o wygranych aukcjach</span>
                                            </label>
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded" />
                                                <span className="text-white">Powiadomienia marketingowe</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white/5 rounded-xl">
                                        <h3 className="text-lg font-semibold text-white mb-3">Prywatność</h3>
                                        <p className="text-white/70 mb-4">
                                            Kontroluj, jakie informacje są widoczne dla innych użytkowników.
                                        </p>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded" defaultChecked />
                                                <span className="text-white">Pokaż mój profil w wynikach wyszukiwania</span>
                                            </label>
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="rounded" />
                                                <span className="text-white">Pokaż moje aktywności</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </UnifiedLayout>
    )
}
