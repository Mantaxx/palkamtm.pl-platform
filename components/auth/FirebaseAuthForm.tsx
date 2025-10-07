'use client'

import SMSAuth from '@/components/auth/SMSAuth'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type AuthMode = 'signin' | 'sms' | 'signup'

export default function FirebaseAuthForm() {
    const [mode, setMode] = useState<AuthMode>('signin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handleEmailSignIn = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            setError('Wprowadź email i hasło')
            return
        }

        setIsLoading(true)
        setError('')

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Sprawdź czy email jest zweryfikowany
            if (!user.emailVerified) {
                setError('Musisz zweryfikować swój email przed zalogowaniem. Sprawdź skrzynkę odbiorczą.')
                await signOut(auth)
                return
            }

            // Przekieruj do dashboard
            router.push('/dashboard')
        } catch (error: any) {
            console.error('Błąd logowania:', error)

            switch (error.code) {
                case 'auth/user-not-found':
                    setError('Nie znaleziono konta z tym adresem email')
                    break
                case 'auth/wrong-password':
                    setError('Nieprawidłowe hasło')
                    break
                case 'auth/invalid-email':
                    setError('Nieprawidłowy format email')
                    break
                case 'auth/too-many-requests':
                    setError('Zbyt wiele nieudanych prób. Spróbuj później.')
                    break
                case 'auth/user-disabled':
                    setError('Konto zostało zablokowane')
                    break
                default:
                    setError('Wystąpił błąd podczas logowania')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        setIsLoading(true)
        setError('')

        try {
            const provider = new GoogleAuthProvider()
            // Dodaj dodatkowe zakresy jeśli potrzebujesz
            provider.addScope('email')
            provider.addScope('profile')

            const result = await signInWithPopup(auth, provider)
            const user = result.user

            // console.log('Zalogowano przez Google:', user)

            // Przekieruj do dashboard
            // console.log('Przekierowywanie do dashboard...')
            router.push('/dashboard')
        } catch (error: any) {
            console.error('Błąd logowania przez Google:', error)

            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    setError('Okno logowania zostało zamknięte')
                    break
                case 'auth/popup-blocked':
                    setError('Okno logowania zostało zablokowane przez przeglądarkę')
                    break
                case 'auth/cancelled-popup-request':
                    setError('Anulowano logowanie')
                    break
                case 'auth/account-exists-with-different-credential':
                    setError('Konto z tym emailem już istnieje z inną metodą logowania')
                    break
                default:
                    setError('Wystąpił błąd podczas logowania przez Google')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleFacebookSignIn = async () => {
        setIsLoading(true)
        setError('')

        try {
            const provider = new FacebookAuthProvider()
            // Dodaj dodatkowe zakresy jeśli potrzebujesz
            provider.addScope('email')
            provider.addScope('public_profile')

            const result = await signInWithPopup(auth, provider)
            const user = result.user

            console.log('Zalogowano przez Facebook:', user)

            // Przekieruj do dashboard
            router.push('/dashboard')
        } catch (error: any) {
            console.error('Błąd logowania przez Facebook:', error)

            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    setError('Okno logowania zostało zamknięte')
                    break
                case 'auth/popup-blocked':
                    setError('Okno logowania zostało zablokowane przez przeglądarkę')
                    break
                case 'auth/cancelled-popup-request':
                    setError('Anulowano logowanie')
                    break
                case 'auth/account-exists-with-different-credential':
                    setError('Konto z tym emailem już istnieje z inną metodą logowania')
                    break
                case 'auth/facebook-auth-failed':
                    setError('Błąd autoryzacji Facebook')
                    break
                default:
                    setError('Wystąpił błąd podczas logowania przez Facebook')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleSMSAuth = () => {
        if (!phoneNumber.trim()) {
            setError('Wprowadź numer telefonu')
            return
        }

        // Formatuj numer telefonu (dodaj +48 jeśli nie ma)
        let formattedPhone = phoneNumber.trim()
        if (!formattedPhone.startsWith('+')) {
            if (formattedPhone.startsWith('48')) {
                formattedPhone = '+' + formattedPhone
            } else if (formattedPhone.startsWith('0')) {
                formattedPhone = '+48' + formattedPhone.substring(1)
            } else {
                formattedPhone = '+48' + formattedPhone
            }
        }

        setPhoneNumber(formattedPhone)
        setMode('sms')
    }

    const handleSMSSuccess = () => {
        router.push('/dashboard')
    }

    const handleSMSBack = () => {
        setMode('signin')
        setPhoneNumber('')
    }

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email.trim() || !password.trim()) {
            setError('Wprowadź email i hasło')
            return
        }

        if (password !== confirmPassword) {
            setError('Hasła nie są identyczne')
            return
        }

        if (password.length < 6) {
            setError('Hasło musi mieć co najmniej 6 znaków')
            return
        }

        setIsLoading(true)
        setError('')
        setSuccess('')

        try {
            // Utwórz konto Firebase
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user

            // Wyślij email weryfikacyjny
            await sendEmailVerification(user)

            setSuccess('Konto zostało utworzone! Sprawdź email i kliknij link weryfikacyjny.')

            // Wyloguj użytkownika do czasu weryfikacji
            await signOut(auth)

            // Przełącz na tryb logowania
            setMode('signin')

        } catch (error: any) {
            console.error('Błąd rejestracji:', error)

            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('Konto z tym adresem email już istnieje')
                    break
                case 'auth/invalid-email':
                    setError('Nieprawidłowy format email')
                    break
                case 'auth/weak-password':
                    setError('Hasło jest za słabe')
                    break
                default:
                    setError('Wystąpił błąd podczas rejestracji')
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (mode === 'sms') {
        return (
            <SMSAuth
                phoneNumber={phoneNumber}
                onSuccess={handleSMSSuccess}
                onBack={handleSMSBack}
            />
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md"
            >
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {mode === 'signin' ? 'Logowanie' : 'Rejestracja'}
                        </h1>
                        <p className="text-white/70">
                            {mode === 'signin'
                                ? 'Zaloguj się do swojego konta PAŁKA MTM'
                                : 'Utwórz nowe konto w PAŁKA MTM'
                            }
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                            <p className="text-red-300 text-sm">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                            <p className="text-green-300 text-sm">{success}</p>
                        </div>
                    )}

                    {/* Google Sign In */}
                    <motion.button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4 flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        {isLoading ? 'Logowanie...' : 'Zaloguj się przez Google'}
                    </motion.button>

                    {/* Facebook Sign In */}
                    <motion.button
                        onClick={handleFacebookSignIn}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-[#1877F2] text-white font-semibold rounded-xl hover:bg-[#166FE5] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-6 flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        {isLoading ? 'Logowanie...' : 'Zaloguj się przez Facebook'}
                    </motion.button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-transparent text-white/70">lub</span>
                        </div>
                    </div>

                    <form onSubmit={mode === 'signin' ? handleEmailSignIn : mode === 'signup' ? handleEmailSignUp : undefined} className="space-y-6">
                        {/* Email */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setError('')
                                }}
                                placeholder="Email"
                                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Hasło */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setError('')
                                }}
                                placeholder="Hasło"
                                className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Potwierdzenie hasła - tylko dla rejestracji */}
                        {mode === 'signup' && (
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                        setError('')
                                    }}
                                    placeholder="Potwierdź hasło"
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        )}

                        {/* Numer telefonu dla SMS */}
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value)
                                    setError('')
                                }}
                                placeholder="Numer telefonu (+48...)"
                                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Przyciski */}
                        <div className="space-y-4">
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (mode === 'signup' ? 'Rejestracja...' : 'Logowanie...') : (mode === 'signup' ? 'Zarejestruj się' : 'Zaloguj się')}
                            </motion.button>

                            <motion.button
                                type="button"
                                onClick={handleSMSAuth}
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Zaloguj się przez SMS
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-6 space-y-4 text-center">
                        <Link
                            href="/auth/reset-password"
                            className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
                        >
                            Zapomniałeś hasła?
                        </Link>

                        <div className="text-white/70 text-sm">
                            {mode === 'signin' ? (
                                <>
                                    Nie masz konta?{' '}
                                    <button
                                        onClick={() => setMode('signup')}
                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Zarejestruj się
                                    </button>
                                </>
                            ) : (
                                <>
                                    Masz już konto?{' '}
                                    <button
                                        onClick={() => setMode('signin')}
                                        className="text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Zaloguj się
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
