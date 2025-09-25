'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { Text3D } from '@/components/ui/Text3D'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, Lock, LogIn, Mail, UserPlus } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')

    // Sign In State
    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    })
    const [showSignInPassword, setShowSignInPassword] = useState(false)
    const [signInLoading, setSignInLoading] = useState(false)
    const [signInError, setSignInError] = useState('')

    // Sign Up State
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    })
    const [showSignUpPassword, setShowSignUpPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [signUpLoading, setSignUpLoading] = useState(false)
    const [signUpError, setSignUpError] = useState('')

    const router = useRouter()

    // Sign In Handler
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setSignInLoading(true)
        setSignInError('')

        try {
            const result = await signIn('credentials', {
                email: signInData.email,
                password: signInData.password,
                redirect: false,
            })

            if (result?.error) {
                if (result.error.includes('aktywowane')) {
                    setSignInError(result.error)
                } else if (result.error.includes('CredentialsSignin')) {
                    setSignInError('Nieprawidłowy email lub hasło. Sprawdź dane i spróbuj ponownie.')
                } else if (result.error.includes('CallbackRouteError')) {
                    setSignInError('Wystąpił błąd podczas uwierzytelniania. Spróbuj ponownie za chwilę.')
                } else {
                    setSignInError('Wystąpił błąd podczas logowania. Spróbuj ponownie.')
                }
            } else {
                router.push('/dashboard')
            }
        } catch (error) {
            console.error('Sign in error:', error)
            setSignInError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie za chwilę.')
        } finally {
            setSignInLoading(false)
        }
    }

    // Sign Up Handler
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setSignUpLoading(true)
        setSignUpError('')

        // Validation
        if (signUpData.password !== signUpData.confirmPassword) {
            setSignUpError('Hasła nie są identyczne')
            setSignUpLoading(false)
            return
        }

        if (signUpData.password.length < 8) {
            setSignUpError('Hasło musi mieć co najmniej 8 znaków')
            setSignUpLoading(false)
            return
        }

        if (!signUpData.acceptTerms) {
            setSignUpError('Musisz zaakceptować regulamin')
            setSignUpLoading(false)
            return
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: signUpData.email,
                    password: signUpData.password,
                }),
            })

            const data = await response.json()

            if (response.ok) {
                router.push('/auth/check-email')
            } else {
                setSignUpError(data.error || 'Wystąpił błąd podczas rejestracji')
            }
        } catch (error) {
            setSignUpError('Wystąpił błąd podczas rejestracji')
        } finally {
            setSignUpLoading(false)
        }
    }

    const handleSignInInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSignInData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSignUpInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setSignUpData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    return (
        <UnifiedLayout>
            <div className="min-h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-2xl mx-auto px-4"
                >
                    <UnifiedCard
                        variant="glass"
                        glow={true}
                        className="p-6 border border-white/60 shadow-2xl bg-white/10 backdrop-blur-xl rounded-3xl"
                    >
                        {/* Header */}
                        <div className="text-center mb-6">
                            <Text3D
                                variant="neon"
                                intensity="high"
                                className="text-2xl font-bold mb-2 text-white"
                            >
                                {activeTab === 'signin' ? 'Zaloguj się' : 'Zarejestruj się'}
                            </Text3D>
                            <p className="text-white/90 text-sm">
                                {activeTab === 'signin'
                                    ? 'Wprowadź swoje dane, aby się zalogować'
                                    : 'Stwórz konto, aby rozpocząć przygodę z gołębiami'
                                }
                            </p>
                        </div>

                        {/* Tabs */}
                        <div className="flex mb-6 bg-white/10 rounded-xl p-1">
                            <button
                                onClick={() => setActiveTab('signin')}
                                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === 'signin'
                                        ? 'bg-white/20 text-white shadow-lg'
                                        : 'text-white/70 hover:text-white/90'
                                    }`}
                            >
                                <LogIn className="w-4 h-4 mr-2" />
                                Logowanie
                            </button>
                            <button
                                onClick={() => setActiveTab('signup')}
                                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === 'signup'
                                        ? 'bg-white/20 text-white shadow-lg'
                                        : 'text-white/70 hover:text-white/90'
                                    }`}
                            >
                                <UserPlus className="w-4 h-4 mr-2" />
                                Rejestracja
                            </button>
                        </div>

                        {/* Error Messages */}
                        <AnimatePresence mode="wait">
                            {signInError && activeTab === 'signin' && (
                                <motion.div
                                    key="signin-error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-xl"
                                >
                                    <p className="text-red-600 text-sm">{signInError}</p>
                                </motion.div>
                            )}
                            {signUpError && activeTab === 'signup' && (
                                <motion.div
                                    key="signup-error"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-xl"
                                >
                                    <p className="text-red-600 text-sm">{signUpError}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Forms */}
                        <AnimatePresence mode="wait">
                            {activeTab === 'signin' ? (
                                <motion.form
                                    key="signin-form"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleSignIn}
                                    className="space-y-4"
                                >
                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="signin-email" className="block text-sm font-medium text-white mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                                            <input
                                                id="signin-email"
                                                name="email"
                                                type="email"
                                                value={signInData.email}
                                                onChange={handleSignInInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-2 glass-morphism rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                                                placeholder="twoj@email.pl"
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label htmlFor="signin-password" className="block text-sm font-medium text-white mb-2">
                                            Hasło
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                                            <input
                                                id="signin-password"
                                                name="password"
                                                type={showSignInPassword ? 'text' : 'password'}
                                                value={signInData.password}
                                                onChange={handleSignInInputChange}
                                                required
                                                className="w-full pl-10 pr-12 py-2 glass-morphism rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                                                placeholder="Twoje hasło"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowSignInPassword(!showSignInPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors duration-200"
                                            >
                                                {showSignInPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={signInLoading}
                                        className="w-full btn-primary"
                                    >
                                        {signInLoading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Logowanie...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                Zaloguj się
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </div>
                                        )}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="signup-form"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    onSubmit={handleSignUp}
                                    className="space-y-4"
                                >
                                    {/* Email Field */}
                                    <div>
                                        <label htmlFor="signup-email" className="block text-sm font-medium text-white mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                                            <input
                                                id="signup-email"
                                                name="email"
                                                type="email"
                                                value={signUpData.email}
                                                onChange={handleSignUpInputChange}
                                                required
                                                className="w-full pl-10 pr-4 py-2 glass-morphism rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                                                placeholder="twoj@email.pl"
                                            />
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div>
                                        <label htmlFor="signup-password" className="block text-sm font-medium text-white mb-2">
                                            Hasło
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                                            <input
                                                id="signup-password"
                                                name="password"
                                                type={showSignUpPassword ? 'text' : 'password'}
                                                value={signUpData.password}
                                                onChange={handleSignUpInputChange}
                                                required
                                                className="w-full pl-10 pr-12 py-2 glass-morphism rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                                                placeholder="Minimum 8 znaków"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors duration-200"
                                            >
                                                {showSignUpPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div>
                                        <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-white mb-2">
                                            Potwierdź hasło
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                                            <input
                                                id="signup-confirm-password"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                value={signUpData.confirmPassword}
                                                onChange={handleSignUpInputChange}
                                                required
                                                className="w-full pl-10 pr-12 py-2 glass-morphism rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                                                placeholder="Powtórz hasło"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors duration-200"
                                            >
                                                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Terms Checkbox */}
                                    <div className="flex items-start space-x-3">
                                        <input
                                            id="acceptTerms"
                                            name="acceptTerms"
                                            type="checkbox"
                                            checked={signUpData.acceptTerms}
                                            onChange={handleSignUpInputChange}
                                            className="mt-1 w-4 h-4 text-white/80 bg-white/10 border-white/20 rounded focus:ring-white/50 focus:ring-2"
                                        />
                                        <label htmlFor="acceptTerms" className="text-sm text-white/90">
                                            Akceptuję{' '}
                                            <Link href="/terms" className="text-white/70 hover:text-white underline">
                                                regulamin
                                            </Link>{' '}
                                            i{' '}
                                            <Link href="/privacy" className="text-white/70 hover:text-white underline">
                                                politykę prywatności
                                            </Link>
                                        </label>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={signUpLoading}
                                        className="w-full btn-primary"
                                    >
                                        {signUpLoading ? (
                                            <div className="flex items-center justify-center">
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                Rejestracja...
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center">
                                                Zarejestruj się
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </div>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {/* OAuth Divider */}
                        <div className="mt-6 mb-4">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/20"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-slate-800 text-white/60">lub kontynuuj z</span>
                                </div>
                            </div>
                        </div>

                        {/* OAuth Buttons */}
                        <div className="space-y-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
                                className="w-full flex items-center justify-center px-4 py-2 border-2 border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 group"
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="font-medium text-sm">Kontynuuj z Google</span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => signIn('facebook', { callbackUrl: '/dashboard' })}
                                className="w-full flex items-center justify-center px-4 py-2 border-2 border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 group"
                            >
                                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="font-medium text-sm">Kontynuuj z Facebook</span>
                            </motion.button>
                        </div>

                        {/* Links */}
                        <div className="mt-6 text-center space-y-2">
                            {activeTab === 'signin' ? (
                                <>
                                    <Link
                                        href="/auth/forgot-password"
                                        className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                                    >
                                        Zapomniałeś hasła?
                                    </Link>
                                </>
                            ) : null}
                        </div>
                    </UnifiedCard>
                </motion.div>
            </div>
        </UnifiedLayout>
    )
}
