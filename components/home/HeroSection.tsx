'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-primary-900 via-primary-800 to-primary-600">
          {/* Placeholder for video background */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Animated pigeons overlay */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-1/4 left-1/4 w-8 h-8 bg-white/20 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-1/3 right-1/3 w-6 h-6 bg-white/15 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/3 w-7 h-7 bg-white/25 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-5 h-5 bg-white/20 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, scale: 0.5, rotateX: -90 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotateX: 0,
            y: [0, -10, 0]
          }}
          transition={{
            duration: 2,
            delay: 0.5,
            type: "spring",
            stiffness: 60,
            damping: 20,
            y: {
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }
          }}
          className="relative"
        >
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-6 leading-tight relative">
            {/* Glowing background effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.3, scale: 1.1 }}
              transition={{ duration: 3, delay: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-400/30 blur-3xl rounded-full"
            />

            {/* Main text with shimmer effect */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 1.2 }}
              className="relative z-10 text-white drop-shadow-2xl"
            >
              Pałka MTM
            </motion.span>

            <motion.span
              className="block text-gradient bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 relative z-10"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, delay: 1.8, type: "spring", stiffness: 60 }}
            >
              {/* Shimmer overlay */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2,
                  delay: 1.5,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
              Mistrzowie Sprintu
            </motion.span>
          </h1>
        </motion.div>

                  <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
          >
          Pasja, tradycja i nowoczesność w hodowli gołębi pocztowych.
          Tworzymy historię polskiego sportu gołębiarskiego poprzez doskonałą hodowlę i nieustanne dążenie do perfekcji.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/auctions"
            className="group bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <span>Zobacz Aukcje</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <button className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300 flex items-center space-x-2">
            <Play className="w-5 h-5" />
            <span>Obejrzyj Film</span>
          </button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
