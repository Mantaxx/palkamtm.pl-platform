'use client'

import { LogoGlow } from '@/components/layout/LogoGlow'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { Activity, AlertTriangle, Bookmark, Gavel, Package, Settings, Shield, Star } from 'lucide-react'
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
    { id: 'purchases', label: 'Zakupy', icon: Package },
    { id: 'settings', label: 'Ustawienia', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-900/8 relative">
      {/* Dodatkowe tło dla lepszej widoczności */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/4 to-gray-900/6"></div>


      {/* Logo w lewym górnym rogu */}
      <LogoGlow />

      {/* Navigation Tiles - Glass Style - na samej górze */}
      <div className="absolute top-8 left-80 z-[1001] pointer-events-auto">
        <div className="flex flex-wrap gap-4">
          <Link
            href="/"
            className="glass-nav-button"
            title="Strona główna"
          >
            <i className="fas fa-home text-3xl"></i>
            <span className="text-sm">Strona główna</span>
          </Link>

          <Link
            href="/auctions"
            className="glass-nav-button"
            title="Przeglądaj aukcje"
          >
            <i className="fas fa-gavel text-3xl"></i>
            <span className="text-sm">Aukcje</span>
          </Link>

          <Link
            href="/search"
            className="glass-nav-button"
            title="Wyszukiwarka"
          >
            <i className="fas fa-search text-3xl"></i>
            <span className="text-sm">Wyszukiwarka</span>
          </Link>

          <Link
            href="/champions"
            className="glass-nav-button"
            title="Championy"
          >
            <i className="fas fa-trophy text-3xl"></i>
            <span className="text-sm">Championy</span>
          </Link>

          <Link
            href="/breeder-meetings"
            className="glass-nav-button"
            title="Spotkania hodowców"
          >
            <i className="fas fa-users text-3xl"></i>
            <span className="text-sm">Spotkania</span>
          </Link>

          <Link
            href="/breeder-visits"
            className="glass-nav-button"
            title="Wizyty hodowców"
          >
            <i className="fas fa-camera text-3xl"></i>
            <span className="text-sm">Wizyty</span>
          </Link>

          <Link
            href="/references"
            className="glass-nav-button"
            title="Referencje"
          >
            <i className="fas fa-star text-3xl"></i>
            <span className="text-sm">Referencje</span>
          </Link>

          <Link
            href="/messages"
            className="glass-nav-button"
            title="Wiadomości"
          >
            <i className="fas fa-envelope text-3xl"></i>
            <span className="text-sm">Wiadomości</span>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Panel Użytkownika</h1>
              <p className="text-white/70 mt-2">
                Zarządzaj swoimi aukcjami, ofertami i zakupami
              </p>

              {/* Status weryfikacji konta */}
              {session?.user && (
                <div className="mt-4 space-y-2">
                  {/* Status aktywacji konta email */}
                  {session.user.isActive ? (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-600/20 text-green-400 rounded-lg border border-green-500/30">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Konto aktywne</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2 bg-red-600/20 text-red-400 rounded-lg border border-red-500/30">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Konto nieaktywne - wymagana aktywacja email</span>
                      <Link
                        href="/auth/activate"
                        className="text-red-300 hover:text-red-200 underline text-sm"
                      >
                        Aktywuj teraz
                      </Link>
                    </div>
                  )}

                  {/* Status weryfikacji email */}
                  {session.user.emailVerified ? (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-600/20 text-green-400 rounded-lg border border-green-500/30">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm font-medium">Email zweryfikowany</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 px-3 py-2 bg-yellow-600/20 text-yellow-400 rounded-lg border border-yellow-500/30">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-sm font-medium">Wymagana weryfikacja email</span>
                      <Link
                        href="/auth/check-email"
                        className="text-yellow-300 hover:text-yellow-200 underline text-sm"
                      >
                        Zweryfikuj teraz
                      </Link>
                    </div>
                  )}

                  {/* Status weryfikacji telefonu */}
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
                className="glass-nav-button"
              >
                <i className="fas fa-plus text-2xl"></i>
                <span className="text-sm">Utwórz aukcję</span>
              </Link>
              <button
                onClick={() => router.push('/api/auth/signout')}
                className="glass-nav-button"
              >
                <i className="fas fa-sign-out-alt text-2xl"></i>
                <span className="text-sm">Wyloguj się</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b-2 border-white/40">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                      ? 'border-white text-white'
                      : 'border-transparent text-white/60 hover:text-white hover:border-white/60'
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
            {/* Zakładka przegląd jest pusta - użytkownik może przejść do konkretnych sekcji */}
          </div>
        )}

        {activeTab === 'auctions' && (
          <UnifiedCard variant="glass" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Moje aukcje</h2>
              <Link
                href="/user/create-auction"
                className="glass-nav-button"
              >
                <i className="fas fa-plus text-2xl"></i>
                <span className="text-sm">Utwórz aukcję</span>
              </Link>
            </div>
            <div className="text-center py-8">
              <Gavel className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">Brak aukcji</p>
              <p className="text-sm text-white/50 mt-2">Utwórz swoją pierwszą aukcję</p>
            </div>
          </UnifiedCard>
        )}

        {activeTab === 'bids' && (
          <UnifiedCard variant="glass" className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Moje oferty</h2>
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">Brak ofert</p>
              <p className="text-sm text-white/50 mt-2">Rozpocznij licytowanie na aukcjach</p>
            </div>
          </UnifiedCard>
        )}

        {activeTab === 'watchlist' && (
          <UnifiedCard variant="glass" className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Obserwowane aukcje</h2>
            <div className="text-center py-8">
              <Bookmark className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">Brak obserwowanych aukcji</p>
              <p className="text-sm text-white/50 mt-2">Rozpocznij obserwowanie interesujących aukcji</p>
            </div>
          </UnifiedCard>
        )}

        {activeTab === 'purchases' && (
          <UnifiedCard variant="glass" className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Moje zakupy</h2>
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-white/30 mx-auto mb-4" />
              <p className="text-white/70">Brak zakupów</p>
              <p className="text-sm text-white/50 mt-2">Twoje zakupy będą wyświetlane tutaj</p>
            </div>
          </UnifiedCard>
        )}

        {activeTab === 'settings' && (
          <UnifiedCard variant="glass" className="p-6">
            <h2 className="text-xl font-semibold text-white mb-6">Ustawienia konta</h2>
            <div className="space-y-6">
              {/* Informacje o koncie */}
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-lg font-medium text-white mb-4">Informacje o koncie</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Email</label>
                    <p className="text-white">{session?.user?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Nazwa</label>
                    <p className="text-white">{session?.user?.name}</p>
                  </div>
                </div>
              </div>

              {/* Akcje ustawień */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/settings/profile"
                  className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="font-medium text-white">Profil</p>
                    <p className="text-sm text-white/60">Zarządzaj danymi osobowymi</p>
                  </div>
                </Link>

                <Link
                  href="/settings/security"
                  className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Shield className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="font-medium text-white">Bezpieczeństwo</p>
                    <p className="text-sm text-white/60">Zmiana hasła, 2FA</p>
                  </div>
                </Link>

                <Link
                  href="/settings/notifications"
                  className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Activity className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="font-medium text-white">Powiadomienia</p>
                    <p className="text-sm text-white/60">Ustawienia powiadomień</p>
                  </div>
                </Link>

                <Link
                  href="/settings/privacy"
                  className="flex items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Shield className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="font-medium text-white">Prywatność</p>
                    <p className="text-sm text-white/60">Ustawienia prywatności</p>
                  </div>
                </Link>
              </div>
            </div>
          </UnifiedCard>
        )}
      </div>
    </div>
  )
}

