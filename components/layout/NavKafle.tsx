'use client'

import Link from 'next/link'

export function NavKafle() {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-4 w-full text-base px-4 py-4 min-h-0">
      <Link href="/dashboard" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-lg font-semibold shadow-md">
        <i className="fas fa-user mr-2 text-2xl" /> Panel Klienta
      </Link>
    </div>
  )
}