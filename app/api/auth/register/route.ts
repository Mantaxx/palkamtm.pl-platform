import { createActivationEmail, generateActivationToken, sendEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'
import { authRateLimit } from '@/lib/rate-limit'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email('Nieprawidłowy adres email'),
  password: z.string().min(8, 'Hasło musi mieć co najmniej 8 znaków'),
})

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = authRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const body = await request.json()
    const { email, password } = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'Użytkownik z tym adresem email już istnieje' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate activation token
    const activationToken = generateActivationToken()

    // Create user with minimal data - profile will be completed later
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: 'BUYER',
        isActive: true, // Temporarily set to true for development
        activationToken,
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
      }
    })

    // Send activation email
    const emailData = createActivationEmail(email, activationToken)
    const emailSent = await sendEmail(emailData)

    if (!emailSent) {
      // Jeśli email się nie wysłał, usuń użytkownika
      await prisma.user.delete({ where: { id: user.id } })
      return NextResponse.json(
        { message: 'Błąd wysyłania emaila aktywacyjnego' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'Konto zostało utworzone. Sprawdź email i kliknij w link aktywacyjny.',
        userId: user.id
      },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Wystąpił błąd podczas tworzenia konta' },
      { status: 500 }
    )
  }
}
