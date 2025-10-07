'use client'

import { useFirebaseTokenManager } from '@/hooks/useFirebaseTokenManager'
import { auth } from '@/lib/firebase'
import { User, onAuthStateChanged, signOut } from 'firebase/auth'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
    user: User | null
    loading: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { }
})

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

interface AuthProviderProps {
    children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // Zarządzaj tokenami Firebase w cookies
    useFirebaseTokenManager(user)

    useEffect(() => {
        // console.log('AuthContext: Setting up onAuthStateChanged listener')
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // console.log('Auth state changed:', user ? `User logged in: ${user.email}` : 'User logged out')
            setUser(user)
            setLoading(false)
        })

        return () => {
            // console.log('AuthContext: Cleaning up onAuthStateChanged listener')
            unsubscribe()
        }
    }, [])

    const handleSignOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error('Błąd wylogowania:', error)
        }
    }

    const value = {
        user,
        loading,
        signOut: handleSignOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
