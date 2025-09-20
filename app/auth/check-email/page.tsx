'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { Text3D } from '@/components/ui/Text3D'
import { UnifiedButton } from '@/components/ui/UnifiedButton'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { motion } from 'framer-motion'
import { ArrowRight, Mail, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'

function CheckEmailPageContent() {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const [isResending, setIsResending] = useState(false)
    const [resendMessage, setResendMessage] = useState('')

    const handleResendEmail = async () => {
        if (!email) return

        setIsResending(true)
        setResendMessage('')

        try {
            const response = await fetch('/api/auth/resend-activation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (response.ok) {
                setResendMessage('Email aktywacyjny został ponownie wysłany!')
            } else {
                setResendMessage(data.message || 'Błąd wysyłania emaila')
            }
        } catch (error) {
            setResendMessage('Wystąpił błąd podczas wysyłania emaila')
        } finally {
            setIsResending(false)
        }
    }

    return (
        <UnifiedLayout>
            <div className="min-h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md mx-auto px-4"
                >
                    <UnifiedCard variant="3d" glow={true} className="p-8 text-center">
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-6"
                        >
                            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-white/80 to-white/60 rounded-full flex items-center justify-center">
                                <Mail className="w-10 h-10 text-white" />
                            </div>
                        </motion.div>

                        {/* Header */}
                        <Text3D
                            variant="neon"
                            intensity="high"
                            className="text-3xl font-bold mb-4"
                        >
                            Sprawdź email
                        </Text3D>

                        <p className="text-white/90 mb-6">
                            Wysłaliśmy link aktywacyjny na adres:
                        </p>

                        {email && (
                            <div className="glass-morphism-strong p-4 rounded-lg mb-6">
                                <p className="text-white font-medium">{email}</p>
                            </div>
                        )}

                        <p className="text-white/80 text-sm mb-8">
                            Kliknij link w emailu, aby aktywować konto. Sprawdź także folder spam.
                        </p>

                        {/* Resend Button */}
                        {email && (
                            <div className="space-y-4">
                                <UnifiedButton
                                    onClick={handleResendEmail}
                                    variant="outline"
                                    size="lg"
                                    intensity="medium"
                                    disabled={isResending}
                                    className="w-full"
                                >
                                    {isResending ? (
                                        <div className="flex items-center justify-center">
                                            <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                                            Wysyłanie...
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center">
                                            <RefreshCw className="w-5 h-5 mr-2" />
                                            Wyślij ponownie
                                        </div>
                                    )}
                                </UnifiedButton>

                                {resendMessage && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`p-3 rounded-lg text-sm ${resendMessage.includes('wysłany')
                                            ? 'bg-green-500/20 text-green-200 border border-green-500/30'
                                            : 'bg-red-500/20 text-red-200 border border-red-500/30'
                                            }`}
                                    >
                                        {resendMessage}
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {/* Back to Login */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <Link
                                href="/auth/signin"
                                className="text-white/70 hover:text-white transition-colors duration-200 text-sm flex items-center justify-center"
                            >
                                <ArrowRight className="w-4 h-4 mr-2" />
                                Wróć do logowania
                            </Link>
                        </div>
                    </UnifiedCard>
                </motion.div>
            </div>
        </UnifiedLayout>
    )
}

export default function CheckEmailPage() {
    return (
        <Suspense fallback={
            <UnifiedLayout>
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
                    </div>
                    <UnifiedCard
                        variant="3d"
                        glow={true}
                        className="p-12 text-center border-2 border-white/20 backdrop-blur-xl relative z-10 shadow-2xl"
                    >
                        <div className="relative mb-8">
                            <div className="w-20 h-20 border-4 border-white/30 border-t-white rounded-full mx-auto animate-spin" />
                            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-amber-400 rounded-full mx-auto animate-spin [animation-direction:reverse] [animation-duration:2s]" />
                        </div>
                        <Text3D variant="glow" intensity="high" className="text-2xl font-bold mb-2">
                            Ładowanie...
                        </Text3D>
                        <Text3D variant="shimmer" intensity="medium" className="text-lg">
                            Sprawdzamy Twoje dane
                        </Text3D>
                    </UnifiedCard>
                </div>
            </UnifiedLayout>
        }>
            <CheckEmailPageContent />
        </Suspense>
    )
}