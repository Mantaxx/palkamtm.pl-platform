'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

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

export function HeritageFloatingNav() {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const idleTimer = useRef<number | null>(null)

  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const delta = y - lastY.current
      lastY.current = y
      if (delta > 6) setHidden(true)
      else if (delta < -6) setHidden(false)
      if (idleTimer.current) window.clearTimeout(idleTimer.current)
      idleTimer.current = window.setTimeout(() => setHidden(false), 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (idleTimer.current) window.clearTimeout(idleTimer.current)
    }
  }, [])

  return (
    <div
      role="presentation"
      className={`fixed bottom-6 right-6 z-[60] transition-transform duration-300 ${hidden ? 'translate-y-24 opacity-0' : 'translate-y-0 opacity-100'}`}
    >
      <div className="pointer-events-auto flex items-center gap-3">
        <img src="/logo.png" alt="Logo" className="h-10 w-auto rounded-md shadow" />
        <div className="flex gap-2 flex-wrap max-w-[70vw]">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="glass-nav-button !px-2 !py-1" title={item.title}>
              <i className={`${item.icon} relative z-10 text-sm`}></i>
              <span className="relative z-10 text-[10px]">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


