'use client'

import ChangePasswordForm from '@/components/auth/ChangePasswordForm'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Bell,
  Calendar,
  Camera,
  Edit3,
  Gavel,
  Key,
  LogOut,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  Search,
  Settings,
  Shield,
  Star,
  Trophy,
  User,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export function UserDashboard() {
  const { user, signOut } = useAuth()
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('profile')
  const [showChangePassword, setShowChangePassword] = useState(false)

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'auctions', label: 'Moje aukcje', icon: Gavel },
    { id: 'messages', label: 'Wiadomości', icon: MessageSquare },
    { id: 'achievements', label: 'Osiągnięcia', icon: Trophy },
    { id: 'references', label: 'Referencje', icon: Star },
    { id: 'meetings', label: 'Spotkania', icon: Users },
    { id: 'security', label: 'Bezpieczeństwo', icon: Shield },
    { id: 'notifications', label: 'Powiadomienia', icon: Bell },
    { id: 'settings', label: 'Ustawienia', icon: Settings }
  ]

  // Obsługa parametru tab z URL
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  if (!user) {
    return (
      <UnifiedLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Nie jesteś zalogowany</h1>
            <Link
              href="/auth/signin"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
            >
              Zaloguj się
            </Link>
          </div>
        </div>
      </UnifiedLayout>
    )
  }

  return (
    <UnifiedLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Panel Użytkownika</h1>
          <p className="text-white/70">Zarządzaj swoim kontem i ustawieniami</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card hover-3d-lift">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-1">
                  {user.displayName || 'Użytkownik'}
                </h2>
                <p className="text-white/70 text-sm">{user.email}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-400 text-sm">Aktywne</span>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${activeTab === tab.id
                        ? 'bg-blue-600 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                        }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>

              {/* Logout */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={signOut}
                  className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Wyloguj się</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card hover-3d-lift">
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Informacje o profilu</h3>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm">Imię i nazwisko</label>
                        <div className="flex items-center gap-3 p-3 card hover-glass">
                          <User className="w-4 h-4 text-blue-400" />
                          <span className="text-white">
                            {user.displayName || 'Nie ustawiono'}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-white/70 text-sm">Email</label>
                        <div className="flex items-center gap-3 p-3 card hover-glass">
                          <Mail className="w-4 h-4 text-blue-400" />
                          <span className="text-white">{user.email}</span>
                          {user.emailVerified && (
                            <div title="Email zweryfikowany">
                              <Shield className="w-4 h-4 text-green-400" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {user.phoneNumber && (
                      <div className="space-y-2">
                        <label className="text-white/70 text-sm">Numer telefonu</label>
                        <div className="flex items-center gap-3 p-3 card hover-glass">
                          <Phone className="w-4 h-4 text-green-400" />
                          <span className="text-white">{user.phoneNumber}</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-white/70 text-sm">Data utworzenia konta</label>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <Calendar className="w-4 h-4 text-purple-400" />
                        <span className="text-white">
                          {user.metadata?.creationTime ?
                            new Date(user.metadata.creationTime).toLocaleDateString('pl-PL') :
                            'Nieznana'
                          }
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-white/70 text-sm">Ostatnie logowanie</label>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10">
                        <Calendar className="w-4 h-4 text-orange-400" />
                        <span className="text-white">
                          {user.metadata?.lastSignInTime ?
                            new Date(user.metadata.lastSignInTime).toLocaleDateString('pl-PL') :
                            'Nieznane'
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-4">
                    <Link href="/dashboard?tab=profile" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300">
                      <Edit3 className="w-4 h-4" />
                      <span>Edytuj profil</span>
                    </Link>
                    <Link href="/dashboard?tab=profile" className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300">
                      <User className="w-4 h-4" />
                      <span>Publiczny profil</span>
                    </Link>
                  </div>
                </motion.div>
              )}

              {activeTab === 'auctions' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Moje aukcje</h3>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 card hover-glass">
                        <div className="flex items-center gap-3">
                          <Gavel className="w-5 h-5 text-blue-400" />
                          <div>
                            <h4 className="text-white font-semibold">Aktywne aukcje</h4>
                            <p className="text-white/70 text-sm">0 aukcji</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 card hover-glass">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-5 h-5 text-green-400" />
                          <div>
                            <h4 className="text-white font-semibold">Wygrane</h4>
                            <p className="text-white/70 text-sm">0 aukcji</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 card hover-glass">
                        <div className="flex items-center gap-3">
                          <BarChart3 className="w-5 h-5 text-purple-400" />
                          <div>
                            <h4 className="text-white font-semibold">Sprzedane</h4>
                            <p className="text-white/70 text-sm">0 aukcji</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Link href="/auctions" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300">
                        <Search className="w-4 h-4" />
                        <span>Przeglądaj aukcje</span>
                      </Link>
                      <Link href="/seller/create-auction" className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300">
                        <Plus className="w-4 h-4" />
                        <span>Utwórz aukcję</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'messages' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Wiadomości</h3>

                  <div className="space-y-6">
                    <div className="p-4 card hover-glass">
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-5 h-5 text-blue-400" />
                        <div>
                          <h4 className="text-white font-semibold">Skrzynka odbiorcza</h4>
                          <p className="text-white/70 text-sm">Komunikuj się z innymi hodowcami</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 card hover-glass">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-semibold">Brak nowych wiadomości</h4>
                            <p className="text-white/70 text-sm">Sprawdź ponownie później</p>
                          </div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Link href="/messages" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300">
                        <MessageSquare className="w-4 h-4" />
                        <span>Otwórz wiadomości</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Osiągnięcia</h3>

                  <div className="space-y-6">
                    <div className="p-4 card hover-glass">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-yellow-400" />
                        <div>
                          <h4 className="text-white font-semibold">Twoje osiągnięcia</h4>
                          <p className="text-white/70 text-sm">Zbieraj odznaki i osiągnięcia</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 card hover-glass">
                        <div className="flex items-center gap-3 mb-3">
                          <Trophy className="w-5 h-5 text-yellow-400" />
                          <h4 className="text-white font-semibold">Pierwsza aukcja</h4>
                        </div>
                        <p className="text-white/70 text-sm">Utwórz swoją pierwszą aukcję</p>
                        <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full w-0"></div>
                        </div>
                      </div>

                      <div className="p-4 card hover-glass">
                        <div className="flex items-center gap-3 mb-3">
                          <Star className="w-5 h-5 text-blue-400" />
                          <h4 className="text-white font-semibold">Aktywny hodowca</h4>
                        </div>
                        <p className="text-white/70 text-sm">Bądź aktywny przez 30 dni</p>
                        <div className="mt-2 w-full bg-gray-700 rounded-full h-2">
                          <div className="bg-blue-400 h-2 rounded-full w-[15%]"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Link href="/achievements" className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all duration-300">
                        <Trophy className="w-4 h-4" />
                        <span>Zobacz wszystkie</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'references' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Referencje</h3>

                  <div className="space-y-6">
                    <div className="p-4 card hover-glass">
                      <div className="flex items-center gap-3">
                        <Star className="w-5 h-5 text-green-400" />
                        <div>
                          <h4 className="text-white font-semibold">Twoje referencje</h4>
                          <p className="text-white/70 text-sm">Zobacz opinie innych hodowców</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 card hover-glass">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-semibold">Brak referencji</h4>
                            <p className="text-white/70 text-sm">Zacznij handlować, aby otrzymać pierwsze opinie</p>
                          </div>
                          <div className="text-yellow-400 text-sm">0/5</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Link href="/references" className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-300">
                        <Star className="w-4 h-4" />
                        <span>Zobacz referencje</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'meetings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Spotkania hodowców</h3>

                  <div className="space-y-6">
                    <div className="p-4 card hover-glass">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-400" />
                        <div>
                          <h4 className="text-white font-semibold">Spotkania i wydarzenia</h4>
                          <p className="text-white/70 text-sm">Dołącz do społeczności hodowców</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-4 card hover-glass">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-white font-semibold">Brak nadchodzących spotkań</h4>
                            <p className="text-white/70 text-sm">Sprawdź ponownie później</p>
                          </div>
                          <Calendar className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Link href="/breeder-meetings" className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300">
                        <Users className="w-4 h-4" />
                        <span>Zobacz spotkania</span>
                      </Link>
                      <Link href="/breeder-meetings/dodaj-zdjecie" className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300">
                        <Camera className="w-4 h-4" />
                        <span>Dodaj zdjęcie</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'security' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Bezpieczeństwo</h3>

                  {showChangePassword ? (
                    <ChangePasswordForm
                      onSuccess={() => setShowChangePassword(false)}
                      onCancel={() => setShowChangePassword(false)}
                    />
                  ) : (
                    <div className="space-y-6">
                      <div className="p-4 card hover-glass">
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-green-400" />
                          <div>
                            <h4 className="text-white font-semibold">Konto zabezpieczone</h4>
                            <p className="text-white/70 text-sm">Twoje konto jest chronione przez Firebase Authentication</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 card hover-glass">
                          <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-blue-400" />
                            <div>
                              <h4 className="text-white font-semibold">Weryfikacja email</h4>
                              <p className="text-white/70 text-sm">
                                {user.emailVerified ? 'Email zweryfikowany' : 'Email niezweryfikowany'}
                              </p>
                            </div>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs ${user.emailVerified
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                            }`}>
                            {user.emailVerified ? 'Zweryfikowany' : 'Niezweryfikowany'}
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 card hover-glass">
                          <div className="flex items-center gap-3">
                            <Key className="w-4 h-4 text-purple-400" />
                            <div>
                              <h4 className="text-white font-semibold">Hasło</h4>
                              <p className="text-white/70 text-sm">Zarządzaj swoim hasłem</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowChangePassword(true)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300"
                          >
                            Zmień hasło
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Powiadomienia</h3>

                  <div className="space-y-4">
                    <div className="p-4 card hover-glass">
                      <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-blue-400" />
                        <div>
                          <h4 className="text-white font-semibold">Powiadomienia email</h4>
                          <p className="text-white/70 text-sm">Otrzymuj powiadomienia o nowych aukcjach i aktualizacjach</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 card hover-glass">
                        <span className="text-white">Nowe aukcje</span>
                        <input
                          type="checkbox"
                          className="toggle"
                          defaultChecked
                          aria-label="Włącz powiadomienia o nowych aukcjach"
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 card hover-glass">
                        <span className="text-white">Aktualizacje konta</span>
                        <input
                          type="checkbox"
                          className="toggle"
                          defaultChecked
                          aria-label="Włącz powiadomienia o aktualizacjach konta"
                        />
                      </div>
                      <div className="flex items-center justify-between p-3 card hover-glass">
                        <span className="text-white">Powiadomienia SMS</span>
                        <input
                          type="checkbox"
                          className="toggle"
                          aria-label="Włącz powiadomienia SMS"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Ustawienia</h3>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 card hover-glass">
                        <div>
                          <h4 className="text-white font-semibold">Język</h4>
                          <p className="text-white/70 text-sm">Wybierz język interfejsu</p>
                        </div>
                        <select
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          aria-label="Wybierz język interfejsu"
                        >
                          <option value="pl">Polski</option>
                          <option value="en">English</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 card hover-glass">
                        <div>
                          <h4 className="text-white font-semibold">Motyw</h4>
                          <p className="text-white/70 text-sm">Wybierz motyw aplikacji</p>
                        </div>
                        <select
                          className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          aria-label="Wybierz motyw aplikacji"
                        >
                          <option value="dark">Ciemny</option>
                          <option value="light">Jasny</option>
                          <option value="auto">Automatyczny</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between p-4 card hover-glass">
                        <div>
                          <h4 className="text-white font-semibold">Tryb deweloperski</h4>
                          <p className="text-white/70 text-sm">Włącz dodatkowe informacje debugowania</p>
                        </div>
                        <input
                          type="checkbox"
                          className="toggle"
                          aria-label="Włącz tryb deweloperski"
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300">
                        Zapisz ustawienia
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </UnifiedLayout>
  )
}