import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Google and Facebook OAuth temporarily disabled - add credentials to .env.local to enable
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_CLIENT_ID!,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    // }),
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

        // Check if account is active - temporarily disabled for development
        // if (!user.isActive) {
        //   throw new Error('Konto nie zostało aktywowane. Sprawdź email i kliknij w link aktywacyjny.')
        // }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
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
    strategy: 'jwt'
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // OAuth providers are temporarily disabled
      // if (account?.provider === 'google' || account?.provider === 'facebook') {
      //   const existingUser = await prisma.user.findUnique({
      //     where: { email: user.email! }
      //   })

      //   if (!existingUser) {
      //     await prisma.user.create({
      //       data: {
      //         email: user.email!,
      //         name: user.name,
      //         image: user.image,
      //         role: 'BUYER',
      //         emailVerified: new Date(),
      //       }
      //     })
      //   }
      // }
      return true
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role || 'BUYER'
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
}
