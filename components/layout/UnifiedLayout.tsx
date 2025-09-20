'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

interface UnifiedLayoutProps {
  children: ReactNode
  showNavigation?: boolean
  showAuthButtons?: boolean
  className?: string
}

export function UnifiedLayout({
  children,
  showNavigation = true,
  showAuthButtons = true,
  className = ''
}: UnifiedLayoutProps) {
  return (
    <div className={`min-h-screen relative overflow-hidden ${className}`}>

      {/* Enhanced 3D Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/20 rounded-full blur-3xl animate-float3D"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-white/15 rounded-full blur-3xl animate-float3D animate-delay-3s"></div>
        <div className="absolute -bottom-40 right-1/3 w-64 h-64 bg-gradient-to-r from-white/20 to-white/15 rounded-full blur-3xl animate-morph3D"></div>
      </div>


      {/* Navigation Menu */}
      {showNavigation && (
        <div className="absolute top-8 left-80 z-20">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, x: -300, rotate: -360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
            >
              <Link href="/" className="glass-nav-button" title="Strona Główna">
                <i className="fas fa-home relative z-10 text-3xl"></i>
                <span className="relative z-10 text-sm">Strona Główna</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -300, rotate: -360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
            >
              <Link href="/auctions" className="glass-nav-button" title="Aukcje">
                <i className="fas fa-gavel relative z-10 text-3xl"></i>
                <span className="relative z-10 text-sm">Aukcje</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -300, rotate: -360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.0, delay: 0.6, ease: "easeOut" }}
            >
              <Link href="/heritage" className="glass-nav-button" title="Nasze Dziedzictwo">
                <i className="fas fa-crown relative z-10 text-3xl"></i>
                <span className="relative z-10 text-sm">Dziedzictwo</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -300, rotate: -360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.0, delay: 0.7, ease: "easeOut" }}
            >
              <Link href="/champions" className="glass-nav-button" title="Championy">
                <i className="fas fa-trophy relative z-10 text-3xl"></i>
                <span className="relative z-10 text-sm">Championy</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -300, rotate: -360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
            >
              <Link href="/breeder-meetings" className="glass-nav-button" title="Spotkania">
                <i className="fas fa-users relative z-10 text-3xl"></i>
                <span className="relative z-10 text-sm">Spotkania</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -300, rotate: -360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.0, delay: 0.9, ease: "easeOut" }}
            >
              <Link href="/references" className="glass-nav-button" title="Referencje">
                <i className="fas fa-star relative z-10 text-3xl"></i>
                <span className="relative z-10 text-sm">Referencje</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -300, rotate: -360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.0, delay: 1.0, ease: "easeOut" }}
            >
              <Link href="/press" className="glass-nav-button" title="Prasa">
                <i className="fas fa-newspaper relative z-10 text-3xl"></i>
                <span className="relative z-10 text-sm">Prasa</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -300, rotate: -360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.0, delay: 1.1, ease: "easeOut" }}
            >
              <Link href="/about" className="glass-nav-button" title="O nas">
                <i className="fas fa-info-circle relative z-10 text-3xl"></i>
                <span className="relative z-10 text-sm">O Nas</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -300, rotate: -360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.0, delay: 1.2, ease: "easeOut" }}
            >
              <Link href="/contact" className="glass-nav-button" title="Kontakt">
                <i className="fas fa-envelope relative z-10 text-3xl"></i>
                <span className="relative z-10 text-sm">Kontakt</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -300, rotate: -360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1.0, delay: 1.3, ease: "easeOut" }}
            >
              <Link href="/dashboard" className="glass-nav-button" title="Panel Klienta">
                <i className="fas fa-tachometer-alt relative z-10 text-3xl"></i>
                <span className="relative z-10 text-sm">Panel Klienta</span>
              </Link>
            </motion.div>
          </div>
        </div>
      )}

      {/* Auth Buttons */}
      {showAuthButtons && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute top-8 right-4 sm:right-8 z-20 flex items-center gap-2 sm:gap-3"
        >
          <Link href="/auth/signin" className="glass-nav-button" title="Zaloguj się">
            <i className="fas fa-sign-in-alt relative z-10 text-2xl"></i>
          </Link>
          <Link href="/auth/signup" className="glass-nav-button" title="Zarejestruj się">
            <i className="fas fa-user-plus relative z-10 text-2xl"></i>
          </Link>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
