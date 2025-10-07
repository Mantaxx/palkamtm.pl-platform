'use client'

import { PhoneVerification } from '@/components/auth/PhoneVerification'
import ProfileForm from '@/components/profile/ProfileForm'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ProfileSettingsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      // Pobierz dane profilu z API
      fetchUserProfile()
    }
  }, [user])

  const fetchUserProfile = async () => {
    if (!user) return

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      if (response.ok) {
        const data = await response.json()
        setUserData(data.user)
      } else {
        // Fallback do danych Firebase
        setUserData({
          id: user.uid,
          firstName: user.displayName?.split(' ')[0] || '',
          lastName: user.displayName?.split(' ')[1] || '',
          email: user.email,
          address: '',
          city: '',
          postalCode: '',
          phoneNumber: user.phoneNumber || '',
          isPhoneVerified: !!user.phoneNumber,
          isProfileVerified: false,
          isActive: true
        })
      }
    } catch (error) {
      console.error('Błąd podczas pobierania profilu:', error)
      // Fallback do danych Firebase
      setUserData({
        id: user.uid,
        firstName: user.displayName?.split(' ')[0] || '',
        lastName: user.displayName?.split(' ')[1] || '',
        email: user.email,
        address: '',
        city: '',
        postalCode: '',
        phoneNumber: user.phoneNumber || '',
        isPhoneVerified: !!user.phoneNumber,
        isProfileVerified: false,
        isActive: true
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Ładowanie...</p>
        </div>
      </div>
    )
  }

  if (!user || !userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ustawienia profilu</h1>
          <p className="text-gray-600">
            Uzupełnij swoje dane aby móc uczestniczyć w aukcjach
          </p>
        </div>

        <div className="space-y-8">
          {/* Formularz profilu */}
          <ProfileForm initialUser={userData} />

          {/* Weryfikacja telefonu */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weryfikacja telefonu</h3>
            <PhoneVerification
              user={{
                phoneNumber: userData?.phoneNumber ?? null,
                isPhoneVerified: userData?.isPhoneVerified ?? false
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


