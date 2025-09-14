'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Quote, Heart, Target, Users, ArrowRight } from 'lucide-react'

const philosophyValues = [
  {
    icon: Heart,
    title: 'Strategia 80/20',
    description: '80% gołębi spokrewnionych + 20% "świeżej krwi" z najlepszych hodowli europejskich',
  },
  {
    icon: Target,
    title: 'Selekcja "w Ręku"',
    description: 'Intuicyjna ocena budowy, skrzydła i "leżenia w ręku" - dekady doświadczeń',
  },
  {
    icon: Users,
    title: 'Hodowla-Matka',
    description: 'Geny MTM Pałka w 95% hodowli Mieczysława Bogonosa i 100% hodowli Koryciński',
  },
]

export function PhilosophySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Philosophy Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-8">
              <Quote className="w-16 h-16 text-primary-600 mb-6" />
              <blockquote className="text-2xl sm:text-3xl font-display font-medium text-gray-900 leading-relaxed mb-6">
                „Dla gołębia trzeba być weterynarzem, dietetykiem, trenerem i opiekunem w jednym przez 365 dni w roku. 
                Mistrzostwo to suma tysięcy drobiazgowych, codziennych czynności."
              </blockquote>
              <cite className="text-lg text-gray-600 font-medium">
                — Tadeusz Pałka, MTM Pałka
              </cite>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Od 2008 roku hodowla MTM Pałka z Lubania kształtuje polski sport gołębiarski. 
              Stado liczące około 120 gołębi, prowadzone przez tandem Tadeusza i Mariusza Pałków. 
              Filozofia 80/20, selekcja "w ręku" i indywidualizacja treningu sprawiły, że nasze geny 
              stały się fundamentem sukcesu dla setek hodowli w całej Polsce.
            </p>

            <Link
              href="/heritage"
              className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
            >
              <span>Poznaj Naszą Historię</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          {/* Right Column - Values */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {philosophyValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-gray-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
