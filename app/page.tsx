'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    // Wyłącz scroll na stronie głównej
    document.body.style.overflow = 'hidden'

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Cleanup - przywróć scroll gdy komponent się odmontuje
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="h-screen overflow-hidden">
      <UnifiedLayout showFooter={false}>
        <div className="light-floor-fixed"></div>

        <div className="pigeon-stage-lighting h-screen overflow-hidden">
          {/* Sekcja tekstu - pozycjonowana pod nawigacją */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1 }}
            style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', padding: '0 1rem', zIndex: 30 }}
          >
            <motion.div
              style={{
                rotateX: mousePosition.y * 2,
                rotateY: mousePosition.x * 2,
                maxWidth: '72rem',
                margin: '0 auto'
              }}
            >
              <div className="focus-in-contract-bck">
                <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
                  Pałka MTM
                  <span className="block text-primary-400 mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                    Mistrzowie Sprintu
                  </span>
                </h1>

                <p className="mt-8 max-w-4xl mx-auto text-lg sm:text-xl md:text-2xl text-white leading-relaxed drop-shadow-lg">
                  Pasja, tradycja i nowoczesność w hodowli gołębi pocztowych. Tworzymy historię polskiego sportu gołębiarskiego.
                </p>
              </div>
            </motion.div>
          </motion.section>

          {/* Sekcja zdjęcia gołębia - pozycjonowana absolutnie */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 3, delay: 4 }}
            style={{ position: 'absolute', top: '72%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}
          >
            <div className="flex items-center justify-center">
              <Image
                src="/1360bez tla.png"
                alt="Gołąb Pałka MTM"
                width={600}
                height={720}
                className={`rounded-lg shadow-lg brightness-110 ${isVisible ? 'puff-in-bottom' : ''}`}
                priority
              />
            </div>
          </motion.section>
        </div>
      </UnifiedLayout>
    </div>
  )
}