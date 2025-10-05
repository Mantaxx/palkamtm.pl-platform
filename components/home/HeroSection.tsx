'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="text-center py-4 sm:py-6 min-h-screen flex flex-col">
      <div className="max-w-6xl mx-auto px-4">
        {/* Tytuł i opis */}
        <div className="mb-6 mt-2">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{ fontFamily: 'inherit', fontWeight: 'bold', fontSize: '2.25rem', lineHeight: '1.1', color: 'white' }}
          >
            Pałka MTM
            <span className="block text-primary-400 mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Mistrzowie Sprintu
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            style={{ marginTop: '2rem', maxWidth: '56rem', margin: '2rem auto 0', fontSize: '1.125rem', lineHeight: '1.75rem', color: 'rgba(255, 255, 255, 0.7)' }}
          >
            Pasja, tradycja i nowoczesność w hodowli gołębi pocztowych. Tworzymy historię polskiego sportu gołębiarskiego.
          </motion.p>
        </div>

        {/* Główny gołąb - wyśrodkowany pod tekstem z oświetleniem scenicznym */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.9 }}
          style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 20, marginTop: '16rem' }}
        >
          <Image
            src="/1360bez tla.png"
            alt="Piękny gołąb pocztowy - symbol hodowli Pałka MTM"
            width={200}
            height={200}
            priority
            style={{
              width: '200px',
              height: '200px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.3))'
            }}
          />
        </motion.div>

        {/* Dodatkowy tekst pod gołębiem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          style={{ marginTop: '3rem' }}
        >
          <p className="text-secondary-300 text-base sm:text-lg max-w-2xl mx-auto">
            Odkryj świat najlepszych gołębi pocztowych w Polsce. Każdy ptak to historia, każdy lot to legenda.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
