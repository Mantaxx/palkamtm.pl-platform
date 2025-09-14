'use client'

import { motion } from 'framer-motion'
import { Award, BookOpen, Heart, Lightbulb, Target, Users } from 'lucide-react'

const philosophyPrinciples = [
  {
    icon: Heart,
    title: 'Holistyczne Podejście',
    description: 'Dla gołębia trzeba być weterynarzem, dietetykiem, trenerem i opiekunem w jednym przez 365 dni w roku. To holistyczne podejście podkreśla, że mistrzostwo nie jest wynikiem jednego sekretnego składnika, ale sumą tysięcy drobiazgowych, codziennych czynności.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: Target,
    title: 'Rygor i Dyscyplina',
    description: 'W gołębniku panuje żelazna dyscyplina. Po oblocie gołębie są natychmiast zwoływane do środka i zamykane, a karmienie następuje dopiero po odczekaniu pół godziny. Taki rygor buduje u ptaków posłuszeństwo i nawyki, które procentują w dniu lotu.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Indywidualizacja Treningu',
    description: 'W przeciwieństwie do metod masowych, kładziemy nacisk na indywidualne podejście do każdego lotnika. Przygotowanie do lotu jest dostosowywane do konkretnego gołębia, jego kondycji i charakteru.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Award,
    title: 'Selekcja "w Ręku"',
    description: 'Oprócz wyników sportowych, niezwykle ważnym elementem selekcji jest ocena fizyczna ptaków. Gołąb musi spełniać nasze "własne wymogi" i idealnie "leżeć w ręku". To intuicyjne podejście, oparte na dekadach doświadczeń.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: BookOpen,
    title: 'Zasada 80/20',
    description: 'Struktura genetyczna hodowli opiera się na solidnym fundamencie, gdzie około 80% gołębi jest spokrewnionych. Pozostałe 20% to starannie wyselekcjonowane gołębie z innych czołowych hodowli.',
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Lightbulb,
    title: 'Mistrzowie Sprintu',
    description: 'Jesteśmy "Mistrzami Sprintu" i wielokrotnymi mistrzami Polski w Kategoriach A i B. Nasze metody są doskonale skalibrowane do osiągania maksymalnej szybkości w lotach sprinterskich.',
    color: 'from-indigo-500 to-blue-500',
  },
]

export function PhilosophySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6">
            Filozofia Hodowli
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Nasze podejście do hodowli gołębi pocztowych opiera się na sześciu fundamentalnych zasadach,
            które kształtują każdy aspekt naszej działalności
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {philosophyPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: index * 0.3 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 h-full">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${principle.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <principle.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="font-display font-bold text-xl text-gray-900 mb-4">
                  {principle.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-12 text-white">
            <h3 className="font-display font-bold text-3xl mb-6">
              Nasza Misja
            </h3>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              „Naszym celem jest nie tylko osiąganie najwyższych wyników sportowych, ale także
              budowanie genetycznego dziedzictwa, które będzie służyć przyszłym pokoleniom hodowców.
              Dążymy do tego, aby gołębie z linii MTM Pałka stały się fundamentem sukcesu dla innych
              czołowych hodowli w Polsce, tworząc w ten sposób trwałe dziedzictwo w polskim sporcie gołębiarskim."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
