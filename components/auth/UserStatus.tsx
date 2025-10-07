'use client'

import { useAuth } from '@/contexts/AuthContext'
import { LogOut, Mail, Phone, Settings, Shield, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function UserStatus() {
    const { user, loading, signOut } = useAuth()
    const [showUserMenu, setShowUserMenu] = useState(false)

    // console.log('UserStatus render:', { user: user?.email, loading })

    if (loading) {
        return (
            <div className="flex items-center gap-2 text-white/70">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="text-sm">Ładowanie...</span>
            </div>
        )
    }

    if (!user) {
        return (
            <div className="flex items-center gap-4">
                <Link
                    href="/auth/signin"
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
                >
                    Zaloguj się
                </Link>
                <Link
                    href="/auth/signup"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
                >
                    Zarejestruj się
                </Link>
            </div>
        )
    }

    return (
        <div className="relative">
            {/* Status zalogowania */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-white/70">Zalogowany</span>
                </div>

                <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 border border-white/20"
                >
                    <User className="w-4 h-4" />
                    <span className="text-sm">{user.displayName || user.email}</span>
                </button>
            </div>

            {/* Menu użytkownika */}
            {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-black/90 backdrop-blur-xl rounded-xl border border-white/20 shadow-2xl z-50">
                    <div className="p-4">
                        {/* Nagłówek */}
                        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">
                                    {user.displayName || 'Użytkownik'}
                                </h3>
                                <p className="text-white/70 text-sm">{user.email}</p>
                            </div>
                        </div>

                        {/* Status konta */}
                        <div className="space-y-3 mb-4">
                            <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span className="text-white/70">Email:</span>
                                <span className="text-white">{user.email}</span>
                                {user.emailVerified && (
                                    <div title="Email zweryfikowany">
                                        <Shield className="w-4 h-4 text-green-400" />
                                    </div>
                                )}
                            </div>

                            {user.phoneNumber && (
                                <div className="flex items-center gap-2 text-sm">
                                    <Phone className="w-4 h-4 text-green-400" />
                                    <span className="text-white/70">Telefon:</span>
                                    <span className="text-white">{user.phoneNumber}</span>
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-white/70">Status:</span>
                                <span className="text-green-400">Aktywne</span>
                            </div>
                        </div>

                        {/* Akcje */}
                        <div className="space-y-2">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 w-full px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                                onClick={() => setShowUserMenu(false)}
                            >
                                <User className="w-4 h-4" />
                                <span>Panel Użytkownika</span>
                            </Link>

                            <Link
                                href="/profile"
                                className="flex items-center gap-3 w-full px-3 py-2 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                                onClick={() => setShowUserMenu(false)}
                            >
                                <Settings className="w-4 h-4" />
                                <span>Ustawienia</span>
                            </Link>

                            <button
                                onClick={() => {
                                    signOut()
                                    setShowUserMenu(false)
                                }}
                                className="flex items-center gap-3 w-full px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Wyloguj się</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
