import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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

        try {
          // Znajdź użytkownika w bazie danych
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) {
            return null
          }

          // Sprawdź czy użytkownik jest aktywny
          if (!user.isActive) {
            return null
          }

          // Sprawdź hasło
          if (user.password) {
            const isValidPassword = await bcrypt.compare(credentials.password, user.password)
            if (!isValidPassword) {
              return null
            }
          } else {
            // Fallback dla użytkowników bez hasła (OAuth)
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email,
            role: user.role,
            image: user.image
          }
        } catch (error) {
          console.error('Błąd autoryzacji:', error)
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 dni
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          // Sprawdź czy użytkownik już istnieje
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! }
          })

          if (!existingUser) {
            // Utwórz nowego użytkownika
            const nameParts = user.name?.split(' ') || []
            await prisma.user.create({
              data: {
                email: user.email!,
                firstName: nameParts[0] || '',
                lastName: nameParts.slice(1).join(' ') || '',
                image: user.image,
                role: 'BUYER',
                isActive: true,
                emailVerified: new Date()
              }
            })
          }
          return true
        } catch (error) {
          console.error('Błąd podczas tworzenia użytkownika Google:', error)
          return false
        }
      }
      return true
    },
    async jwt({ token, user }) {
      // Po zalogowaniu, pobierz świeże dane użytkownika, aby token był aktualny
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.isPhoneVerified = dbUser.isPhoneVerified;
          token.name = `${dbUser.firstName || ''} ${dbUser.lastName || ''}`.trim() || dbUser.email;
          token.image = dbUser.image;
          token.email = dbUser.email;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
        session.user.isPhoneVerified = token.isPhoneVerified as boolean;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      // Zawsze przekieruj do dashboard po zalogowaniu
      return `${baseUrl}/dashboard`
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}
