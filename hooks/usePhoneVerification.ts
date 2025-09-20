'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

interface PhoneVerificationStatus {
    isPhoneVerified: boolean
    phoneNumber: string | null
    isLoading: boolean
    error: string | null
}

export function usePhoneVerification(): PhoneVerificationStatus {
    const { data: session, status } = useSession()
    const [verificationStatus, setVerificationStatus] = useState<PhoneVerificationStatus>({
        isPhoneVerified: false,
        phoneNumber: null,
        isLoading: true,
        error: null
    })

    useEffect(() => {
        if (status === 'loading') {
            setVerificationStatus(prev => ({ ...prev, isLoading: true }))
            return
        }

        if (status === 'unauthenticated') {
            setVerificationStatus({
                isPhoneVerified: false,
                phoneNumber: null,
                isLoading: false,
                error: null
            })
            return
        }

        if (session?.user) {
            setVerificationStatus({
                isPhoneVerified: session.user.isPhoneVerified || false,
                phoneNumber: session.user.phoneNumber || null,
                isLoading: false,
                error: null
            })
        }
    }, [session, status])

    return verificationStatus
}
