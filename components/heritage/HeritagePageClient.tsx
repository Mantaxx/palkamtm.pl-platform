'use client'

import { ModernMethodsSection } from '@/components/heritage/ModernMethodsSection'
import { PhilosophySection } from '@/components/heritage/PhilosophySection'
import TimelineSection from '@/components/heritage/TimelineSection'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { Text3D } from '@/components/ui/Text3D'
import { motion } from 'framer-motion'

export default function HeritagePageClient() {
    return (
        <UnifiedLayout>
            {/* Hero Section */}
            <section className="relative z-10 pt-80 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <Text3D
                        variant="gradient"
                        intensity="high"
                        className="text-5xl md:text-6xl font-bold mb-6"
                    >
                        Nasze Dziedzictwo
                    </Text3D>
                    <p className="text-xl md:text-2xl text-slate-100 mb-8 max-w-3xl mx-auto">
                        Odkryj historię, filozofię i nowoczesne metody hodowli gołębi pocztowych MTM Pałka
                    </p>
                </div>
            </section>

            {/* Content Sections */}
            <div className="relative z-10 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Timeline Section */}
                    <section className="mb-20">
                        <div className="p-10 border-2 border-white rounded-3xl glass-morphism-strong">
                            <Text3D
                                variant="gradient"
                                intensity="medium"
                                className="text-3xl md:text-4xl font-bold mb-8 text-center"
                            >
                                Historia Hodowli
                            </Text3D>
                            <TimelineSection />
                        </div>
                    </section>

                    {/* Philosophy Section */}
                    <motion.section
                        className="mb-20"
                        initial={{ opacity: 0, x: 100, rotateY: 15 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            rotateY: 0,
                            scale: 1
                        }}
                        transition={{
                            duration: 1.2,
                            ease: "easeOut",
                            type: "spring",
                            stiffness: 100
                        }}
                        viewport={{ once: true, margin: "-200px" }}
                        whileHover={{
                            rotateY: -5,
                            scale: 1.02,
                            transition: { duration: 0.3 }
                        }}
                        style={{
                            transformStyle: "preserve-3d",
                            perspective: "1000px"
                        }}
                    >
                        <div className="p-10 border-2 border-white rounded-3xl glass-morphism-strong">
                            <Text3D
                                variant="gradient"
                                intensity="medium"
                                className="text-3xl md:text-4xl font-bold mb-8 text-center"
                            >
                                Filozofia Hodowli
                            </Text3D>
                            <PhilosophySection />
                        </div>
                    </motion.section>

                    {/* Modern Methods Section */}
                    <motion.section
                        initial={{ opacity: 0, x: -100, rotateY: -15 }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                            rotateY: 0,
                            scale: 1
                        }}
                        transition={{
                            duration: 1.2,
                            ease: "easeOut",
                            type: "spring",
                            stiffness: 100
                        }}
                        viewport={{ once: true, margin: "-200px" }}
                        whileHover={{
                            rotateY: 5,
                            scale: 1.02,
                            transition: { duration: 0.3 }
                        }}
                        style={{
                            transformStyle: "preserve-3d",
                            perspective: "1000px"
                        }}
                    >
                        <div className="p-10 border-2 border-white rounded-3xl glass-morphism-strong">
                            <Text3D
                                variant="gradient"
                                intensity="high"
                                className="text-3xl md:text-4xl font-bold mb-8 text-center"
                            >
                                Nowoczesne Metody
                            </Text3D>
                            <ModernMethodsSection />
                        </div>
                    </motion.section>
                </div>
            </div>
        </UnifiedLayout>
    )
}