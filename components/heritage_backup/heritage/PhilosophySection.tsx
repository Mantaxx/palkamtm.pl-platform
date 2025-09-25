'use client'

import { UnifiedCard } from '@/components/ui/UnifiedCard'
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
    title: 'Selekcja &quot;w Ręku&quot;',
    description: 'Oprócz wyników sportowych, niezwykle ważnym elementem selekcji jest ocena fizyczna ptaków. Gołąb musi spełniać nasze &quot;własne wymogi&quot; i idealnie &quot;leżeć w ręku&quot;. To intuicyjne podejście, oparte na dekadach doświadczeń.',
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
    description: 'Jesteśmy &quot;Mistrzami Sprintu&quot; i wielokrotnymi mistrzami Polski w Kategoriach A i B. Nasze metody są doskonale skalibrowane do osiągania maksymalnej szybkości w lotach sprinterskich.',
    color: 'from-slate-500 to-slate-600',
  },
]

export function PhilosophySection() {
  return (
    <section className="py-20 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-2xl">
            Filozofia Hodowli
          </h2>
          <p className="text-xl sm:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Nasze podejście do hodowli gołębi pocztowych opiera się na sześciu fundamentalnych zasadach,
            które kształtują każdy aspekt naszej działalności
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {philosophyPrinciples.map((principle) => (
            <UnifiedCard
              key={principle.title}
              variant="glass"
              glow={true}
              intensity="medium"
              className="group h-full p-8 border-2 border-white/20 bg-white/10 backdrop-blur-lg"
            >
              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out opacity-50 group-hover:opacity-100" />

              {/* Card Content */}
              <div className="h-full">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-blue-500/50 to-cyan-500/50 mb-6 shadow-lg`}>
                  <principle.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300">
                  {principle.title}
                </h3>

                <p className="text-white/70 leading-relaxed text-lg">
                  {principle.description}
                </p>
              </div>
            </UnifiedCard>
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
          <UnifiedCard variant="gradient" glow={true} className="p-12">
            <h3 className="font-display font-bold text-4xl mb-8 text-white">
              Nasza Misja
            </h3>
            <p className="text-xl sm:text-2xl leading-relaxed max-w-5xl mx-auto text-white/90">
              „Naszym celem jest nie tylko osiąganie najwyższych wyników sportowych, ale także
              budowanie genetycznego dziedzictwa, które będzie służyć przyszłym pokoleniom hodowców.
              Dążymy do tego, aby gołębie z linii MTM Pałka stały się fundamentem sukcesu dla innych
              czołowych hodowli w Polsce, tworząc w ten sposób trwałe dziedzictwo w polskim sporcie gołębiarskim.&quot;
            </p>
          </UnifiedCard>
        </motion.div>
      </div>
    </section>
  )
}