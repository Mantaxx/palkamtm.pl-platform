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
          {/* Napis na górze */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 2, delay: 1 }}
            style={{
              position: 'absolute',
              top: '3%',
              left: '40%',
              transform: `translate(-50%, -50%) translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`,
              zIndex: 25
            }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 drop-shadow-2xl hero-title">
              Pałka MTM
            </h1>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold drop-shadow-xl hero-subtitle">
              Mistrzowie Sprintu
            </h2>
          </motion.div>

          {/* Gołąb poniżej napisu */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 3, delay: 2 }}
            style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20 }}
          >
            <div className="flex items-center justify-center">
              <Image
                src="/1360bez tla.png"
                alt="Gołąb Pałka MTM"
                width={600}
                height={720}
                className={`rounded-lg shadow-lg brightness-110 ${isVisible ? 'puff-in-bottom' : ''}`}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </motion.section>
        </div>
      </UnifiedLayout>
    </div>
  )
}