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
    <section className="pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-20 xl:pt-10 xl:pb-24 2xl:pt-12 2xl:pb-32 relative overflow-hidden transform-3d perspective-2000">
      {/* Enhanced 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-4 sm:top-20 sm:right-20 xl:top-32 xl:right-32 2xl:top-40 2xl:right-40 w-36 h-36 sm:w-72 sm:h-72 xl:w-96 xl:h-96 2xl:w-[28rem] 2xl:h-[28rem] bg-slate-200/30 rounded-full blur-3xl animate-float3D"></div>
        <div className="absolute bottom-10 left-4 sm:bottom-20 sm:left-20 xl:bottom-32 xl:left-32 2xl:bottom-40 2xl:left-40 w-48 h-48 sm:w-96 sm:h-96 xl:w-[32rem] xl:h-[32rem] 2xl:w-[40rem] 2xl:h-[40rem] bg-slate-300/30 rounded-full blur-3xl animate-float3D animate-delay-3s"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 bg-gradient-to-r from-slate-300/20 to-slate-200/20 rounded-full blur-3xl animate-morph3D"></div>
      </div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gradient mb-4 sm:mb-6 px-4">
            MTM Pałka - Mistrzowie Sprintu
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-blue-100 max-w-6xl mx-auto leading-relaxed px-4">
            Legendarne gołębie, ekskluzywne aukcje i genetyczne dziedzictwo, które kształtuje polski sport gołębiarski
          </p>
        </motion.div>

        <div className="flex justify-center items-center gap-6 sm:gap-8 xl:gap-12 2xl:gap-16">
          {gridItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, scale: 0.9, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              viewport={{ once: true }}
              className="group transform-3d perspective-1000 w-80 sm:w-96 xl:w-[28rem] 2xl:w-[32rem]"
            >
              <Link href={item.link} className="block h-full">
                <div className="relative glass-morphism overflow-hidden h-full group rounded-xl border-2 border-white hover:glass-morphism-strong transition-all duration-500" style={{
                  boxShadow: '0 8px 32px rgba(255, 255, 255, 0.4), 0 16px 64px rgba(255, 255, 255, 0.2), 0 24px 96px rgba(255, 255, 255, 0.1)'
                }}>
                  {/* Image Section */}
                  <div className="relative h-32 sm:h-36 md:h-40 lg:h-44 xl:h-48 2xl:h-52 overflow-hidden">
                    {item.type === 'champion' ? (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500 flex items-center justify-center relative">
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-4 left-4 w-32 h-32 bg-blue-300/30 rounded-full blur-xl animate-float"></div>
                          <div className="absolute bottom-4 right-4 w-24 h-24 bg-cyan-300/30 rounded-full blur-lg animate-float animate-delay-2s"></div>
                        </div>
                        <div className="text-center relative z-10">
                          <motion.div
                            className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 2xl:w-40 2xl:h-40 glass-morphism-ultra rounded-full mx-auto mb-6 sm:mb-8 flex items-center justify-center hover-3d-rotate transform-3d"
                            whileHover={{ scale: 1.15, rotateY: 15, rotateX: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <span className="text-white font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl neon-glow animate-glow3D">ZP</span>
                          </motion.div>
                          <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white">
                            {item.subtitle}
                          </h3>
                        </div>
                      </div>
                    ) : item.type === 'auction' ? (
                      <div className="w-full h-full bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400 flex items-center justify-center relative">
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-6 left-6 w-28 h-28 bg-amber-300/30 rounded-full blur-xl animate-float"></div>
                          <div className="absolute bottom-6 right-6 w-20 h-20 bg-yellow-300/30 rounded-full blur-lg animate-float animate-delay-1-5s"></div>
                        </div>
                        <div className="text-center relative z-10">
                          <motion.div
                            className="transform-3d hover-3d-rotate"
                            whileHover={{ scale: 1.15, rotateY: -15, rotateX: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Calendar className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 text-amber-400 mx-auto mb-6 sm:mb-8 drop-shadow-lg animate-glow3D" />
                          </motion.div>
                          <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white">
                            {item.subtitle}
                          </h3>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-500 via-slate-400 to-slate-300 flex items-center justify-center relative">
                        {/* Animated background pattern */}
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-8 left-8 w-24 h-24 bg-purple-300/30 rounded-full blur-xl animate-float"></div>
                          <div className="absolute bottom-8 right-8 w-32 h-32 bg-pink-300/30 rounded-full blur-lg animate-float animate-delay-2-5s"></div>
                        </div>
                        <div className="text-center relative z-10">
                          <motion.div
                            className="transform-3d hover-3d-rotate"
                            whileHover={{ scale: 1.15, rotateY: 15, rotateX: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Quote className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32 text-purple-400 mx-auto mb-6 sm:mb-8 drop-shadow-lg animate-glow3D" />
                          </motion.div>
                          <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white">
                            {item.subtitle}
                          </h3>
                        </div>
                      </div>
                    )}

                    {/* Enhanced 3D Shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 animate-shimmer3D" />
                  </div>

                  {/* Content Section */}
                  <div className="p-6 sm:p-8 lg:p-10 xl:p-12 2xl:p-16">
                    <h3 className="font-display font-bold text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                      {item.title}
                    </h3>

                    {item.type === 'auction' && item.date && (
                      <div className="inline-flex items-center px-2 sm:px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                        {item.date}
                      </div>
                    )}

                    <p className="text-blue-100 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base md:text-lg">
                      {item.description}
                    </p>

                    <div className="flex items-center text-cyan-300 font-semibold group-hover:text-white transition-all duration-300 glass-morphism px-4 py-2 rounded-xl hover-3d-lift">
                      <span className="text-sm sm:text-base md:text-lg">
                        {item.type === 'champion' && 'Zobacz Profil'}
                        {item.type === 'auction' && 'Zobacz Aukcje'}
                        {item.type === 'philosophy' && 'Nasza Historia'}
                      </span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 xl:w-6 xl:h-6 ml-2 sm:ml-3 group-hover:translate-x-2 group-hover:rotate-12 transition-all duration-300 animate-glow3D" />
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
