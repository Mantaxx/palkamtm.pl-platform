import { createActivationEmail, sendEmail } from '@/lib/email'
import { prisma } from '@/lib/prisma'
import { apiRateLimit } from '@/lib/rate-limit'
import { userRegistrationSchema } from '@/lib/validations/schemas'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResponse = apiRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const body = await request.json()

    // Walidacja danych
    const validatedData = userRegistrationSchema.parse(body)

    // Sprawdź czy użytkownik już istnieje
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Użytkownik z tym adresem email już istnieje' },
        { status: 400 }
      )
    }

    // Hashuj hasło
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Generuj token aktywacyjny
    const activationToken = crypto.randomUUID()

    // Utwórz użytkownika
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        phoneNumber: validatedData.phoneNumber,
        role: 'BUYER', // Domyślnie kupujący
        isActive: false, // Wymaga aktywacji
        activationToken
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        activationToken: true
      }
    })

    // Przygotuj i wyślij email aktywacyjny
    const emailData = createActivationEmail(user.email, activationToken)
    await sendEmail(emailData)

    return NextResponse.json({
      message: 'Konto zostało utworzone. Sprawdź email w celu aktywacji.',
      user
    }, { status: 201 })

  } catch (error) {
    console.error('Błąd podczas rejestracji:', error)

    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Nieprawidłowe dane', details: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Wystąpił błąd podczas rejestracji' },
      { status: 500 }
    )
  }
}