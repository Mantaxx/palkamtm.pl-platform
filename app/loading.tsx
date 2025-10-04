'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { Text3D } from '@/components/ui/Text3D'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function LoadingPage() {
    const [currentStep, setCurrentStep] = useState(0)
    const [progress, setProgress] = useState(0)

    const loadingSteps = [
        'Inicjalizacja systemu...',
        'Ładowanie danych hodowlanych...',
        'Przygotowywanie aukcji...',
        'Sprawdzanie autoryzacji...',
        'Finalizacja...'
    ]

    useEffect(() => {
        const stepInterval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < loadingSteps.length - 1) {
                    return prev + 1
                }
                return prev
            })
        }, 800)

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev < 100) {
                    return prev + Math.random() * 15
                }
                return 100
            })
        }, 200)

        return () => {
            clearInterval(stepInterval)
            clearInterval(progressInterval)
        }
    }, [loadingSteps.length])

    return (
        <UnifiedLayout showNavigation={false}>
            <div className="flex items-center justify-center relative overflow-hidden min-h-screen">
                {/* Tło z animowanymi elementami */}
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.2, 0.4, 0.2]
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    />
                </div>

                {/* Główny kontener ładowania */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10"
                >
                    <UnifiedCard
                        variant="3d"
                        glow={true}
                        className="p-12 text-center border-2 border-white/20 backdrop-blur-xl shadow-2xl"
                    >
                        {/* Logo/ikona ładowania */}
                        <motion.div
                            className="mb-8"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, type: "spring", stiffness: 200 }}
                        >
                            <div className="relative">
                                <motion.div
                                    className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full mx-auto"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                />
                                <motion.div
                                    className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-amber-400 rounded-full mx-auto"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                        </motion.div>

                        {/* Tytuł */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="mb-8"
                        >
                            <Text3D
                                variant="glow"
                                intensity="high"
                                className="text-3xl font-bold mb-2"
                            >
                                Hodowla Palka
                            </Text3D>
                            <Text3D
                                variant="shimmer"
                                intensity="medium"
                                className="text-lg opacity-80"
                            >
                                Przygotowujemy Twoje doświadczenie...
                            </Text3D>
                        </motion.div>

                        {/* Kroki ładowania */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="space-y-3 mb-8 max-w-md mx-auto"
                        >
                            {loadingSteps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{
                                        opacity: index <= currentStep ? 1 : 0.3,
                                        x: 0
                                    }}
                                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                                    className={`flex items-center space-x-3 transition-all duration-300 ${index === currentStep ? 'text-white' : 'text-gray-400'
                                        }`}
                                >
                                    <motion.div
                                        className={`w-3 h-3 rounded-full ${index < currentStep ? 'bg-green-400' :
                                            index === currentStep ? 'bg-white' : 'bg-gray-500'
                                            }`}
                                        animate={index === currentStep ? {
                                            scale: [1, 1.3, 1],
                                            opacity: [1, 0.7, 1]
                                        } : {}}
                                        transition={{
                                            duration: 0.8,
                                            repeat: index === currentStep ? Infinity : 0,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    <Text3D
                                        variant="glow"
                                        intensity={index === currentStep ? "medium" : "low"}
                                        className="text-sm"
                                    >
                                        {step}
                                    </Text3D>
                                    {index < currentStep && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-green-400"
                                        >
                                            ✓
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Pasek postępu */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9, duration: 0.6 }}
                            className="mb-4"
                        >
                            <div className="w-full max-w-sm mx-auto bg-gray-700/50 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-amber-400 to-white rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(progress, 100)}%` }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </div>
                            <motion.div
                                className="mt-2"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <Text3D variant="glow" intensity="low" className="text-sm">
                                    {Math.round(progress)}% ukończone
                                </Text3D>
                            </motion.div>
                        </motion.div>

                        {/* Dodatkowe informacje */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 0.6 }}
                            className="text-xs text-gray-400 space-y-1"
                        >
                            <p>Ładowanie może potrwać kilka sekund...</p>
                            <p>Proszę nie zamykać przeglądarki</p>
                        </motion.div>
                    </UnifiedCard>
                </motion.div>

                {/* Dekoracyjne elementy */}
                <motion.div
                    className="absolute top-10 left-10 w-2 h-2 bg-white/60 rounded-full"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.6, 1, 0.6]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute top-20 right-20 w-1 h-1 bg-amber-400/80 rounded-full"
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                />
                <motion.div
                    className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-white/40 rounded-full"
                    animate={{
                        y: [0, 20, 0],
                        opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
            </div>
        </UnifiedLayout>
    )
}
