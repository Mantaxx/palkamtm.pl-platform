'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { Text3D } from '@/components/ui/Text3D'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function CheckEmailPage() {
    const searchParams = useSearchParams()
    const message = searchParams.get('message')

    const isPhoneVerification = message === 'phone-verification-required'

    const title = isPhoneVerification ? 'Weryfikacja telefonu' : 'Sprawdź swoją skrzynkę mailową'
    const icon = isPhoneVerification ? <Phone className="w-16 h-16 text-blue-400" /> : <Mail className="w-16 h-16 text-blue-400" />
    const text = isPhoneVerification
        ? 'Aby dodawać zdjęcia, musisz najpierw zweryfikować swój numer telefonu. Przejdź do ustawień profilu, aby to zrobić.'
        : 'Wysłaliśmy Ci link aktywacyjny. Sprawdź swoją skrzynkę odbiorczą (oraz folder spam) i kliknij w link, aby dokończyć rejestrację.'

    return (
        <UnifiedLayout>
            <div className="min-h-screen flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-2xl"
                >
                    <UnifiedCard variant="glass" glow={true} className="p-8 text-center">
                        <div className="mx-auto w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                            {icon}
                        </div>
                        <Text3D variant="gradient" intensity="medium" className="text-3xl font-bold mb-4">
                            {title}
                        </Text3D>
                        <p className="text-white/80 text-lg mb-8 max-w-md mx-auto">
                            {text}
                        </p>
                        {isPhoneVerification ? (
                            <Link href="/dashboard?tab=settings" className="btn-primary">
                                Przejdź do ustawień
                            </Link>
                        ) : (
                            <p className="text-sm text-white/60">
                                Nie otrzymałeś emaila? <Link href="/auth/resend-activation" className="text-blue-400 hover:text-blue-300">Wyślij ponownie</Link>
                            </p>
                        )}
                    </UnifiedCard>
                </motion.div>
            </div>
        </UnifiedLayout>
    )
}
