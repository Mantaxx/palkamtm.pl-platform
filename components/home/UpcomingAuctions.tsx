'use client'

import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Pusta lista nadchodzących aukcji - będzie pobierana z localStorage
const getUpcomingAuctions = () => {
  if (typeof window !== 'undefined') {
    const auctions = JSON.parse(localStorage.getItem('auctions') || '[]')
    return auctions.filter((auction: any) => new Date(auction.endTime) > new Date())
  }
  return []
}

export function UpcomingAuctions() {
  const [upcomingAuctions, setUpcomingAuctions] = useState<any[]>([])

  useEffect(() => {
    setUpcomingAuctions(getUpcomingAuctions())
  }, [])

  if (upcomingAuctions.length === 0) {
    return null // Nie pokazuj sekcji, jeśli nie ma aukcji
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            Nadchodzące Aukcje
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nie przegap okazji na zdobycie wyjątkowych championów
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {upcomingAuctions.map((auction, index) => (
            <motion.div
              key={auction.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/auctions/${auction.id}`} className="group block">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white">
                    <h3 className="font-display font-bold text-xl mb-2">
                      {auction.title}
                    </h3>
                    <p className="text-primary-100 text-sm">
                      {auction.description}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-3 text-primary-600" />
                        <div>
                          <div className="font-medium text-sm">Rozpoczęcie</div>
                          <div className="text-sm">
                            {format(new Date(auction.createdAt), 'dd MMMM yyyy', { locale: pl })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600">
                        <Clock className="w-5 h-5 mr-3 text-primary-600" />
                        <div>
                          <div className="font-medium text-sm">Zakończenie</div>
                          <div className="text-sm">
                            {format(new Date(auction.endTime), 'dd MMMM yyyy HH:mm', { locale: pl })}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Category */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-900">Kategoria</span>
                        <span className="text-sm text-gray-500">{auction.category}</span>
                      </div>
                      {auction.bloodline && (
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-900">Linia krwi</span>
                          <span className="text-sm text-gray-500">{auction.bloodline}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                      <span>Zobacz Aukcję</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/auctions"
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
          >
            <span>Zobacz Wszystkie Aukcje</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
