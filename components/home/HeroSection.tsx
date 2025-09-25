'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="text-center py-16 sm:py-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight"
      >
        Pałka MTM
        <span className="block text-primary-400 mt-2 text-2xl sm:text-3xl md:text-4xl">
          Mistrzowie Sprintu
        </span>
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="mt-6 max-w-3xl mx-auto text-base sm:text-lg text-secondary-200"
      >
        Pasja, tradycja i nowoczesność w hodowli gołębi pocztowych. Tworzymy historię polskiego sportu gołębiarskiego.
      </motion.p>
    </section>
  )
}
