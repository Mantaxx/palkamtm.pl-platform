'use client'

import { Text3D } from '@/components/ui/Text3D'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { AddReferenceForm } from './AddReferenceForm'

// Mock data has been removed. References should be fetched from an API.

export function ReferencesPage() {
  const { data: session } = useSession()
  const [showAddForm, setShowAddForm] = useState(false)
  const [references, setReferences] = useState<any[]>([])

  // TODO: Fetch references from the API
  useEffect(() => {
    // fetch('/api/references').then(res => res.json()).then(setReferences)
  }, [])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
      />
    ))
  }

  const renderAddReferenceButton = () => {
    if (!session) return null

    return (
      <div className="text-center mb-12">
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg backdrop-blur-sm border border-white/30 transition-all duration-300"
        >
          Dodaj swoją referencję
        </button>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 pt-8 pb-20 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto text-center">
          <Text3D
            variant="neon"
            intensity="high"
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Referencje
          </Text3D>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Zobacz co mówią o nas nasi klienci
          </motion.p>
        </div>
      </motion.section>

      {/* Add Reference Button */}
      {renderAddReferenceButton()}

      {/* References Grid */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {references.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {references.map((reference, index) => (
                <motion.div
                  key={reference.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <UnifiedCard variant="glass" className="p-6">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                          {reference.image ? (
                            <Image
                              src={reference.image}
                              alt={reference.author}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-xl font-semibold">
                              {reference.author[0]}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-white">{reference.author}</h3>
                        <p className="text-sm text-gray-300">{reference.location}</p>
                        <div className="flex items-center mt-1">
                          {renderStars(reference.rating)}
                        </div>
                      </div>
                    </div>
                    <p className="text-white/90 mb-4">{reference.content}</p>
                    <div className="text-sm text-gray-400">
                      {new Date(reference.date).toLocaleDateString('pl-PL')}
                    </div>
                  </UnifiedCard>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center text-white/70">
              <p>Brak referencji do wyświetlenia. Bądź pierwszy i dodaj swoją opinię!</p>
            </div>
          )}
        </div>
      </div>

    </>
  )
}
