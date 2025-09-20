'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { Text3D } from '@/components/ui/Text3D'
import { UnifiedButton } from '@/components/ui/UnifiedButton'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Mail, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

function ActivatePageContent() {
    const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'expired'>('loading')
    const [message, setMessage] = useState('')
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    useEffect(() => {
        if (!token) {
            setStatus('error')
            setMessage('Brak tokenu aktywacji')
            return
        }

        activateAccount(token)
    }, [token])

    const activateAccount = async (activationToken: string) => {
        try {
            const response = await fetch('/api/auth/activate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: activationToken }),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus('success')
                setMessage('Konto zostało pomyślnie aktywowane!')
            } else {
                if (data.message?.includes('wygasł') || data.message?.includes('expired')) {
                    setStatus('expired')
                    setMessage('Link aktywacyjny wygasł. Zarejestruj się ponownie.')
                } else {
                    setStatus('error')
                    setMessage(data.message || 'Błąd aktywacji konta')
                }
            }
        } catch (error) {
            setStatus('error')
            setMessage('Wystąpił błąd podczas aktywacji konta')
        }
    }

    const getStatusIcon = () => {
        switch (status) {
            case 'loading':
                return <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
            case 'success':
                return <CheckCircle className="w-16 h-16 text-green-400" />
            case 'error':
            case 'expired':
                return <XCircle className="w-16 h-16 text-red-400" />
            default:
                return <Mail className="w-16 h-16 text-white/60" />
        }
    }

    const getStatusColor = () => {
        switch (status) {
            case 'success':
                return 'text-green-200'
            case 'error':
            case 'expired':
                return 'text-red-200'
            default:
                return 'text-white/80'
        }
    }

    const getStatusTitle = () => {
        switch (status) {
            case 'loading':
                return 'Aktywacja konta...'
            case 'success':
                return 'Konto aktywowane!'
            case 'error':
                return 'Błąd aktywacji'
            case 'expired':
                return 'Link wygasł'
            default:
                return 'Aktywacja konta'
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
                                {getStatusIcon()}
                            </div>
                        </motion.div>

                        {/* Header */}
                        <Text3D
                            variant="neon"
                            intensity="high"
                            className="text-3xl font-bold mb-4"
                        >
                            {getStatusTitle()}
                        </Text3D>

                        <p className={`${getStatusColor()} mb-6`}>
                            {message}
                        </p>

                        {/* Action Buttons */}
                        {status === 'success' && (
                            <div className="space-y-4">
                                <UnifiedButton
                                    onClick={() => router.push('/auth/signin')}
                                    variant="primary"
                                    size="lg"
                                    intensity="high"
                                    glow={true}
                                    className="w-full"
                                >
                                    <div className="flex items-center justify-center">
                                        Zaloguj się
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </div>
                                </UnifiedButton>

                                <Link
                                    href="/"
                                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    Wróć do strony głównej
                                </Link>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="space-y-4">
                                <UnifiedButton
                                    onClick={() => router.push('/auth/signup')}
                                    variant="primary"
                                    size="lg"
                                    intensity="high"
                                    glow={true}
                                    className="w-full"
                                >
                                    <div className="flex items-center justify-center">
                                        Zarejestruj się ponownie
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </div>
                                </UnifiedButton>

                                <Link
                                    href="/auth/signin"
                                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    Spróbuj się zalogować
                                </Link>
                            </div>
                        )}

                        {status === 'expired' && (
                            <div className="space-y-4">
                                <UnifiedButton
                                    onClick={() => router.push('/auth/signup')}
                                    variant="primary"
                                    size="lg"
                                    intensity="high"
                                    glow={true}
                                    className="w-full"
                                >
                                    <div className="flex items-center justify-center">
                                        Zarejestruj się ponownie
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </div>
                                </UnifiedButton>

                                <Link
                                    href="/"
                                    className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                                >
                                    Wróć do strony głównej
                                </Link>
                            </div>
                        )}

                        {status === 'loading' && (
                            <div className="space-y-4">
                                <p className="text-white/80 text-sm">
                                    Proszę czekać, aktywujemy Twoje konto...
                                </p>
                            </div>
                        )}
                    </UnifiedCard>
                </motion.div>
            </div>
        </UnifiedLayout>
    )
}

export default function ActivatePage() {
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
                            Aktywujemy Twoje konto
                        </Text3D>
                    </UnifiedCard>
                </div>
            </UnifiedLayout>
        }>
            <ActivatePageContent />
        </Suspense>
    )
}