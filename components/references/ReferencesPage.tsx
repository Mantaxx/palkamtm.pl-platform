'use client'

import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, ExternalLink, MapPin, Plus, Quote, Star, Trophy, Users } from 'lucide-react'
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
      setError(err instanceof Error ? err.message : 'Wystąpił błąd')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddSuccess = () => {
    setShowAddForm(false)
    fetchReferences() // Odśwież listę referencji
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
              Referencje
            </h1>
            <p className="text-xl sm:text-2xl text-primary-100 max-w-3xl mx-auto leading-relaxed">
              Poznaj historie sukcesu hodowców, którzy wybrali nasze gołębie pocztowe
            </p>
            {session && (
              <div className="mt-8">
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Dodaj swoją referencję</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">5.0/5</div>
              <div className="text-gray-600">Średnia Ocena</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Add Reference Form Modal */}
      <AnimatePresence>
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <AddReferenceForm
                onSuccess={handleAddSuccess}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Case Studies */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6">
              Historie Sukcesu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Poznaj prawdziwe opowieści hodowców, którzy wybrali nasze gołębie i osiągnęli spektakularne wyniki w zawodach
            </p>
          </motion.div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Ładowanie referencji...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchReferences}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Spróbuj ponownie
              </button>
            </div>
          ) : references.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">Brak referencji do wyświetlenia</p>
              {session ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Dodaj pierwszą referencję</span>
                </button>
              ) : (
                <p className="text-gray-500">Zaloguj się, aby dodać referencję</p>
              )}
            </div>
          ) : (
            <div className="space-y-16">
              {references.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
                >
                  <div className="p-8 lg:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Breeder Info */}
                      <div className="lg:col-span-1">
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
                            <span className="text-primary-600 font-bold text-lg">
                              {study.breeder.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-display font-bold text-xl text-gray-900">
                              {study.breeder.name}
                            </h3>
                            <div className="flex items-center text-gray-600 text-sm">
                              <MapPin className="w-4 h-4 mr-1" />
                              {study.breeder.location}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-gray-600">
                            <Users className="w-5 h-5 mr-3" />
                            <span>{study.breeder.experience}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-5 h-5 mr-3" />
                            <span>Referencja z {format(new Date(study.date), 'dd MMMM yyyy', { locale: pl })}</span>
                          </div>
                          <div className="flex items-center">
                            {Array.from({ length: study.rating }).map((_, i) => (
                              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>

                        {/* Testimonial */}
                        <div className="bg-gray-50 rounded-xl p-6">
                          <Quote className="w-8 h-8 text-primary-600 mb-4" />
                          <blockquote className="text-gray-700 leading-relaxed italic">
                            {study.testimonial}
                          </blockquote>
                        </div>
                      </div>

                      {/* Achievements */}
                      <div className="lg:col-span-2">
                        <h4 className="font-display font-bold text-2xl text-gray-900 mb-6">
                          Osiągnięcia Gołębi
                        </h4>

                        <div className="space-y-6">
                          {study.achievements.map((achievement, idx) => (
                            <div key={idx} className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <h5 className="font-display font-bold text-lg text-gray-900">
                                    {achievement.pigeon}
                                  </h5>
                                  <p className="text-primary-600 font-medium">
                                    {achievement.ringNumber}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Trophy className="w-5 h-5 text-yellow-500" />
                                  <span className="text-sm font-medium text-gray-600">
                                    {achievement.results.length} wyników
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-3">
                                {achievement.results.map((result, resultIdx) => (
                                  <div key={resultIdx} className="flex items-center justify-between bg-white rounded-lg p-3">
                                    <div>
                                      <div className="font-medium text-gray-900">{result.competition}</div>
                                      <div className="text-sm text-gray-600">
                                        {format(new Date(result.date), 'dd MMMM yyyy', { locale: pl })}
                                      </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${result.place === 1
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : result.place === 2
                                        ? 'bg-gray-100 text-gray-800'
                                        : 'bg-orange-100 text-orange-800'
                                      }`}>
                                      {result.place}. miejsce
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6">
              Dołącz do Grona Zadowolonych Hodowców
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Odkryj, dlaczego nasi hodowcy osiągają tak spektakularne wyniki
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                <span>Zobacz Dostępne Gołębie</span>
                <ExternalLink className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold px-8 py-4 rounded-lg transition-colors duration-200">
                Skontaktuj się z Nami
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
