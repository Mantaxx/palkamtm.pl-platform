import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import Twilio from 'twilio'
import { authOptions } from './auth'
import { prisma } from './prisma'

// Initialize Twilio client
const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

/**
 * Sends a verification SMS to a given phone number using Twilio.
 * @param phoneNumber The recipient's phone number.
 * @param verificationCode The 6-digit code to send.
 * @returns Promise<{ success: boolean; error?: string }>
 */
export async function sendVerificationSms(
  phoneNumber: string,
  verificationCode: string
) {
  try {
    const message = await twilioClient.messages.create({
      body: `Twój kod weryfikacyjny do serwisu Palka-Gołębie to: ${verificationCode}`,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to: phoneNumber
    })

    console.log('SMS sent successfully. Message SID:', message.sid)
    return { success: true }
  } catch (error) {
    console.error('Error sending verification SMS:', error)
    if (error instanceof Error) {
      return { success: false, error: error.message }
    }
    return { success: false, error: 'An unknown error occurred' }
  }
}

export async function requirePhoneVerification() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    return NextResponse.json(
      { error: 'Nieautoryzowany dostęp' },
      { status: 401 }
    )
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isPhoneVerified: true, phoneNumber: true }
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Użytkownik nie został znaleziony' },
        { status: 404 }
      )
    }

    if (!user.isPhoneVerified) {
      return NextResponse.json(
        {
          error: 'Weryfikacja numeru telefonu jest wymagana',
          requiresPhoneVerification: true,
          phoneNumber: user.phoneNumber
        },
        { status: 403 }
      )
    }

    return null // Brak błędu - użytkownik jest zweryfikowany
  } catch (error) {
    console.error('Błąd sprawdzania weryfikacji telefonu:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas sprawdzania weryfikacji' },
      { status: 500 }
    )
  }
}

export function createPhoneVerificationMiddleware() {
  return async () => {
    return await requirePhoneVerification()
  }
}