'use client'

import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { Activity, AlertTriangle, Bookmark, Gavel, LogOut, Package, Plus, Shield, Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function UserDashboard() {
  const router = useRouter()
  const { data: session } = useSession()
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Przegląd', icon: Activity },
    { id: 'auctions', label: 'Moje aukcje', icon: Gavel },
    { id: 'bids', label: 'Moje oferty', icon: Star },
    { id: 'watchlist', label: 'Obserwowane', icon: Bookmark },
    { id: 'purchases', label: 'Zakupy', icon: Package }
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Panel Użytkownika</h1>
              <p className="text-white/70 mt-2">
                Zarządzaj swoimi aukcjami, ofertami i zakupami
              </p>

              {/* Status weryfikacji telefonu */}
              {session?.user && (
                <div className="mt-4">
                  {session.user.isPhoneVerified ? (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-600/20 text-green-400 rounded-lg border border-green-500/30">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Telefon zweryfikowany</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2 bg-yellow-600/20 text-yellow-400 rounded-lg border border-yellow-500/30">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Wymagana weryfikacja telefonu</span>
                      <Link
                        href="/settings/profile"
                        className="text-yellow-300 hover:text-yellow-200 underline text-sm"
                      >
                        Zweryfikuj teraz
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex gap-4">
              <Link
                href="/user/create-auction"
                className="flex items-center gap-2 px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg backdrop-blur-sm transition-all duration-200 border border-green-500/30"
              >
                <Plus className="w-4 h-4" />
                Utwórz aukcję
              </Link>
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="flex items-center gap-2 px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg backdrop-blur-sm transition-all duration-200 border border-red-500/30"
              >
                <LogOut className="w-4 h-4" />
                Wyloguj się
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-white/20">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                      ? 'border-white text-white'
                      : 'border-transparent text-white/60 hover:text-white hover:border-white/40'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <UnifiedCard variant="glass" className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Gavel className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">Moje aukcje</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                </div>
              </UnifiedCard>

              <UnifiedCard variant="glass" className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Star className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">Aktywne oferty</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                </div>
              </UnifiedCard>

              <UnifiedCard variant="glass" className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Bookmark className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">Obserwowane</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                </div>
              </UnifiedCard>

              <UnifiedCard variant="glass" className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-amber-500/20 rounded-lg">
                    <Package className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">Zakupy</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                </div>
              </UnifiedCard>
            </div>

            {/* Quick Actions */}
            <UnifiedCard variant="glass" className="p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Szybkie akcje</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/user/create-auction"
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Plus className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium text-white">Utwórz aukcję</p>
                    <p className="text-sm text-white/60">Dodaj nową aukcję</p>
                  </div>
                </Link>

                <Link
                  href="/auctions"
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Gavel className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">Przeglądaj aukcje</p>
                    <p className="text-sm text-white/60">Znajdź interesujące oferty</p>
                  </div>
                </Link>

                <Link
                  href="/dashboard?tab=watchlist"
                  className="flex items-center gap-3 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Bookmark className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-medium text-white">Obserwowane</p>
                    <p className="text-sm text-white/60">Twoje ulubione aukcje</p>
                  </div>
                </Link>
              </div>
            </UnifiedCard>
          </div>
        )}

        {activeTab === 'auctions' && (
          <UnifiedCard variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Moje aukcje</h2>
              <Link
                href="/user/create-auction"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Utwórz aukcję
              </Link>
            </div>
            <div className="text-center py-8">
              <Gavel className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Brak aukcji</p>
              <p className="text-sm text-gray-500 mt-2">Utwórz swoją pierwszą aukcję</p>
            </div>
          </UnifiedCard>
        )}

        {activeTab === 'bids' && (
          <UnifiedCard variant="glass" className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Moje oferty</h2>
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Brak ofert</p>
              <p className="text-sm text-gray-500 mt-2">Rozpocznij licytowanie na aukcjach</p>
            </div>
          </UnifiedCard>
        )}

        {activeTab === 'watchlist' && (
          <UnifiedCard variant="glass" className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Obserwowane aukcje</h2>
            <div className="text-center py-8">
              <Bookmark className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Brak obserwowanych aukcji</p>
              <p className="text-sm text-gray-500 mt-2">Rozpocznij obserwowanie interesujących aukcji</p>
            </div>
          </UnifiedCard>
        )}

        {activeTab === 'purchases' && (
          <UnifiedCard variant="glass" className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Moje zakupy</h2>
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-gray-400">Brak zakupów</p>
              <p className="text-sm text-gray-500 mt-2">Twoje zakupy będą wyświetlane tutaj</p>
            </div>
          </UnifiedCard>
        )}
      </div>
    </div>
  )
}
