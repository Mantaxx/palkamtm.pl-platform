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
    color: 'from-blue-500 to-cyan-500',
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
    color: 'from-indigo-500 to-blue-500',
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-6">
            Nowoczesne Metody
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Łączymy wieloletnie tradycje hodowli z najnowszymi osiągnięciami nauki i technologii,
            aby zapewnić naszym gołębiom najlepsze warunki rozwoju
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {modernMethods.map((method, index) => (
            <motion.div
              key={method.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: index * 0.3 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 h-full">
                <div className="flex items-start space-x-6">
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${method.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <method.icon className="w-8 h-8 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display font-bold text-xl text-gray-900 mb-3">
                      {method.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed mb-4">
                      {method.description}
                    </p>

                    <ul className="space-y-2">
                      {method.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
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
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-display font-bold text-3xl mb-6">
                  Technologia w Służbie Hodowli
                </h3>
                <p className="text-xl leading-relaxed mb-8 text-gray-300">
                  Nasze podejście opiera się na holistycznym traktowaniu każdego gołębia jako profesjonalnego sportowca.
                  Każdy aspekt hodowli jest precyzyjnie kontrolowany i dostosowany do indywidualnych potrzeb ptaka.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-400">365</div>
                    <div className="text-sm text-gray-400">Dni opieki</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-400">80/20</div>
                    <div className="text-sm text-gray-400">Strategia genetyczna</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-400">120</div>
                    <div className="text-sm text-gray-400">Gołębi w stadzie</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary-400">MTM</div>
                    <div className="text-sm text-gray-400">Mistrzowie Sprintu</div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-8">
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
