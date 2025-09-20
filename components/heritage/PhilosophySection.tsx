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
    color: 'from-slate-500 to-slate-600',
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
    color: 'from-slate-500 to-slate-600',
  },
]

export function PhilosophySection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-100 via-slate-200/30 to-slate-300/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-slate-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-slate-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
            Filozofia Hodowli
          </h2>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Nasze podejście do hodowli gołębi pocztowych opiera się na sześciu fundamentalnych zasadach,
            które kształtują każdy aspekt naszej działalności
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {philosophyPrinciples.map((principle, index) => (
            <div key={principle.title} className="group">
              <div className="card-gradient h-full border-2 border-white shadow-xl">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-slate-500 to-slate-600 mb-6 shadow-lg`}>
                  <principle.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="font-display font-bold text-2xl text-slate-800 mb-4 group-hover:text-slate-600 transition-colors duration-300">
                  {principle.title}
                </h3>

                <p className="text-slate-600 leading-relaxed text-lg">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="card-gradient p-12 border-2 border-white shadow-xl">
            <h3 className="font-display font-bold text-4xl mb-8 text-gradient">
              Nasza Misja
            </h3>
            <p className="text-xl sm:text-2xl leading-relaxed max-w-5xl mx-auto text-slate-700">
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
