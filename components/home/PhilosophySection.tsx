'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Heart, Quote, Target, Users } from 'lucide-react'
import Link from 'next/link'

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
    <section className="py-20">
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
              <Quote className="w-16 h-16 text-slate-600 mb-6" />
              <blockquote className="text-2xl sm:text-3xl font-display font-medium text-white leading-relaxed mb-6">
                „Dla gołębia trzeba być weterynarzem, dietetykiem, trenerem i opiekunem w jednym przez 365 dni w roku.
                Mistrzostwo to suma tysięcy drobiazgowych, codziennych czynności."
              </blockquote>
              <cite className="text-lg text-slate-200 font-medium">
                — Tadeusz Pałka, MTM Pałka
              </cite>
            </div>

            <p className="text-lg text-slate-200 leading-relaxed mb-8">
              Historia hodowli MTM Pałka sięga lat 70., kiedy Tadeusz Pałka rozpoczął swoją przygodę z gołębiami
              pocztowymi na strychu kamienicy w Lubaniu. W 2000 roku, po zakupie działki, postawił profesjonalny
              gołębnik, do którego dołączyli synowie Mariusz i Marcin, tworząc rodzinny tandem hodowlany.
              Pierwsze sukcesy przyszły już w 2001 roku.
              Przez ponad dwie dekady systematycznie rozbudowywali stado, które obecnie liczy około 120 ptaków.
              Regularnie osiągają sukcesy w konkursach.
            </p>

            <Link
              href="/heritage"
              className="inline-flex items-center glass-morphism hover:glass-morphism-strong text-white font-semibold px-8 py-4 rounded-lg transition-all duration-500"
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
                <div className="flex-shrink-0 w-12 h-12 glass-morphism rounded-lg flex items-center justify-center border-2 border-white" style={{
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.4), 0 16px 64px rgba(255, 255, 255, 0.2), 0 24px 96px rgba(255, 255, 255, 0.1)'
                }}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-slate-100 leading-relaxed">
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
