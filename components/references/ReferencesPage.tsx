'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { Text3D } from '@/components/ui/Text3D'
import { UnifiedButton } from '@/components/ui/UnifiedButton'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, MapPin, Plus, Quote, Star, Trophy, Users } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { AddReferenceForm } from './AddReferenceForm'

interface Achievement {
  pigeon: string
  ringNumber: string
  results: Array<{
    competition: string
    place: number
    date: string
  }>
}

interface Reference {
  id: string
  breeder: {
    name: string
    location: string
    experience: string
    avatar: string
  }
  testimonial: string
  achievements: Achievement[]
  rating: number
  date: string
}

export function ReferencesPage() {
  const { data: session, status } = useSession()
  const [references, setReferences] = useState<Reference[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchReferences()
  }, [])

  const fetchReferences = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/references')
      if (!response.ok) {
        throw new Error('Nie udało się pobrać referencji')
      }
      const data = await response.json()
      setReferences(data)
    } catch (err) {
      setError('Błąd podczas ładowania referencji')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddReference = async (referenceData: any) => {
    try {
      const response = await fetch('/api/references', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(referenceData),
      })

      if (!response.ok) {
        throw new Error('Nie udało się dodać referencji')
      }

      await fetchReferences()
      setShowAddForm(false)
    } catch (err) {
      setError('Błąd podczas dodawania referencji')
    }
  }

  if (isLoading) {
    return (
      <UnifiedLayout>
        <div className="min-h-screen flex items-center justify-center">
          <UnifiedCard variant="3d" glow={true} className="p-8 text-center border-2 border-white shadow-2xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <Text3D variant="glow" intensity="medium" className="text-lg">
              Ładowanie referencji...
            </Text3D>
          </UnifiedCard>
        </div>
      </UnifiedLayout>
    )
  }

  return (
    <UnifiedLayout>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 pt-64 pb-20 px-4 sm:px-6 lg:px-8"
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
            Opinie i osiągnięcia naszych klientów - hodowców gołębi pocztowych
          </motion.p>
        </div>
      </motion.section>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Add Reference Button */}
          {session && (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="text-center">
                <UnifiedButton
                  variant="primary"
                  size="lg"
                  intensity="high"
                  glow={true}
                  onClick={() => setShowAddForm(true)}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Dodaj Referencję
                </UnifiedButton>
              </div>
            </motion.section>
          )}

          {/* References Grid */}
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {references.map((reference, index) => (
                <motion.div
                  key={reference.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <UnifiedCard variant="3d" glow={true} className="p-6 hover-3d-lift border-2 border-white shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full flex items-center justify-center animate-glow3D">
                        <span className="text-white font-bold text-lg">
                          {reference.breeder.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {reference.breeder.name}
                        </h3>
                        <div className="flex items-center text-sm text-blue-200">
                          <MapPin className="w-4 h-4 mr-1" />
                          {reference.breeder.location}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < reference.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-400'
                            }`}
                        />
                      ))}
                      <span className="text-sm text-white/80 ml-2">
                        {reference.rating}/5
                      </span>
                    </div>

                    {/* Testimonial */}
                    <div className="mb-4">
                      <Quote className="w-5 h-5 text-blue-400 mb-2" />
                      <p className="text-white/90 text-sm leading-relaxed">
                        {reference.testimonial}
                      </p>
                    </div>

                    {/* Achievements */}
                    {reference.achievements.length > 0 && (
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-semibold text-white">Osiągnięcia:</span>
                        </div>
                        <div className="space-y-1">
                          {reference.achievements.slice(0, 2).map((achievement, idx) => (
                            <div key={idx} className="text-xs text-white/80">
                              <span className="font-semibold text-blue-300">
                                {achievement.pigeon}
                              </span>
                              {' '}({achievement.ringNumber}) - {achievement.results.length} wyników
                            </div>
                          ))}
                          {reference.achievements.length > 2 && (
                            <div className="text-xs text-blue-200">
                              +{reference.achievements.length - 2} więcej...
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Experience */}
                    <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
                      <Users className="w-4 h-4 text-cyan-400" />
                      <span>Doświadczenie: {reference.breeder.experience}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {format(new Date(reference.date), 'dd MMMM yyyy', { locale: pl })}
                      </span>
                    </div>
                  </UnifiedCard>
                </motion.div>
              ))}
            </div>

            {/* Empty State */}
            {references.length === 0 && (
              <UnifiedCard variant="glass" glow={true} className="p-12 text-center border-2 border-white shadow-2xl">
                <Text3D variant="gradient" intensity="medium" className="text-2xl font-bold mb-4">
                  Brak referencji
                </Text3D>
                <p className="text-white/80 mb-6">
                  Jeszcze nikt nie dodał referencji. Bądź pierwszy!
                </p>
                {session && (
                  <UnifiedButton
                    variant="primary"
                    onClick={() => setShowAddForm(true)}
                    intensity="high"
                    glow={true}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Dodaj Pierwszą Referencję
                  </UnifiedButton>
                )}
              </UnifiedCard>
            )}

            {/* Error State */}
            {error && (
              <UnifiedCard variant="glass" glow={true} className="p-8 text-center border-2 border-white shadow-2xl">
                <Text3D variant="neon" intensity="high" className="text-lg mb-4 text-red-400">
                  {error}
                </Text3D>
                <UnifiedButton
                  variant="primary"
                  onClick={() => fetchReferences()}
                  intensity="high"
                  glow={true}
                >
                  Spróbuj ponownie
                </UnifiedButton>
              </UnifiedCard>
            )}
          </motion.section>
        </div>
      </div>

      {/* Add Reference Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <UnifiedCard variant="3d" glow={true} className="p-8 border-2 border-white shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <Text3D variant="gradient" intensity="medium" className="text-2xl font-bold">
                    Dodaj Referencję
                  </Text3D>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
                    aria-label="Zamknij formularz dodawania referencji"
                    title="Zamknij"
                  >
                    ×
                  </button>
                </div>

                <AddReferenceForm
                  onSuccess={() => {
                    setShowAddForm(false)
                    fetchReferences()
                  }}
                  onCancel={() => setShowAddForm(false)}
                />
              </UnifiedCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </UnifiedLayout>
  )
}