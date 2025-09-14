'use client'

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Mail, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ActivatePage() {
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
            case 'success':
                return <CheckCircle className="w-16 h-16 text-green-500" />
            case 'error':
            case 'expired':
                return <XCircle className="w-16 h-16 text-red-500" />
            default:
                return <Mail className="w-16 h-16 text-blue-500 animate-pulse" />
        }
    }

    const getStatusColor = () => {
        switch (status) {
            case 'success':
                return 'from-green-50 to-green-100'
            case 'error':
            case 'expired':
                return 'from-red-50 to-red-100'
            default:
                return 'from-blue-50 to-blue-100'
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full space-y-8"
            >
                <div className="text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">GP</span>
                        </div>
                    </div>

                    <h2 className="font-display font-bold text-3xl text-gray-900 mb-2">
                        Aktywacja konta
                    </h2>
                </div>

                <div className={`bg-gradient-to-br ${getStatusColor()} rounded-xl p-8 text-center`}>
                    <div className="flex justify-center mb-6">
                        {getStatusIcon()}
                    </div>

                    {status === 'loading' && (
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                Aktywowanie konta...
                            </h3>
                            <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        </div>
                    )}

                    {status === 'success' && (
                        <div>
                            <h3 className="text-xl font-semibold text-green-800 mb-4">
                                Konto aktywowane!
                            </h3>
                            <p className="text-green-700 mb-6">
                                Twoje konto zostało pomyślnie aktywowane. Możesz się teraz zalogować.
                            </p>
                            <Link
                                href="/auth/signin"
                                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                                <span>Przejdź do logowania</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}

                    {status === 'error' && (
                        <div>
                            <h3 className="text-xl font-semibold text-red-800 mb-4">
                                Błąd aktywacji
                            </h3>
                            <p className="text-red-700 mb-6">
                                {message}
                            </p>
                            <div className="space-y-3">
                                <Link
                                    href="/auth/signup"
                                    className="block w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                                >
                                    Zarejestruj się ponownie
                                </Link>
                                <Link
                                    href="/auth/signin"
                                    className="block w-full text-red-600 hover:text-red-700 font-medium py-2 px-6 transition-colors duration-200"
                                >
                                    Przejdź do logowania
                                </Link>
                            </div>
                        </div>
                    )}

                    {status === 'expired' && (
                        <div>
                            <h3 className="text-xl font-semibold text-red-800 mb-4">
                                Link wygasł
                            </h3>
                            <p className="text-red-700 mb-6">
                                Link aktywacyjny wygasł. Zarejestruj się ponownie, aby otrzymać nowy link.
                            </p>
                            <Link
                                href="/auth/signup"
                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                            >
                                <span>Zarejestruj się ponownie</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Masz problemy z aktywacją?{' '}
                        <Link href="/contact" className="text-primary-600 hover:text-primary-500 font-medium">
                            Skontaktuj się z nami
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
