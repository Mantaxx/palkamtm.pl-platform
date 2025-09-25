'use client'

import { Text3D } from '@/components/ui/Text3D'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Breadcrumb {
    name: string
    href?: string
}

interface PageHeaderProps {
    title: string
    breadcrumbs: Breadcrumb[]
}

export function PageHeader({ title }: PageHeaderProps) {
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
                <Link href="/heritage" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                    <i className="fas fa-crown mr-2 text-2xl" /> Dziedzictwo
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
                <Link href="/dashboard" className="flex items-center justify-center max-w-xs w-full sm:w-auto px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-xl backdrop-blur-sm border border-white/30 transition-all duration-300 text-xs md:text-sm font-semibold shadow-md">
                    <i className="fas fa-user mr-2 text-2xl" /> Konto
                </Link>
            </div>

            <Text3D variant="neon" intensity="high" className="text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-2">
                {title}
            </Text3D>
        </motion.header>
    )
}