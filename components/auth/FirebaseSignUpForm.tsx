'use client'

import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, sendEmailVerification, signInWithPopup, updateProfile } from 'firebase/auth'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, Phone, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SignUpFormData {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
    phoneNumber: string
}

export default function FirebaseSignUpForm() {
    const [formData, setFormData] = useState<SignUpFormData>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('')
    }

    const validateForm = () => {
        if (!formData.firstName.trim()) {
            setError('Imię jest wymagane')
            return false
        }
        if (!formData.lastName.trim()) {
            setError('Nazwisko jest wymagane')
            return false
        }
        if (!formData.email.trim()) {
            setError('Email jest wymagany')
            return false
        }
        if (!formData.password) {
            setError('Hasło jest wymagane')
            return false
        }
        if (formData.password.length < 6) {
            setError('Hasło musi mieć co najmniej 6 znaków')
            return false
        }
        if (formData.password !== formData.confirmPassword) {
            setError('Hasła nie są identyczne')
            return false
        }
        if (!formData.phoneNumber.trim()) {
            setError('Numer telefonu jest wymagany')
            return false
        }
        return true
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsLoading(true)
        setError('')

        try {
            // Tworzenie użytkownika w Firebase
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            )

            const user = userCredential.user

            // Aktualizacja profilu użytkownika
            await updateProfile(user, {
                displayName: `${formData.firstName} ${formData.lastName}`,
            })

            // Wysłanie emaila weryfikacyjnego
            await sendEmailVerification(user, {
                url: `${window.location.origin}/auth/verify-email?email=${encodeURIComponent(formData.email)}`,
                handleCodeInApp: false
            })

            setSuccess('Konto zostało utworzone! Sprawdź email w celu aktywacji konta.')

            // Wyczyść formularz
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                phoneNumber: ''
            })

        } catch (error: any) {
            console.error('Błąd rejestracji:', error)

            switch (error.code) {
                case 'auth/email-already-in-use':
                    setError('Ten email jest już używany')
                    break
                case 'auth/invalid-email':
                    setError('Nieprawidłowy format email')
                    break
                case 'auth/weak-password':
                    setError('Hasło jest zbyt słabe')
                    break
                default:
                    setError('Wystąpił błąd podczas rejestracji')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignUp = async () => {
        setIsLoading(true)
        setError('')

        try {
            const provider = new GoogleAuthProvider()
            // Dodaj dodatkowe zakresy jeśli potrzebujesz
            provider.addScope('email')
            provider.addScope('profile')

            const result = await signInWithPopup(auth, provider)
            const user = result.user

            console.log('Zarejestrowano przez Google:', user)

            // Przekieruj do dashboard
            router.push('/dashboard')
        } catch (error: any) {
            console.error('Błąd rejestracji przez Google:', error)

            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    setError('Okno rejestracji zostało zamknięte')
                    break
                case 'auth/popup-blocked':
                    setError('Okno rejestracji zostało zablokowane przez przeglądarkę')
                    break
                case 'auth/cancelled-popup-request':
                    setError('Anulowano rejestrację')
                    break
                case 'auth/account-exists-with-different-credential':
                    setError('Konto z tym emailem już istnieje z inną metodą logowania')
                    break
                default:
                    setError('Wystąpił błąd podczas rejestracji przez Google')
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleFacebookSignUp = async () => {
        setIsLoading(true)
        setError('')

        try {
            const provider = new FacebookAuthProvider()
            // Dodaj dodatkowe zakresy jeśli potrzebujesz
            provider.addScope('email')
            provider.addScope('public_profile')

            const result = await signInWithPopup(auth, provider)
            const user = result.user

            console.log('Zarejestrowano przez Facebook:', user)

            // Przekieruj do dashboard
            router.push('/dashboard')
        } catch (error: any) {
            console.error('Błąd rejestracji przez Facebook:', error)

            switch (error.code) {
                case 'auth/popup-closed-by-user':
                    setError('Okno rejestracji zostało zamknięte')
                    break
                case 'auth/popup-blocked':
                    setError('Okno rejestracji zostało zablokowane przez przeglądarkę')
                    break
                case 'auth/cancelled-popup-request':
                    setError('Anulowano rejestrację')
                    break
                case 'auth/account-exists-with-different-credential':
                    setError('Konto z tym emailem już istnieje z inną metodą logowania')
                    break
                case 'auth/facebook-auth-failed':
                    setError('Błąd autoryzacji Facebook')
                    break
                default:
                    setError('Wystąpił błąd podczas rejestracji przez Facebook')
            }
        } finally {
            setIsLoading(false)
        }
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
                        <h1 className="text-3xl font-bold text-white mb-2">Rejestracja</h1>
                        <p className="text-white/70">Utwórz konto w PAŁKA MTM</p>
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

                    {/* Google Sign Up */}
                    <motion.button
                        onClick={handleGoogleSignUp}
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
                        {isLoading ? 'Rejestracja...' : 'Zarejestruj się przez Google'}
                    </motion.button>

                    {/* Facebook Sign Up */}
                    <motion.button
                        onClick={handleFacebookSignUp}
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-[#1877F2] text-white font-semibold rounded-xl hover:bg-[#166FE5] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-6 flex items-center justify-center"
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                        {isLoading ? 'Rejestracja...' : 'Zarejestruj się przez Facebook'}
                    </motion.button>

                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-transparent text-white/70">lub</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Imię i Nazwisko */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Imię"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Nazwisko"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Numer telefonu */}
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input
                                type="tel"
                                name="phoneNumber"
                                placeholder="Numer telefonu (+48...)"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Hasło */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Hasło"
                                value={formData.password}
                                onChange={handleInputChange}
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

                        {/* Potwierdzenie hasła */}
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Potwierdź hasło"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>

                        {/* Przycisk rejestracji */}
                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Tworzenie konta...' : 'Zarejestruj się'}
                        </motion.button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-white/70 text-sm">
                            Masz już konto?{' '}
                            <Link href="/auth/signin" className="text-blue-400 hover:text-blue-300 transition-colors">
                                Zaloguj się
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
