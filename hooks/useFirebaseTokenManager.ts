'use client'

import { User } from 'firebase/auth'
import { useEffect } from 'react'

export function useFirebaseTokenManager(user: User | null) {
  useEffect(() => {
    const updateToken = async () => {
      if (user) {
        try {
          // Pobierz token ID
          const token = await user.getIdToken()

          // Ustaw token w cookies
          document.cookie = `firebase-auth-token=${token}; path=/; max-age=3600; secure; samesite=strict`
          // console.log('Token Firebase zapisany w cookies')
        } catch (error) {
          console.error('Błąd pobierania tokenu:', error)
          // Usuń token z cookies w przypadku błędu
          document.cookie = 'firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        }
      } else {
        // Usuń token z cookies gdy użytkownik się wyloguje
        document.cookie = 'firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
        // console.log('Token Firebase usunięty z cookies')
      }
    }

    updateToken()
  }, [user])
}
