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
            isActive?: boolean
            emailVerified?: Date | null
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
        isActive?: boolean
        emailVerified?: Date | null
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: string
        phoneNumber?: string | null
        isPhoneVerified?: boolean
        isActive?: boolean
        emailVerified?: Date | null
    }
}
