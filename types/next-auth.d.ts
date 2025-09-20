import 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string
            name?: string | null
            email?: string | null
            image?: string | null
            role: string
            phoneNumber?: string | null
            isPhoneVerified?: boolean
        }
    }

    interface User {
        id: string
        name?: string | null
        email?: string | null
        image?: string | null
        role: string
        phoneNumber?: string | null
        isPhoneVerified?: boolean
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: string
        phoneNumber?: string | null
        isPhoneVerified?: boolean
    }
}
