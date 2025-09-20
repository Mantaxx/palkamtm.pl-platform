'use client'

import { motion } from 'framer-motion'
import { Activity, Database, Dna, Microscope, Smartphone, Utensils } from 'lucide-react'

const modernMethods = [
  {
    icon: Dna,
    title: 'Strategia 80/20',
    description: '80% gołębi spokrewnionych utrwala pożądane cechy, 20% "świeżej krwi" z linii Jansen, Gaby Vanebele i Kees Bosua wprowadza nowe geny.',
    features: [
      '80% gołębi spokrewnionych - utrwalenie cech',
      '20% import z najlepszych hodowli europejskich',
      'Linie Jansen, Gaby Vanebele, Kees Bosua',
      'Testowanie czy potomstwo jest "równorzędne" lub "szybsze"',
    ],
    color: 'from-slate-500 to-slate-600',
  },
  {
    icon: Utensils,
    title: 'Indywidualizacja Treningu',
    description: 'Przygotowanie do lotu dostosowane do konkretnego gołębia, jego kondycji i charakteru z systemami motywacyjnymi.',
    features: [
      'Pokazywanie samicy wybranym samcom przed koszowaniem',
      'Dostosowanie do indywidualnych potrzeb ptaka',
      'Uwzględnianie warunków pogodowych',
      'Motywacja "na dany dzień" dla sprintów',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Activity,
    title: 'Żelazna Dyscyplina',
    description: 'Po oblocie gołębie natychmiast zwoływane do środka, zamykane, karmienie dopiero po 30 minutach.',
    features: [
      'Natychmiastowe zwoływanie po oblocie',
      'Zamykanie gołębi po powrocie',
      'Karmienie dopiero po 30 minutach',
      'Minimalizacja czasu wahania przed wejściem',
    ],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Microscope,
    title: 'Selekcja "w Ręku"',
    description: 'Ocena "budowy", "skrzydła" i "wyglądu zewnętrznego" - gołąb musi "leżeć w ręku" i spełniać "własne wymogi".',
    features: [
      'Ocena fizyczna - budowa i skrzydło',
      'Intuicyjna ocena "leżenia w ręku"',
      'Eliminacja bez odpowiedniej budowy',
      'Selekcja witalności i inteligencji',
    ],
    color: 'from-purple-500 to-violet-500',
  },
  {
    icon: Smartphone,
    title: 'Mistrzowie Sprintu',
    description: 'Wielokrotni mistrzowie Polski w Kategoriach A i B - metody maksymalizujące szybkość i chęć powrotu.',
    features: [
      'Kategorie A (100-400 km) i B (300-600 km)',
      'Metody maksymalizujące szybkość',
      'Motywacja i forma "na dany dzień"',
      'Techniki dla krótkich i średnich dystansów',
    ],
    color: 'from-slate-500 to-slate-600',
  },
  {
    icon: Database,
    title: 'Hodowla-Matka',
    description: 'Geny MTM Pałka w 95% hodowli Mieczysława Bogonosa i 100% hodowli Koryciński - "system sukcesu".',
    features: [
      'Status "hodowli-matki" w branży',
      'Geny w setkach hodowli w Polsce',
      '"Genetyczny pakiet startowy"',
      'Pętla pozytywnego sprzężenia zwrotnego',
    ],
    color: 'from-yellow-500 to-orange-500',
  },
]

export function ModernMethodsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-100 via-slate-200/30 to-slate-300/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-slate-200/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-200/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6">
            Nowoczesne Metody
          </h2>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            Łączymy wieloletnie tradycje hodowli z najnowszymi osiągnięciami nauki i technologii,
            aby zapewnić naszym gołębiom najlepsze warunki rozwoju
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {modernMethods.map((method, index) => (
            <div key={method.title} className="group">
              <div className="card-gradient h-full border-2 border-white shadow-xl">
                <div className="flex items-start space-x-6">
                  <div className={`flex-shrink-0 w-20 h-20 rounded-2xl bg-gradient-to-r from-slate-500 to-slate-600 flex items-center justify-center shadow-lg`}>
                    <method.icon className="w-10 h-10 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display font-bold text-2xl text-slate-800 mb-4 group-hover:text-slate-600 transition-colors duration-300">
                      {method.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                      {method.description}
                    </p>

                    <ul className="space-y-3">
                      {method.features.map((feature, idx) => (
                        <motion.li key={idx} className="flex items-start">
                          <span className="text-slate-500 mr-3 mt-1 text-lg" aria-hidden="true">•</span>
                          <span className="text-base text-slate-600">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="glass-morphism-strong rounded-3xl p-12 text-white border-2 border-white shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-display font-bold text-3xl mb-6">
                  Technologia w Służbie Hodowli
                </h3>
                <p className="text-xl leading-relaxed mb-8 text-slate-200">
                  Nasze podejście opiera się na holistycznym traktowaniu każdego gołębia jako profesjonalnego sportowca.
                  Każdy aspekt hodowli jest precyzyjnie kontrolowany i dostosowany do indywidualnych potrzeb ptaka.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-400">365</div>
                    <div className="text-sm text-slate-300">Dni opieki</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-400">80/20</div>
                    <div className="text-sm text-slate-300">Strategia genetyczna</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-400">120</div>
                    <div className="text-sm text-slate-300">Gołębi w stadzie</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-400">MTM</div>
                    <div className="text-sm text-slate-300">Mistrzowie Sprintu</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-slate-500 to-slate-700 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Database className="w-12 h-12 text-white" />
                    </div>
                    <h4 className="font-semibold text-xl mb-2">Genetyczne Dziedzictwo</h4>
                    <p className="text-primary-100 text-sm">
                      Setki gołębi w hodowlach w całej Polsce niosących geny MTM Pałka.
                      Nasze gołębie stały się fundamentem sukcesu dla wielu innych czołowych hodowli.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
