'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Quote } from 'lucide-react'
import Link from 'next/link'

const gridItems = [
  {
    id: 1,
    title: 'Złota Para 1360x1184',
    subtitle: 'Fundament Genetyczny',
    description: 'Legendarna para - "1360" i samica 1184, współtwórcy genetycznego dziedzictwa MTM Pałka',
    image: '/api/placeholder/400/300',
    link: '/champions/zlota-para',
    type: 'champion' as const,
  },
  {
    id: 2,
    title: 'Ekskluzywne Aukcje',
    subtitle: 'Unikatowe Okazy',
    description: 'Wnuki "Małego Toma" i inne wyjątkowe championy dostępne w aukcjach',
    date: 'Aktualne',
    link: '/auctions',
    type: 'auction' as const,
  },
  {
    id: 3,
    title: 'Strategia 80/20',
    subtitle: 'Filozofia Hodowli',
    description: '80% gołębi spokrewnionych + 20% "świeżej krwi" z linii Jansen i Gaby Vanebele',
    link: '/heritage',
    type: 'philosophy' as const,
  },
]

export function BentoGrid() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
            MTM Pałka - Mistrzowie Sprintu
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Legendarne gołębie, ekskluzywne aukcje i genetyczne dziedzictwo, które kształtuje polski sport gołębiarski
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {gridItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={item.link} className="group block">
                <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                  {/* Image Section */}
                  <div className="relative h-64 lg:h-80">
                    {item.type === 'champion' ? (
                      <div className="w-full h-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-24 h-24 bg-primary-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <span className="text-white font-bold text-2xl">ZP</span>
                          </div>
                          <h3 className="font-display font-bold text-2xl text-primary-900">
                            {item.subtitle}
                          </h3>
                        </div>
                      </div>
                    ) : item.type === 'auction' ? (
                      <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-orange-200 flex items-center justify-center">
                        <div className="text-center">
                          <Calendar className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                          <h3 className="font-display font-bold text-2xl text-yellow-900">
                            {item.subtitle}
                          </h3>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-200 flex items-center justify-center">
                        <div className="text-center">
                          <Quote className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                          <h3 className="font-display font-bold text-2xl text-purple-900">
                            {item.subtitle}
                          </h3>
                        </div>
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                      {item.title}
                    </h3>

                    {item.type === 'auction' && item.date && (
                      <p className="text-primary-600 font-medium mb-3">
                        {item.date}
                      </p>
                    )}

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {item.description}
                    </p>

                    <div className="flex items-center text-primary-600 font-medium group-hover:text-primary-700 transition-colors">
                      <span>
                        {item.type === 'champion' && 'Zobacz Profil'}
                        {item.type === 'auction' && 'Zobacz Aukcje'}
                        {item.type === 'philosophy' && 'Nasza Historia'}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
