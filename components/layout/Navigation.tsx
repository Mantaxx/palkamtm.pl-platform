'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, User, X } from 'lucide-react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import QuickSearch from '../search/QuickSearch'

const navigationItems = [
  { name: 'Strona Główna', href: '/' },
  { name: 'Aukcje', href: '/auctions' },
  { name: 'Nasze Dziedzictwo', href: '/heritage' },
  { name: 'Championy', href: '/champions' },
  { name: 'Spotkania', href: '/breeder-meetings' },
  { name: 'Referencje', href: '/references' },
  { name: 'Prasa', href: '/press' },
  { name: 'O nas', href: '/about' },
  { name: 'Kontakt', href: '/contact' },
]

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-64">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Pałka M.T.M. Mistrzowie Sprintu"
              className="h-56 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation - przesunięte maksymalnie w prawo */}
          <div className="hidden lg:flex items-center space-x-20">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 text-xl tracking-tight font-['Poppins'] text-center"
              >
                {item.name}
              </Link>
            ))}

            {/* Panel użytkownika */}
            {session ? (
              <Link
                href={
                  session.user?.role === 'ADMIN'
                    ? '/admin/dashboard'
                    : session.user?.role === 'SELLER'
                      ? '/seller/dashboard'
                      : '/buyer/dashboard'
                }
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 text-xl tracking-tight font-['Poppins'] text-center"
              >
                Panel
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => signIn()}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 text-xl tracking-tight font-['Poppins'] text-center"
                >
                  Zaloguj
                </button>
                <Link
                  href="/auth/signup"
                  className="btn-primary text-lg px-6 py-2"
                >
                  Zarejestruj
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="md:hidden">
                <QuickSearch
                  placeholder="Szukaj aukcji..."
                  className="w-full"
                />
              </div>

              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-primary-600 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-100">
                {session ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <User className="w-5 h-5" />
                      <span>{session.user?.name}</span>
                    </div>
                    <Link
                      href={
                        session.user?.role === 'ADMIN'
                          ? '/admin/dashboard'
                          : session.user?.role === 'SELLER'
                            ? '/seller/dashboard'
                            : '/buyer/dashboard'
                      }
                      className="block text-gray-700 hover:text-primary-600 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Panel
                    </Link>
                    <button
                      onClick={() => {
                        handleSignOut()
                        setIsMenuOpen(false)
                      }}
                      className="block text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    >
                      Wyloguj
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        signIn()
                        setIsMenuOpen(false)
                      }}
                      className="block w-full text-left text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    >
                      Zaloguj
                    </button>
                    <Link
                      href="/auth/signup"
                      className="block w-full text-center btn-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Zarejestruj
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
