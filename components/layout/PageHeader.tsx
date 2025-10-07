'use client'

import { Text3D } from '@/components/ui/Text3D'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Breadcrumb {
    name: string
    href?: string
}

interface PageHeaderProps {
    title: string
    breadcrumbs: Breadcrumb[]
}

export function PageHeader({ title }: PageHeaderProps) {
    const { user, signOut } = useAuth()
    const [showUserMenu, setShowUserMenu] = useState(false)

    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative z-10 w-full px-2 py-2"
        >
            {/* Kafle sterowania - menu */}
            <div className="flex flex-wrap justify-center gap-2 mb-6 w-full">
                <Link href="/" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                    <i className="fas fa-home mr-2 text-2xl" /> Strona Główna
                </Link>
                <Link href="/auctions" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                    <i className="fas fa-gavel mr-2 text-2xl" /> Aukcje
                </Link>
                <Link href="/achievements" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                    <i className="fas fa-crown mr-2 text-2xl" /> Osiągnięcia
                </Link>
                <Link href="/champions" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                    <i className="fas fa-trophy mr-2 text-2xl" /> Championy
                </Link>
                <Link href="/breeder-meetings" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                    <i className="fas fa-users mr-2 text-2xl" /> Spotkania
                </Link>
                <Link href="/references" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                    <i className="fas fa-book mr-2 text-2xl" /> Referencje
                </Link>
                <Link href="/press" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                    <i className="fas fa-newspaper mr-2 text-2xl" /> Prasa
                </Link>
                <Link href="/about" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                    <i className="fas fa-info-circle mr-2 text-2xl" /> O Nas
                </Link>
                <Link href="/contact" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                    <i className="fas fa-envelope mr-2 text-2xl" /> Kontakt
                </Link>

                {/* Kafle użytkownika */}
                {user ? (
                    <>
                        <Link href="/dashboard" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                            <i className="fas fa-user mr-2 text-2xl" /> Konto
                        </Link>
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-blue-600/80 hover:bg-blue-700/80 text-white rounded-xl backdrop-blur-sm border border-blue-500/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md"
                            >
                                <User className="w-4 h-4 mr-2" />
                                {user.displayName || 'Użytkownik'}
                            </button>

                            {showUserMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-2 z-50"
                                >
                                    <Link
                                        href="/profile"
                                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <Settings className="w-4 h-4 text-white/70" />
                                        <span className="text-white/70">Ustawienia</span>
                                    </Link>
                                    <button
                                        onClick={signOut}
                                        className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500/20 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4 text-red-400" />
                                        <span className="text-red-400">Wyloguj się</span>
                                    </button>
                                </motion.div>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Link href="/auth/signin" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-blue-600/80 hover:bg-blue-700/80 text-white rounded-xl backdrop-blur-sm border border-blue-500/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                            <i className="fas fa-sign-in-alt mr-2 text-2xl" /> Zaloguj się
                        </Link>
                        <Link href="/auth/signup" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                            <i className="fas fa-user-plus mr-2 text-2xl" /> Zarejestruj się
                        </Link>
                    </>
                )}
            </div>

            <Text3D variant="neon" intensity="high" className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-2">
                {title}
            </Text3D>
        </motion.header>
    )
}