'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Trophy } from 'lucide-react'
import Link from 'next/link'

const featuredChampions = [
  {
    id: 1,
    name: 'Generał 1726',
    ringNumber: 'PL-xxxx-99-1726',
    bloodline: 'MTM Pałka - Fundament hodowli',
    achievements: ['"Wydał nam naprawdę lotników"', 'Ojciec i dziadek wielu czołowych lotników'],
    image: '/api/placeholder/300/300',
    link: '/champions/general-1726',
  },
  {
    id: 2,
    name: 'Zawodowiec',
    ringNumber: 'PL-xxxx-xx-xxxx',
    bloodline: 'MTM Pałka - Linia szpak',
    achievements: ['2x 1. nagroda w oddziale', 'Dziadek gołębia 18071'],
    image: '/api/placeholder/300/300',
    link: '/champions/zawodowiec',
  },
  {
    id: 3,
    name: 'Mały Tom',
    ringNumber: 'PL-xxxx-xx-xxxx',
    bloodline: 'MTM Pałka - Wysokie ceny',
    achievements: ['Wnuki osiągają 1000 zł na aukcjach', 'Niezwykle ceniona linia'],
    image: '/api/placeholder/300/300',
    link: '/champions/maly-tom',
  },
]

export function FeaturedChampions() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            Legendarne Gołębie MTM Pałka
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Poznaj fundamenty genetyczne, które ukształtowały polski sport gołębiarski
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredChampions.map((champion, index) => (
            <motion.div
              key={champion.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={champion.link} className="group block">
                <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-white" style={{
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.4), 0 16px 64px rgba(255, 255, 255, 0.2), 0 24px 96px rgba(255, 255, 255, 0.1)'
                }}>
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-slate-200 to-slate-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-32 h-32 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-3xl">
                          {champion.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Trophy className="w-4 h-4 mr-1" />
                        Champion
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                      {champion.name}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">Obrączka:</span>
                        <span className="ml-2 font-mono">{champion.ringNumber}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <span className="font-medium">Linia krwi:</span>
                        <span className="ml-2">{champion.bloodline}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-gray-900 text-sm">Osiągnięcia:</h4>
                      {champion.achievements.slice(0, 2).map((achievement, idx) => (
                        <div key={idx} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                      <span>Zobacz Profil</span>
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
            href="/champions"
            className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
          >
            <span>Zobacz Wszystkich Championów</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
