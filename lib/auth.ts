import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope: 'email,public_profile'
        }
      }
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Hasło', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user || !user.password) {
          return null
        }

        // Check if account is active
        if (!user.isActive) {
          console.error('Account not active for user:', user.email)
          throw new Error('Konto nie zostało aktywowane. Sprawdź email i kliknij w link aktywacyjny.')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          console.error('Invalid password for user:', user.email)
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`.trim() || user.email,
          role: user.role,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dni
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Dla OAuth (Google, Facebook) - sprawdź czy użytkownik istnieje w bazie
      if (account?.provider === 'google' || account?.provider === 'facebook') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          if (!existingUser) {
            // Utwórz nowego użytkownika
            await prisma.user.create({
              data: {
                email: user.email!,
                firstName: user.name?.split(' ')[0] || '',
                lastName: user.name?.split(' ').slice(1).join(' ') || '',
                isActive: true,
                role: 'BUYER',
                image: user.image || null,
                // Dla OAuth nie ustawiamy hasła
                password: null
              }
            })
          } else {
            // Zaktualizuj dane istniejącego użytkownika
            await prisma.user.update({
              where: { email: user.email! },
              data: {
                image: user.image || existingUser.image,
                firstName: user.name?.split(' ')[0] || existingUser.firstName,
                lastName: user.name?.split(' ').slice(1).join(' ') || existingUser.lastName,
              }
            })
          }
        } catch (error) {
          console.error('Error in signIn callback:', error)
          // Log specific error details for debugging
          if (error instanceof Error) {
            console.error('Error message:', error.message)
            console.error('Error stack:', error.stack)
          }
          return false
        }
      }

      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        // Pobierz dane użytkownika z bazy danych
        try {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          if (dbUser) {
            token.role = dbUser.role
            token.id = dbUser.id
            token.name = dbUser.firstName && dbUser.lastName
              ? `${dbUser.firstName} ${dbUser.lastName}`.trim()
              : user.name || user.email
            token.email = dbUser.email
            token.image = dbUser.image || user.image
            token.phoneNumber = dbUser.phoneNumber
            token.isPhoneVerified = dbUser.isPhoneVerified
          } else {
            // Fallback dla przypadku gdy użytkownik nie istnieje w bazie
            token.role = 'BUYER'
            token.id = user.id
            token.name = user.name || user.email
            token.email = user.email
            token.image = user.image
            token.phoneNumber = null
            token.isPhoneVerified = false
          }
        } catch (error) {
          console.error('Error fetching user in JWT callback:', error)
          // Log specific error details for debugging
          if (error instanceof Error) {
            console.error('JWT Error message:', error.message)
            console.error('JWT Error stack:', error.stack)
          }
          // Fallback
          token.role = 'BUYER'
          token.id = user.id
          token.name = user.name || user.email
          token.email = user.email
          token.image = user.image
          token.phoneNumber = null
          token.isPhoneVerified = false
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.image as string
        session.user.phoneNumber = token.phoneNumber as string | null
        session.user.isPhoneVerified = token.isPhoneVerified as boolean
      }
      return session
    },
    async redirect({ url, baseUrl }) {
      // Jeśli URL zawiera callbackUrl, użyj go
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }

      // Jeśli URL jest z tej samej domeny, użyj go
      if (url.startsWith(baseUrl)) {
        return url
      }

      // Domyślnie przekieruj do dashboard
      return `${baseUrl}/buyer/dashboard`
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}
