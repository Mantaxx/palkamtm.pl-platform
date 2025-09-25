'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image';

interface TimelineEvent {
    year: number
    title: string
    achievements: string[]
    color: string
}

const timelineEvents: TimelineEvent[] = [
    {
        year: 2000,
        title: 'Początek Hodowli',
        achievements: [
            'Rozpoczęcie hodowli gołębi pocztowych',
            'Pierwsze próby i eksperymenty',
            'Budowanie podstaw stada'
        ],
        color: '#10b981'
    },
    {
        year: 2001,
        title: 'Pierwsze Sukcesy z Nowym Stadem',
        achievements: [
            'Mistrz Oddziału Lubań - Kat. A (235,77 coef., 20 konkursów)',
            'I Wicemistrz Oddziału Lubań - Kat. B (503,62 coef., 16 konkursów)',
            'Mistrz Oddziału Lubań - GMO'
        ],
        color: '#10b981'
    },
    {
        year: 2002,
        title: 'Mistrzostwo Oddziału i Okręgu',
        achievements: [
            'Mistrz Oddziału Lubań - Kat. A (501,52 coef., 20 konkursów)',
            'II Wicemistrz Oddziału Lubań - GMO (40 pkt)',
            'Mistrz Okręgu Jelenia Góra - Kat. A (501,52 coef., 20 konkursów)'
        ],
        color: '#6366f1'
    },
    {
        year: 2003,
        title: 'Kompletne Mistrzostwo',
        achievements: [
            'Mistrz Oddziału Lubań - Kat. A (203,54 coef., 20 konkursów)',
            'Mistrz Oddziału Lubań - Kat. B (217,78 coef., 16 konkursów)',
            'Mistrz Oddziału Lubań - Kat. C (71,99 coef., 9 konkursów)'
        ],
        color: '#8b5cf6'
    },
    {
        year: 2007,
        title: 'Wysokie Osiągnięcia',
        achievements: [
            'Mistrz Oddziału Lubań - Kat. A (78,06 coef., 20 konkursów)',
            'II Wicemistrz Oddziału Lubań - GMO',
            'Mistrz Okręgu Jelenia Góra - Kat. A (78,06 coef., 20 konkursów)'
        ],
        color: '#ec4899'
    },
    {
        year: 2008,
        title: 'Wicemistrzostwo GMP',
        achievements: [
            'Mistrz Oddziału Lubań - Kat. A (49,88 coef., 20 konkursów)',
            'Mistrz Oddziału Lubań - Kat. B (158,27 coef., 16 konkursów)',
            'I Wicemistrz Oddziału Lubań - GMP (49,88 pkt)'
        ],
        color: '#64748b'
    },
    {
        year: 2009,
        title: 'Ogólnopolski Ranking',
        achievements: [
            'Mistrz Oddziału Lubań - Kat. A (82,33 coef., 20 konkursów)',
            'Mistrz Oddziału Lubań - Kat. B (81,43 coef., 16 konkursów)',
            'Mistrz Okręgu Jelenia Góra - Kat. A (82,33 coef., 20 konkursów)'
        ],
        color: '#f59e0b'
    },
    {
        year: 2013,
        title: 'Rok Dominacji - MP i Region',
        achievements: [
            '13. Przodownik Mistrzostw Polski - Kat. B (685,69 coef., 16 konkursów)',
            'II Wicemistrz Mistrzostw Polski - Kat. A (66,43 coef., 20 konkursów)',
            '9. Przodownik Mistrzostw Polski - Roczne (227,84 coef., 20 konkursów)'
        ],
        color: '#f97316'
    },
    {
        year: 2014,
        title: 'Podwójne Mistrzostwo Polski',
        achievements: [
            'Mistrz Mistrzostw Polski - Kat. B (661,38 coef., 16 konkursów)',
            'Mistrz Mistrzostw Polski - Kat. A (116,13 coef., 20 konkursów)',
            '22. Miejsce Mistrzostw Polski - Klasa Sport A (20 konkursów)'
        ],
        color: '#eab308'
    },
    {
        year: 2015,
        title: 'Rok Weryfikacji',
        achievements: [
            'Mistrz Mistrzostw Polski - Kat. A (86,77 coef., 20 konkursów)',
            '1. Przodownik Mistrzostw Polski - Kat. B (71,68 coef., 16 konkursów)',
            'Mistrz Regionu V - Kat. A (86,77 coef., 20 konkursów)'
        ],
        color: '#84cc16'
    },
    {
        year: 2017,
        title: 'Rok Osiągnięć',
        achievements: [
            '54. Przodownik Mistrzostw Polski - GMP (148,16 pkt)',
            '1. Przodownik Oddziału Lubań - Kat. A (348,53 coef., 20 konkursów)',
            '1. Przodownik Oddziału Lubań - Kat. B (153,39 coef., 16 konkursów)'
        ],
        color: '#a855f7'
    },
    {
        year: 2018,
        title: 'Wicemistrzostwo MP',
        achievements: [
            'I Wicemistrz Mistrzostw Polski - Kat. A (25,94 coef., 20 konkursów)',
            'I Wicemistrz Regionu V - Kat. A (25,94 coef., 20 konkursów)',
            'I Wicemistrz Okręgu Jelenia Góra - Kat. A (25,94 coef., 20 konkursów)'
        ],
        color: '#f43f5e'
    },
    {
        year: 2019,
        title: 'Podwójne Mistrzostwo',
        achievements: [
            'I Mistrz Oddziału Lubań - Kat. A (82,76 coef.)',
            'I Mistrz Oddziału Lubań - Kat. B (130,64 coef.)'
        ],
        color: '#06b6d4'
    }
]

export function CodePenTimeline() {
    const [scrollY, setScrollY] = useState(0)
    const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
    const appRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            const scroll = window.scrollY
            setScrollY(scroll)

            // Oblicz który rok powinien być aktualnie wyświetlany
            // const scrollStep = window.innerHeight
            // const newIndex = Math.min(Math.floor(scroll / scrollStep), timelineEvents.length - 1)
            // setCurrentYearIndex(newIndex) // This line is removed
        }

        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll)
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('scroll', handleScroll)
            }
        }
    }, [])

    useEffect(() => {
        if (appRef.current) {
            appRef.current.style.opacity = '1'
        }
    }, [])

    // Lista zdjęć z latami
    const yearImages = [
        'Gemini_Generated_Image_c7f94sc7f94sc7f9.png',
        'Gemini_Generated_Image_g29t5gg29t5gg29t.png',
        'Gemini_Generated_Image_gqwni1gqwni1gqwn.png',
        'Gemini_Generated_Image_jk1obojk1obojk1o.png',
        'Gemini_Generated_Image_jlvhbrjlvhbrjlvh.png',
        'Gemini_Generated_Image_kwzk4pkwzk4pkwzk.png',
        'Gemini_Generated_Image_plbvxvplbvxvplbv.png',
        'Gemini_Generated_Image_vrv4pbvrv4pbvrv4.png'
    ]

    const handleImageClick = (event: TimelineEvent) => {
        setSelectedEvent(event)
    }

    const closeDetail = () => {
        setSelectedEvent(null)
    }

    return (
        <div className="relative w-full bg-gradient-to-br from-gray-300 to-gray-600 font-montserrat">
            {/* Scroll Distance Indicator */}
            <div id="scrollDist" className="scrollDist">
                Scroll: {Math.round(scrollY)}px
            </div>

            {/* Main App Container */}
            <div
                ref={appRef}
                id="app"
                className="relative w-full h-screen opacity-0 transition-opacity duration-1000"
            >
                {/* Headlines SVG */}
                <svg
                    id="headlines"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="3"
                    viewBox="0 0 586 150"
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-4xl min-w-[450px] z-10"
                >
                    <g id="txt1">
                        <path d="M40.2,16.9c-5,0-9.1,1-12.3,3.1S23,25.1,23,29.3c0,4.1,1.6,7.3,4.8,9.5s10,4.6,20.5,7.1 c10.5,2.5,18.3,6.1,23.7,10.7c5.3,4.6,8,11.3,8,20.2c0,8.9-3.4,16.1-10.1,21.7c-6.7,5.5-15.5,8.3-26.4,8.3 c-16,0-30.1-5.5-42.5-16.5l10.8-13c10.3,9,21,13.4,32.1,13.4c5.5,0,10-1.2,13.2-3.6c3.3-2.4,4.9-5.5,4.9-9.5s-1.5-7-4.6-9.2 s-8.3-4.2-15.8-6c-7.5-1.8-13.2-3.5-17.1-5c-3.9-1.5-7.4-3.5-10.4-5.9c-6-4.6-9.1-11.6-9.1-21c0-9.4,3.4-16.7,10.3-21.8 C22.2,3.6,30.7,1,40.9,1c6.5,0,13,1.1,19.4,3.2c6.4,2.1,12,5.2,16.6,9.1l-9.2,13c-3-2.7-7.1-5-12.3-6.7 C50.3,17.8,45.2,16.9,40.2,16.9z" />
                        <path d="M147.9,89.9c5.9,0,11-1,15.3-3c4.3-2,8.8-5.2,13.4-9.6l11.1,11.4c-10.8,12-23.9,18-39.3,18 c-15.4,0-28.2-5-38.4-14.9c-10.2-9.9-15.3-22.5-15.3-37.7s5.2-27.8,15.5-38C120.6,6.1,133.7,1,149.6,1c15.8,0,29,5.8,39.6,17.5 l-11,12c-4.9-4.7-9.5-7.9-13.8-9.8c-4.3-1.8-9.4-2.8-15.3-2.8c-10.3,0-19,3.3-26,10c-7,6.7-10.5,15.2-10.5,25.6 c0,10.4,3.5,19,10.4,26C130.1,86.4,138.3,89.9,147.9,89.9z" />
                        <path d="M290.2,36.6c0,16.8-7.3,27.4-22,31.8l26.7,37.1H273l-24.4-34.3H226v34.3h-17.2V3.5h38 c15.6,0,26.7,2.6,33.4,7.9C286.9,16.6,290.2,25,290.2,36.6z M267.3,51.1c3.5-3,5.3-7.9,5.3-14.5c0-6.7-1.8-11.2-5.4-13.7 c-3.6-2.5-10-3.7-19.3-3.7H226v36.5h21.5C257.2,55.6,263.8,54.1,267.3,51.1z" />
                        <path d="M400.5,91.4c-10.3,10.1-23.1,15.1-38.3,15.1c-15.2,0-27.9-5-38.3-15.1c-10.3-10.1-15.5-22.6-15.5-37.7 s5.2-27.6,15.5-37.7C334.3,6,347,1,362.2,1c15.2,0,27.9,5,38.3,15.1c10.3,10.1,15.5,22.6,15.5,37.7S410.8,81.4,400.5,91.4z  M387.8,27.6c-7-7.2-15.5-10.8-25.6-10.8c-10.1,0-18.7,3.6-25.6,10.8c-7,7.2-10.4,15.9-10.4,26.2c0,10.3,3.5,19,10.4,26.2 c7,7.2,15.5,10.8,25.6,10.8c10.1,0,18.7-3.6,25.6-10.8c7-7.2,10.4-15.9,10.4-26.2C398.3,43.5,394.8,34.8,387.8,27.6z" />
                        <path d="M437.7,105.5V3.5h17.2v85.7h46.6v16.4H437.7z" />
                        <path d="M520.3,105.5V3.5h17.2v85.7h46.6v16.4H520.3z" />
                    </g>

                    <g id="txt2">
                        <path d="M210.7,1v16.2h-54.5v27h48.9v15.3h-48.9v27.3h56.2v16.2H139V1H210.7z" />
                        <path d="M311,1h17.2v102.1h-18.7l-57.8-74.5v74.5h-17.2V1h17.2L311,77.2V1z" />
                        <path d="M433.8,14.4c9.8,8.9,14.7,21.3,14.7,37.2c0,15.9-4.8,28.4-14.3,37.7c-9.5,9.2-24.1,13.9-43.8,13.9h-33.9V1h35 C409.9,1,423.9,5.5,433.8,14.4z M431.1,52c0-23.4-13.4-35-40.1-35h-17.2v69.9h19.1c12.4,0,21.8-2.9,28.4-8.8 C427.9,72.1,431.1,63.4,431.1,52z" />
                    </g>
                </svg>

                {/* Image Group with 3D Effect */}
                <div
                    id="imgGroup"
                    className="imgGroup"
                >
                    {timelineEvents.map((event, index) => {
                        // Oblicz pozycję 3D na podstawie scrolla - jak w oryginalnym kodzie
                        const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800
                        const scrollProgress = Math.max(0, Math.min(1, (scrollY - index * windowHeight) / windowHeight))

                        // Transformacje 3D - elementy startują zza ekranu i lecą na ciebie
                        const translateZ = scrollProgress * 1000 - 100 // -100px (za ekranem) do +900px (przed ekranem)
                        const scale = Math.max(1.0, Math.min(2.0, 1.0 + scrollProgress * 1.0)) // Skala od 1.0 do 2.0
                        const opacity = Math.max(0.8, Math.min(1, 0.8 + scrollProgress * 0.2)) // Opacity od 0.8 do 1

                        // Pozycjonowanie - elementy są widoczne od początku
                        const baseX = (index % 4) * 200 - 300
                        const baseY = Math.floor(index / 4) * 250 - 200
                        const parallaxX = baseX + (scrollY * 0.05)
                        const parallaxY = baseY + (scrollY * 0.02)

                        return (
                            <motion.div
                                key={event.year}
                                className="absolute w-48 h-32 rounded-lg cursor-pointer pointer-events-auto shadow-2xl hover:scale-110 transition-transform duration-300 flex flex-col items-center justify-center text-center p-4 overflow-hidden"
                                style={{
                                    left: `calc(50% + ${parallaxX}px)`,
                                    top: `calc(50% + ${parallaxY}px)`,
                                    transform: `translate(-50%, -50%) translateZ(${translateZ}px) scale(${scale})`,
                                    border: `3px solid ${event.color}`,
                                    boxShadow: `0 0 20px ${event.color}40`,
                                    background: `linear-gradient(135deg, ${event.color}20, ${event.color}40)`,
                                    backdropFilter: 'blur(10px)',
                                    opacity: opacity,
                                    zIndex: Math.round(translateZ / 100) + 1000
                                }}
                                onClick={() => handleImageClick(event)}
                                whileHover={{
                                    scale: 1.2,
                                    rotate: 10,
                                    zIndex: 1000,
                                    boxShadow: `0 0 40px ${event.color}80`,
                                    y: -10
                                }}
                                whileTap={{ scale: 0.95 }}
                                initial={{
                                    transform: 'translate(-50%, -50%) translateZ(-100px) scale(1.0)',
                                    opacity: 0.8
                                }}
                            >
                                <Image
                                    src={`/heritage/${yearImages[index % yearImages.length]}`}
                                    alt={`Osiągnięcia z ${event.year}`}
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 object-cover rounded-lg mb-2"
                                />
                                <div className="text-white font-bold text-2xl mb-2">{event.year}</div>
                                <div className="text-white text-sm opacity-90 leading-tight text-center">{event.title}</div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Detail Modal */}
                {selectedEvent && (
                    <motion.div
                        id="detail"
                        className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center p-8"
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        onClick={closeDetail}
                    >
                        <motion.div
                            id="detailImg"
                            className="w-full max-w-4xl h-96 mb-8 rounded-lg overflow-hidden flex items-center justify-center"
                            style={{
                                background: `linear-gradient(135deg, ${selectedEvent.color}40, ${selectedEvent.color}80)`,
                                border: `3px solid ${selectedEvent.color}`
                            }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <div className="text-center text-white">
                                <div className="text-6xl font-bold mb-4">{selectedEvent.year}</div>
                                <div className="text-3xl opacity-90">{selectedEvent.title}</div>
                            </div>
                        </motion.div>

                        <motion.div
                            id="detailTxt"
                            className="text-center text-gray-300 max-w-4xl"
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <h2 className="text-4xl font-bold mb-4 text-white">
                                Osiągnięcia z {selectedEvent.year}
                            </h2>
                            <div className="space-y-3 text-lg max-h-96 overflow-y-auto">
                                {selectedEvent.achievements.map((achievement, idx) => (
                                    <motion.p
                                        key={idx}
                                        className="text-gray-300 bg-gray-800 bg-opacity-50 p-3 rounded-lg"
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 + idx * 0.1, duration: 0.3 }}
                                    >
                                        • {achievement}
                                    </motion.p>
                                ))}
                            </div>
                        </motion.div>

                        <motion.button
                            onClick={closeDetail}
                            className="absolute top-8 right-8 text-white text-4xl hover:text-gray-400 transition-colors"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            ×
                        </motion.button>
                    </motion.div>
                )}

                {/* Custom Cursor */}
                <svg
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke="#fff"
                    className="absolute inset-0 pointer-events-none z-40"
                >
                    <g id="cursor">
                        <motion.circle
                            id="cursorCircle"
                            cx="50%"
                            cy="50%"
                            r="12"
                            strokeWidth="3"
                            className="text-white"
                            animate={{
                                r: 12,
                                strokeWidth: 3
                            }}
                            transition={{ type: "spring", stiffness: 500, damping: 28 }}
                        />
                    </g>
                </svg>
            </div>

            {/* Spacer for scroll effect - kończy się na 12500px */}
            <div className="spacer" />
        </div>
    )
}