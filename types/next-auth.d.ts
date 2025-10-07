import 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
            role: string
            emailVerified: boolean
            phoneNumber?: string | null
            isPhoneVerified?: boolean
        }
        accessToken?: string
    }

    interface User {
        id: string
        name?: string | null
        email?: string | null
        image?: string | null
        role: string
        emailVerified: boolean
        phoneNumber?: string | null
        isPhoneVerified?: boolean
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        uid: string
        role: string
        emailVerified: boolean
        accessToken?: string
        phoneNumber?: string | null
        isPhoneVerified?: boolean
    }
}
