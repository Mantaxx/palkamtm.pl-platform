'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Mail, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function CheckEmailPage() {
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
                        Sprawdź email
                    </h2>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                            <Mail className="w-10 h-10 text-blue-600" />
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                        Email aktywacyjny został wysłany
                    </h3>

                    <p className="text-gray-600 mb-6">
                        Wysłaliśmy link aktywacyjny na adres:
                    </p>

                    <p className="font-medium text-primary-600 mb-6 break-all">
                        {email}
                    </p>

                    <p className="text-gray-600 mb-6">
                        Kliknij w link w emailu, aby aktywować swoje konto.
                        Link jest ważny przez 24 godziny.
                    </p>

                    <div className="space-y-4">
                        <button
                            onClick={handleResendEmail}
                            disabled={isResending}
                            className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50"
                        >
                            {isResending ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" />
                                    <span>Wysyłanie...</span>
                                </>
                            ) : (
                                <>
                                    <RefreshCw className="w-4 h-4" />
                                    <span>Wyślij ponownie</span>
                                </>
                            )}
                        </button>

                        {resendMessage && (
                            <p className={`text-sm ${resendMessage.includes('Błąd') ? 'text-red-600' : 'text-green-600'}`}>
                                {resendMessage}
                            </p>
                        )}

                        <Link
                            href="/auth/signin"
                            className="w-full inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
                        >
                            <span>Przejdź do logowania</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Nie otrzymałeś emaila? Sprawdź folder spam lub{' '}
                        <Link href="/contact" className="text-primary-600 hover:text-primary-500 font-medium">
                            skontaktuj się z nami
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    )
}
