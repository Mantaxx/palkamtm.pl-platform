'use client'

import { motion } from 'framer-motion'
import { Award, Medal, Pause, Play, Star, Trophy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

// Mock data for timeline events (reusing from previous version)
const timelineEvents = [
  {
    year: 2001,
    title: 'Pierwsze Sukcesy z Nowym Stadem',
    achievements: [
      'Mistrz Oddziału Lubań - Kat. A (235,77 coef., 20 konkursów)',
      'I Wicemistrz Oddziału Lubań - Kat. B (503,62 coef., 16 konkursów)',
      'Mistrz Oddziału Lubań - GMO',
      'I Wicemistrz Okręgu Jelenia Góra - Kat. A (235,77 coef., 20 konkursów)',
      'IX Przodownik Okręgu Jelenia Góra - Kat. B (503,62 coef., 16 konkursów)',
      'I Wicemistrz Okręgu Jelenia Góra - GMO',
    ],
    icon: Star,
    color: 'bg-green-500',
  },
  {
    year: 2002,
    title: 'Mistrzostwo Oddziału i Okręgu',
    achievements: [
      'Mistrz Oddziału Lubań - Kat. A (501,52 coef., 20 konkursów)',
      'II Wicemistrz Oddziału Lubań - GMO (40 pkt)',
      'Mistrz Okręgu Jelenia Góra - Kat. A (501,52 coef., 20 konkursów)',
      'Mistrz Okręgu Jelenia Góra - GMO (40 pkt)',
      '50. Przodownik Regionu V - Kat. A (501,52 coef., 20 konkursów)',
      'II Przodownik Regionu V - Kat. B (168,11 coef., 16 konkursów)',
    ],
    icon: Trophy,
    color: 'bg-slate-500',
  },
  {
    year: 2003,
    title: 'Kompletne Mistrzostwo',
    achievements: [
      'Mistrz Oddziału Lubań - Kat. A (203,54 coef., 20 konkursów)',
      'Mistrz Oddziału Lubań - Kat. B (217,78 coef., 16 konkursów)',
      'Mistrz Oddziału Lubań - Kat. C (71,99 coef., 9 konkursów)',
      'Mistrz Oddziału Lubań - GMO (462,22 pkt)',
      'Mistrz Okręgu Jelenia Góra - Kat. A (203,54 coef., 20 konkursów)',
      'I Wicemistrz Okręgu Jelenia Góra - Kat. B (217,78 coef., 16 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. C (71,99 coef., 9 konkursów)',
      'VI Przodownik Okręgu Jelenia Góra - GMO (462,22 pkt)',
      '10. Przodownik Regionu V - Kat. A (203,54 coef., 20 konkursów)',
      '49. Przodownik Regionu V - Kat. B (217,78 coef., 16 konkursów)',
      '2. Miejsce Regionu V - Kat. C (971,99 pkt)',
      'II Przodownik Regionu V - Kat. D',
      '11. Przodownik Regionu V - GMP (1066,26 pkt)',
      '13. Przodownik Mistrzostw Polski - Kat. C (71,99 coef., 9 konkursów)',
      '28. Przodownik Mistrzostw Polski - GMP (1066,26 pkt)',
    ],
    icon: Award,
    color: 'bg-purple-500',
  },
  {
    year: 2004,
    title: 'Kontynuacja Dominacji',
    achievements: [
      'Mistrz Oddziału Lubań - Kat. A (180,91 coef., 20 konkursów)',
      'Mistrz Oddziału Lubań - Kat. B (196,07 coef., 16 konkursów)',
      'I Wicemistrz Oddziału Lubań - GMO',
      'Mistrz Okręgu Jelenia Góra - Kat. A (180,91 coef., 20 konkursów)',
      'I Przodownik Okręgu Jelenia Góra - Kat. B (196,07 coef., 16 konkursów)',
      'I Przodownik Okręgu Jelenia Góra - GMO',
      '18. Przodownik Regionu V - Kat. A (180,91 coef., 20 konkursów)',
      '35. Przodownik Regionu V - Kat. D (839,32 pkt)',
      '32. Przodownik Mistrzostw Polski - Kat. A (180,91 coef., 20 konkursów)',
    ],
    icon: Trophy,
    color: 'bg-yellow-500',
  },
  {
    year: 2005,
    title: 'Mistrzostwo Polski',
    achievements: [
      'Mistrz Oddziału Lubań - Kat. A (90,65 coef., 20 konkursów)',
      'Mistrz Oddziału Lubań - Kat. B (66,96 coef., 16 konkursów)',
      'I Wicemistrz Oddziału Lubań - GMO',
      'Mistrz Okręgu Jelenia Góra - Kat. A (90,65 coef., 20 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. B (66,96 coef., 16 konkursów)',
      'I Przodownik Okręgu Jelenia Góra - GMO',
      'II Wicemistrz Regionu V - Kat. A (90,65 coef., 20 konkursów)',
      'I Przodownik Mistrzostw Polski - Kat. A (90,65 coef., 20 konkursów)',
      'V Przodownik Mistrzostw Polski - Kat. B (66,96 coef., 16 konkursów)',
    ],
    icon: Trophy,
    color: 'bg-red-500',
  },
  {
    year: 2006,
    title: 'Kontynuacja Hodowli',
    achievements: [
      'Mistrz Oddziału Lubań - Kat. A (240,15 coef., 20 konkursów)',
      'Mistrz Oddziału Lubań - Kat. B (183,25 coef., 16 konkursów)',
      'Mistrz Oddziału Lubań - GMO (82,77 pkt, 15 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. A (199,28 coef., 20 konkursów)',
      'II Przodownik Okręgu Jelenia Góra - Kat. B (367,51 coef., 16 konkursów)',
      'I Wicemistrz Okręgu Jelenia Góra - GMO (82,77 pkt, 15 konkursów)',
      '18. Przodownik Regionu V - Kat. A (240,15 coef., 20 konkursów)',
      '24. Przodownik Regionu V - Kat. B (183,25 coef., 16 konkursów)',
      '3. Przodownik Regionu V - GMO (82,77 pkt, 15 konkursów)',
      'VI Przodownik Mistrzostw Polski - GMO (82,77 pkt, 15 konkursów)',
    ],
    icon: Medal,
    color: 'bg-indigo-500',
  },
  {
    year: 2007,
    title: 'Wysokie Osiągnięcia',
    achievements: [
      'Mistrz Oddziału Lubań - Kat. A (78,06 coef., 20 konkursów)',
      'II Wicemistrz Oddziału Lubań - GMO',
      'Mistrz Okręgu Jelenia Góra - Kat. A (78,06 coef., 20 konkursów)',
      'II Przodownik Regionu V - Kat. A (78,06 coef., 20 konkursów)',
      'I Przodownik Mistrzostw Polski - Kat. A (78,06 coef., 20 konkursów)',
    ],
    icon: Star,
    color: 'bg-pink-500',
  },
  {
    year: 2008,
    title: 'Wicemistrzostwo GMP',
    achievements: [
      'Mistrz Oddziału Lubań - Kat. A (49,88 coef., 20 konkursów)',
      'Mistrz Oddziału Lubań - Kat. B (158,27 coef., 16 konkursów)',
      'I Wicemistrz Oddziału Lubań - GMP (49,88 pkt)',
      'Mistrz Okręgu Jelenia Góra - Kat. A (49,88 coef., 20 konkursów)',
      'II Wicemistrz Okręgu Jelenia Góra - Kat. B (158,27 coef., 16 konkursów)',
      'I Wicemistrz Okręgu Jelenia Góra - GMP (49,88 pkt)',
      'Mistrz Regionu V - Kat. A (49,88 coef., 20 konkursów)',
      'XX Przodownik Regionu V - Kat. B (158,27 coef., 16 konkursów)',
      'I Wicemistrz Regionu V - GMP (49,88 pkt)',
      '20. Przodownik Regionu V - GMP (158,27 pkt)',
      '3. Przodownik Mistrzostw Polski - Kat. A (49,88 coef., 20 konkursów)',
    ],
    icon: Medal,
    color: 'bg-slate-500',
  },
  {
    year: 2009,
    title: 'Ogólnopolski Ranking',
    achievements: [
      'Mistrz Oddziału Lubań - Kat. A (82,33 coef., 20 konkursów)',
      'Mistrz Oddziału Lubań - Kat. B (81,43 coef., 16 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. A (82,33 coef., 20 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. B (81,43 coef., 16 konkursów)',
      'Mistrz Regionu V - Kat. A (82,33 coef., 20 konkursów)',
      '148. Przodownik Ogólnopolski - GMP (1401,99 pkt)',
    ],
    icon: Trophy,
    color: 'bg-violet-500',
  },
  {
    year: 2011,
    title: 'Hodowla MTM - Nowa Era',
    achievements: [
      'Mistrz Oddziału Lubań - Total dorosłych (611,73 coef., 70 konkursów)',
      'Mistrz Oddziału Lubań - Kat. A (161,32 coef., 20 konkursów)',
      'Mistrz Oddziału Lubań - Kat. B (51,32 coef., 16 konkursów)',
      'Mistrz Oddziału Lubań - Kat. C (84,07 coef., 9 konkursów)',
      'Mistrz Oddziału Lubań - Kat. M (59,36 coef., 6 konkursów)',
      'Mistrz Oddziału Lubań - Kat. D (296,71 pkt)',
      'Mistrz Oddziału Lubań - Kat. H (588,92 coef., 18 konkursów)',
      'Mistrz Oddziału Lubań - Roczne (534,49 coef., 20 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. A (20 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. B (16 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. C (9 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. D',
      'Mistrz Okręgu Jelenia Góra - Kat. M (6 konkursów)',
      'Mistrz Regionu V - Kat. B (16 konkursów)',
      'Mistrz Regionu V - Kat. D',
    ],
    icon: Award,
    color: 'bg-emerald-500',
  },
  {
    year: 2012,
    title: 'Rok Dominacji',
    achievements: [
      '8. Przodownik Mistrzostw Polski - Maraton (648,45 pkt)',
      '68. Przodownik Mistrzostw Polski - Olimpijskie (847,37 pkt)',
      'I Mistrz Oddziału Lubań - Kat. A (575,76 coef., 20 konkursów)',
      'I Mistrz Oddziału Lubań - Kat. B (160,25 coef., 16 konkursów)',
      'II Wicemistrz Oddziału Lubań - Kat. C (119,72 coef., 9 konkursów)',
      'I Mistrz Oddziału Lubań - M Maraton (103,06 pkt)',
      'I Mistrz Oddziału Lubań - Kat. D (855,28 pkt)',
      'I Mistrz Oddziału Lubań - GMO (1409,58 pkt)',
      'I Mistrz Oddziału Lubań - Kat. H (887,54 pkt)',
      'I Mistrz Oddziału Lubań - Roczne (413,58 coef., 20 konkursów)',
      'I Mistrz Oddziału Lubań - Olimpijskie (646,45 pkt)',
      'I Mistrz Oddziału Lubań - Total dorośli (1080,51 pkt)',
      'II Wicemistrz Oddziału Lubań - Total młodzi (150,62 pkt)',
    ],
    icon: Trophy,
    color: 'bg-teal-500',
  },
  {
    year: 2013,
    title: 'Rok Dominacji - MP i Region',
    achievements: [
      '13. Przodownik Mistrzostw Polski - Kat. B (685,69 coef., 16 konkursów)',
      'II Wicemistrz Mistrzostw Polski - Kat. A (66,43 coef., 20 konkursów)',
      '9. Przodownik Mistrzostw Polski - Roczne (227,84 coef., 20 konkursów)',
      '68. Przodownik Regionu V - GMP (1381,43 pkt)',
      'I Wicemistrz Regionu V - Kat. A (20 konkursów)',
      '1. Przodownik Regionu V - Kat. B (16 konkursów)',
      '1. Przodownik Regionu V - Roczne (20 konkursów)',
      '3. Przodownik Regionu V - Kat. D (45 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. A (20 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. B (16 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. H (18 konkursów)',
      'Supermistrz Okręgu Jelenia Góra (A+B+C+M+F)',
      'I Wicemistrz Okręgu Jelenia Góra - Roczne (20 konkursów)',
      'Mistrz Oddziału Lubań - Kat. A (66,43 coef., 20 konkursów)',
      'Mistrz Oddziału Lubań - Kat. B (87,62 coef., 16 konkursów)',
      '1. Przodownik Oddziału Lubań - Kat. C (525,46 coef., 9 konkursów)',
      'Mistrz Oddziału Lubań - Kat. D (679,51 coef., 45 konkursów)',
      'II Wicemistrz Oddziału Lubań - GMO (1373,93 pkt, 32 konkursy)',
      'Mistrz Oddziału Lubań - Kat. H (338,68 coef., 18 konkursów)',
      '3. Przodownik Oddziału Lubań - Roczne (1025,61 coef., 28 konkursów)',
      'I Wicemistrz Oddziału Lubań - Total młodzi (562,03 coef., 25 konkursów)',
      'Mistrz Oddziału Lubań - 5 najlepszych młodzi (1139,02 coef., 21 konkursów)',
    ],
    icon: Star,
    color: 'bg-orange-500',
  },
  {
    year: 2014,
    title: 'Podwójne Mistrzostwo Polski',
    achievements: [
      'Mistrz Mistrzostw Polski - Kat. B (661,38 coef., 16 konkursów)',
      'Mistrz Mistrzostw Polski - Kat. A (116,13 coef., 20 konkursów)',
      '22. Miejsce Mistrzostw Polski - Klasa Sport A (20 konkursów)',
      'Mistrz Regionu V - Kat. A (116,13 coef., 20 konkursów)',
      'Mistrz Regionu V - Kat. B (661,38 coef., 16 konkursów)',
      'I Mistrz Okręgu Jelenia Góra - Kat. A (116,13 coef., 20 konkursów)',
      'I Mistrz Okręgu Jelenia Góra - Kat. B (661,38 coef., 16 konkursów)',
      'I Mistrz Oddziału Lubań - Kat. A (116,13 coef., 20 konkursów)',
      'I Mistrz Oddziału Lubań - Kat. B (661,38 coef., 16 konkursów)',
      '5. Przodownik Oddziału Lubań - Kat. C (362,76 coef., 9 konkursów)',
      'I Mistrz Oddziału Lubań - Kat. D (557,24 pkt)',
      'I Mistrz Oddziału Lubań - Kat. H (577,48 pkt)',
      'I Mistrz Oddziału Lubań - Roczne (239,29 coef., 20 konkursów)',
      '2. Przodownik Oddziału Lubań - Lotniki (524,88 pkt)',
    ],
    icon: Trophy,
    color: 'bg-yellow-500',
  },
  {
    year: 2015,
    title: 'Rok Weryfikacji',
    achievements: [
      'Mistrz Mistrzostw Polski - Kat. A (86,77 coef., 20 konkursów)',
      '1. Przodownik Mistrzostw Polski - Kat. B (71,68 coef., 16 konkursów)',
      'Mistrz Regionu V - Kat. A (86,77 coef., 20 konkursów)',
      'Mistrz Okręgu Jelenia Góra - Kat. A (86,77 coef., 20 konkursów)',
      'I Mistrz Oddziału Lubań - Kat. A (86,77 coef., 20 konkursów)',
      'I Mistrz Oddziału Lubań - Kat. B (237,95 coef., 16 konkursów)',
      'I Mistrz Oddziału Lubań - Kat. C (199,65 coef., 9 konkursów)',
      'I Mistrz Oddziału Lubań - Kat. D (520,82 pkt, 45 konkursów)',
    ],
    icon: Medal,
    color: 'bg-lime-500',
  },
  {
    year: 2017,
    title: 'Rok Osiągnięć',
    achievements: [
      '54. Przodownik Mistrzostw Polski - GMP (148,16 pkt)',
      '1. Przodownik Oddziału Lubań - Kat. A (348,53 coef., 20 konkursów)',
      '1. Przodownik Oddziału Lubań - Kat. B (153,39 coef., 16 konkursów)',
    ],
    icon: Trophy,
    color: 'bg-violet-500',
  },
  {
    year: 2018,
    title: 'Wicemistrzostwo MP',
    achievements: [
      'I Wicemistrz Mistrzostw Polski - Kat. A (25,94 coef., 20 konkursów)',
      'I Wicemistrz Regionu V - Kat. A (25,94 coef., 20 konkursów)',
      'I Wicemistrz Okręgu Jelenia Góra - Kat. A (25,94 coef., 20 konkursów)',
      '16. Przodownik Oddziału Lubań - Total (XIII) (942,69 pkt)',
      'I Wicemistrz Oddziału Lubań - Kat. A (25,94 coef., 20 konkursów)',
      'I Mistrz Oddziału Lubań - Kat. B (35,74 coef., 16 konkursów)',
    ],
    icon: Medal,
    color: 'bg-rose-500',
  },
  {
    year: 2019,
    title: 'Podwójne Mistrzostwo',
    achievements: [
      'I Mistrz Oddziału Lubań - Kat. A (82,76 coef.)',
      'I Mistrz Oddziału Lubań - Kat. B (130,64 coef.)',
    ],
    icon: Trophy,
    color: 'bg-slate-500',
  },
  {
    year: 2021,
    title: 'Powrót do Formy',
    achievements: ['61. Przodownik Mistrzostw Polski - Kat. A (249,85 pkt)'],
    icon: Star,
    color: 'bg-sky-500',
  },
  {
    year: 2024,
    title: 'Współczesna Hodowla',
    achievements: ['13. Przodownik Mistrzostw Polski - Kat. A (85,05 pkt)'],
    icon: Star,
    color: 'bg-amber-500',
  },
]

export default function TimelineSection() {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const toggleAutoScroll = () => {
    setIsAutoScrolling(prev => !prev)
  }

  useEffect(() => {
    const stopScrolling = () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current)
        scrollIntervalRef.current = null
        setIsAutoScrolling(false)
      }
    }

    if (isAutoScrolling) {
      scrollIntervalRef.current = setInterval(() => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
          stopScrolling()
        } else {
          window.scrollBy({ top: 1, behavior: 'smooth' })
        }
      }, 15) // Szybkość przewijania (mniejsza wartość = szybciej)
    } else {
      stopScrolling()
    }

    const handleUserScroll = () => {
      if (isAutoScrolling) {
        stopScrolling()
      }
    }

    window.addEventListener('wheel', handleUserScroll)
    window.addEventListener('touchmove', handleUserScroll)

    return () => {
      stopScrolling()
      window.removeEventListener('wheel', handleUserScroll)
      window.removeEventListener('touchmove', handleUserScroll)
    }
  }, [isAutoScrolling])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-slate-400/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-slate-400/20 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gradient mb-6 drop-shadow-2xl">
            Nasze Osiągnięcia
          </h2>
          <p className="text-xl sm:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed">
            Ponad 20 lat dominacji w polskim sporcie gołębiarskim. Od pierwszych sukcesów w 2001 roku, przez wielokrotne mistrzostwa Polski, po współczesne osiągnięcia w hodowli
          </p>
          <div className="mt-8 flex justify-center">
            <motion.button
              type="button"
              onClick={toggleAutoScroll}
              className="flex items-center gap-3 px-6 py-3 rounded-full text-white font-semibold transition-all duration-300 glass-morphism-strong hover:bg-white/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAutoScrolling ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
              <span>{isAutoScrolling ? 'Zatrzymaj przewijanie' : 'Rozpocznij przewijanie'}</span>
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={event.year}
                className={`group relative ${isLeft ? 'md:col-start-1' : 'md:col-start-2'}`}
                initial={{
                  opacity: 0,
                  y: 50,
                  x: isLeft ? -100 : 100,
                  rotateX: -10,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                  rotateX: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 100,
                }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{
                  rotateY: isLeft ? 5 : -5,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Punkt zaczepienia */}
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${event.color} border-4 border-white shadow-2xl flex items-center justify-center mb-4`}>
                  <event.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>

                {/* Karta z osiągnięciami */}
                <div className="relative glass-morphism-strong border-2 border-white group-hover:border-slate-400 transition-all duration-300 rounded-xl p-4 md:p-6 lg:p-8 shadow-xl w-full overflow-hidden">
                  {/* Shimmer effect overlay */}
                  <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" />

                  {/* Card Content */}
                  <div className="flex items-center mb-6">
                    <motion.span
                      className="text-3xl font-bold text-white mr-6"
                      whileHover={{
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.5 },
                      }}
                    >
                      {event.year}
                    </motion.span>
                    <h3 className="text-2xl font-semibold text-white group-hover:text-slate-300 transition-colors duration-300">{event.title}</h3>
                  </div>

                  <div className="space-y-3">
                    {event.achievements.map((achievement, achievementIndex) => (
                      <motion.div
                        key={achievementIndex}
                        className="flex items-start space-x-3 text-slate-200 group-hover:text-white transition-colors duration-300"
                        initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: (index * 0.1) + (achievementIndex * 0.05),
                        }}
                        viewport={{ once: true }}
                      >
                        <motion.span
                          className="text-slate-400 mt-1 text-lg"
                          whileHover={{
                            rotate: 180,
                            scale: 1.2,
                            transition: { duration: 0.3 }
                          }}
                        >
                          •
                        </motion.span>
                        <span className="text-base leading-relaxed">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}
