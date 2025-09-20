'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">


      {/* Przyciski do podstron w jednym rzędzie na górze */}
      <div className="absolute top-8 left-80 z-20">
        <div className="flex items-center gap-3">
          {[
            { href: "/", icon: "fas fa-home", title: "Strona Główna", label: "Strona Główna" },
            { href: "/auctions", icon: "fas fa-gavel", title: "Aukcje", label: "Aukcje" },
            { href: "/heritage", icon: "fas fa-crown", title: "Nasze Dziedzictwo", label: "Dziedzictwo" },
            { href: "/champions", icon: "fas fa-trophy", title: "Championy", label: "Championy" },
            { href: "/breeder-meetings", icon: "fas fa-users", title: "Spotkania", label: "Spotkania" },
            { href: "/references", icon: "fas fa-star", title: "Referencje", label: "Referencje" },
            { href: "/press", icon: "fas fa-newspaper", title: "Prasa", label: "Prasa" },
            { href: "/about", icon: "fas fa-info-circle", title: "O nas", label: "O Nas" },
            { href: "/contact", icon: "fas fa-envelope", title: "Kontakt", label: "Kontakt" },
            { href: "/dashboard", icon: "fas fa-tachometer-alt", title: "Panel Klienta", label: "Panel Klienta" }
          ].map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -300, rotate: -360 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.4 + (index * 0.1),
                ease: "easeOut"
              }}
            >
              <Link href={item.href} className="glass-nav-button" title={item.title}>
                <i className={`${item.icon} relative z-10 text-3xl`}></i>
                <span className="relative z-10 text-sm">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Przyciski logowania i rejestracji w prawym górnym rogu */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-8 right-4 sm:right-8 z-20 flex items-center gap-2 sm:gap-3"
      >
        <Link href="/auth/signin" className="glass-nav-button" title="Zaloguj się">
          <i className="fas fa-sign-in-alt relative z-10 text-2xl"></i>
        </Link>
        <Link href="/auth/signup" className="glass-nav-button" title="Zarejestruj się">
          <i className="fas fa-user-plus relative z-10 text-2xl"></i>
        </Link>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 max-w-8xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          transition={{
            duration: 1.2,
            delay: 0.3,
            type: "spring",
            stiffness: 100,
            damping: 20
          }}
          className="relative"
        >
          <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mb-6 sm:mb-8 leading-tight relative transform-3d perspective-1000">
            {/* Enhanced 3D Glowing background effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.6, scale: 1.3 }}
              transition={{ duration: 4, delay: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0 bg-gradient-to-r from-slate-400/50 via-slate-300/50 to-slate-500/50 blur-3xl xl:blur-[4rem] 2xl:blur-[6rem] rounded-full animate-glow3D"
            />

            {/* 3D Main text with enhanced effects */}
            <motion.span
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 0.8, type: "spring", stiffness: 100 }}
              className="relative z-10 text-white drop-shadow-2xl neon-glow block transform-3d hover-3d-tilt"
            >
              Pałka MTM
            </motion.span>

            <motion.span
              className="block text-gradient bg-gradient-to-r from-slate-300 via-slate-200 to-slate-100 relative z-10 mt-2 sm:mt-4 transform-3d hover-3d-tilt"
              initial={{ opacity: 0, y: 30, rotateX: 15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, delay: 1.2, type: "spring", stiffness: 80 }}
            >
              {/* Enhanced 3D Shimmer overlay */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 3,
                  delay: 2,
                  repeat: Infinity,
                  repeatDelay: 4,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 animate-shimmer3D"
              />
              Mistrzowie Sprintu
            </motion.span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-blue-100 mb-8 sm:mb-12 max-w-7xl mx-auto leading-relaxed font-light px-6"
        >
          Pasja, tradycja i nowoczesność w hodowli gołębi pocztowych.
          <br className="hidden sm:block" />
          <span className="block sm:inline mt-2 sm:mt-0">
            <span className="text-cyan-200 font-medium">Tworzymy historię polskiego sportu gołębiarskiego</span> poprzez doskonałą hodowlę i nieustanne dążenie do perfekcji.
          </span>
        </motion.p>

        {/* Enhanced 3D Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.5 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center space-y-2 transform-3d perspective-1000">
            <motion.div
              animate={{ y: [0, 8, 0], rotateX: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 sm:w-6 sm:h-10 xl:w-8 xl:h-12 2xl:w-10 2xl:h-16 solid-morphism rounded-full flex justify-center hover-3d-lift"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-3 sm:h-4 xl:h-5 2xl:h-6 bg-gradient-to-b from-slate-300 to-slate-400 rounded-full mt-1 sm:mt-2 xl:mt-3 2xl:mt-4 animate-glow3D"
              />
            </motion.div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 3 }}
              className="text-white/70 text-xs sm:text-sm xl:text-base 2xl:text-lg font-medium tracking-wider solid-morphism px-3 py-1 xl:px-4 xl:py-2 2xl:px-6 2xl:py-3 rounded-full"
            >
              PRZEWIŃ
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
