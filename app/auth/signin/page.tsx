'use client'

import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { Text3D } from '@/components/ui/Text3D'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { motion } from 'framer-motion'
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { getSession, signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        if (result.error.includes('aktywowane')) {
          setError(result.error)
        } else if (result.error.includes('CredentialsSignin')) {
          setError('Nieprawidłowy email lub hasło. Sprawdź dane i spróbuj ponownie.')
        } else if (result.error.includes('CallbackRouteError')) {
          setError('Wystąpił błąd podczas uwierzytelniania. Spróbuj ponownie za chwilę.')
        } else {
          setError('Wystąpił błąd podczas logowania. Spróbuj ponownie.')
        }
      } else {
        // Get session to determine user role
        const session = await getSession()
        if (session?.user?.role === 'ADMIN') {
          router.push('/admin/dashboard')
        } else if (session?.user?.role === 'SELLER') {
          router.push('/seller/dashboard')
        } else {
          router.push('/buyer/dashboard')
        }
      }
    } catch (error) {
      console.error('Sign in error:', error)
      setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie za chwilę.')
    } finally {
      setIsLoading(false)
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
          <UnifiedCard
            variant="3d"
            glow={true}
            className="p-8 border-2 border-white/20 backdrop-blur-xl shadow-2xl"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <Text3D
                variant="gradient"
                intensity="high"
                className="text-3xl font-bold mb-2"
              >
                Zaloguj się
              </Text3D>
              <p className="text-white/90">
                Wprowadź swoje dane, aby się zalogować
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 glass-morphism-strong border-l-4 border-red-400 rounded-lg border-2 border-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(255,255,255,0.4),0_16px_64px_rgba(255,255,255,0.2),0_24px_96px_rgba(255,255,255,0.1)]"
              >
                <p className="text-red-200 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 glass-morphism rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 border-2 border-white shadow-[0_8px_32px_rgba(255,255,255,0.4),0_16px_64px_rgba(255,255,255,0.2),0_24px_96px_rgba(255,255,255,0.1)]"
                    placeholder="twoj@email.pl"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Hasło
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-12 py-3 glass-morphism rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300 border-2 border-white shadow-[0_8px_32px_rgba(255,255,255,0.4),0_16px_64px_rgba(255,255,255,0.2),0_24px_96px_rgba(255,255,255,0.1)]"
                    placeholder="Twoje hasło"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80 transition-colors duration-200"
                    aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                    title={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary"
              >
                {isLoading ? (
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
            </form>

            {/* OAuth Divider */}
            <div className="mt-8 mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900 text-white/60">lub kontynuuj z</span>
                </div>
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn('google', { callbackUrl: '/buyer/dashboard' })}
                className="w-full flex items-center justify-center px-4 py-3 border-2 border-white/20 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="font-medium">Kontynuuj z Google</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => signIn('facebook', { callbackUrl: '/buyer/dashboard' })}
                className="w-full flex items-center justify-center px-4 py-3 border-2 border-white/20 rounded-2xl text-white hover:bg-white/10 transition-all duration-300 group"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span className="font-medium">Kontynuuj z Facebook</span>
              </motion.button>
            </div>

            {/* Links */}
            <div className="mt-8 text-center space-y-4">
              <Link
                href="/auth/signup"
                className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
              >
                Nie masz konta? Zarejestruj się
              </Link>

              <div className="text-center">
                <Link
                  href="/auth/forgot-password"
                  className="text-white/70 hover:text-white transition-colors duration-200 text-sm"
                >
                  Zapomniałeś hasła?
                </Link>
              </div>
            </div>
          </UnifiedCard>
        </motion.div>
      </div>
    </UnifiedLayout>
  )
}