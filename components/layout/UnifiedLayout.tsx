'use client'

import { LogoGlow } from '@/components/layout/LogoGlow'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReactNode } from 'react'

const navItems = [
  { href: '/', icon: 'fas fa-home', title: 'Strona Główna', label: 'Strona Główna' },
  { href: '/auctions', icon: 'fas fa-gavel', title: 'Aukcje', label: 'Aukcje' },
  { href: '/heritage', icon: 'fas fa-crown', title: 'Nasze Dziedzictwo', label: 'Dziedzictwo' },
  { href: '/champions', icon: 'fas fa-trophy', title: 'Championy', label: 'Championy' },
  { href: '/breeder-meetings', icon: 'fas fa-users', title: 'Spotkania', label: 'Spotkania' },
  { href: '/references', icon: 'fas fa-star', title: 'Referencje', label: 'Referencje' },
  { href: '/press', icon: 'fas fa-newspaper', title: 'Prasa', label: 'Prasa' },
  { href: '/about', icon: 'fas fa-info-circle', title: 'O nas', label: 'O Nas' },
  { href: '/contact', icon: 'fas fa-envelope', title: 'Kontakt', label: 'Kontakt' },
  { href: '/dashboard', icon: 'fas fa-tachometer-alt', title: 'Panel Klienta', label: 'Panel Klienta' },
]

const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
}

const navItemVariants = {
  hidden: { opacity: 0, x: -50, rotate: -90 },
  visible: {
    opacity: 1, x: 0, rotate: 0,
    transition: { duration: 0.2, ease: "easeOut" }
  },
}

interface UnifiedLayoutProps {
  children: ReactNode
  showNavigation?: boolean
  className?: string
}

export function UnifiedLayout({
  children,
  showNavigation = true,
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

      {/* Logo w lewym górnym rogu */}
      <LogoGlow />

      {/* Navigation Menu */}
      {showNavigation && (
        <div className="absolute top-8 left-80 z-20">
          <motion.div
            className="flex items-center gap-3"
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <motion.div key={item.href} variants={navItemVariants}>
                <Link href={item.href} className="glass-nav-button" title={item.title}>
                  <i className={`${item.icon} relative z-10 text-3xl`}></i>
                  <span className="relative z-10 text-sm">{item.label}</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
