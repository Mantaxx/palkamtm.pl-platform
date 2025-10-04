import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from './auth'
import { prisma } from './prisma'

/**
 * Sends a verification SMS to a given phone number.
 * W środowisku deweloperskim - symuluje wysyłanie SMS.
 * W produkcji - można podłączyć dowolny dostawca SMS (Twilio, SendGrid, etc.)
 * @param phoneNumber The recipient's phone number.
 * @param verificationCode The 6-digit code to send.
 * @returns Promise<{ success: boolean; error?: string }>
 */
export async function sendVerificationSms(
  phoneNumber: string,
  verificationCode: string
) {
  try {
    // Walidacja numeru telefonu
    if (!phoneNumber || phoneNumber.trim().length === 0) {
      return { success: false, error: 'Numer telefonu jest wymagany' }
    }

    // Przygotuj numer telefonu (usuń spacje, dodaj +48 jeśli potrzeba)
    let cleanPhoneNumber = phoneNumber.replace(/\s+/g, '').replace(/[^\d+]/g, '')

    // Sprawdź czy numer jest prawidłowy (polski format)
    if (cleanPhoneNumber.startsWith('0') && cleanPhoneNumber.length === 9) {
      cleanPhoneNumber = '+48' + cleanPhoneNumber.substring(1)
    } else if (cleanPhoneNumber.startsWith('48') && cleanPhoneNumber.length === 11) {
      cleanPhoneNumber = '+' + cleanPhoneNumber
    } else if (!cleanPhoneNumber.startsWith('+')) {
      cleanPhoneNumber = '+48' + cleanPhoneNumber
    }

    // Sprawdź czy numer ma prawidłowy format
    if (!/^\+48\d{9}$/.test(cleanPhoneNumber)) {
      return {
        success: false,
        error: 'Nieprawidłowy format numeru telefonu. Użyj formatu: 123456789 lub +48123456789'
      }
    }

    // W środowisku deweloperskim - symuluj wysyłanie SMS
    if (process.env.NODE_ENV === 'development') {
      console.log('📱 [DEV] SMS weryfikacyjny:')
      console.log(`   Numer: ${cleanPhoneNumber}`)
      console.log(`   Kod: ${verificationCode}`)
      console.log(`   Treść: Twój kod weryfikacyjny: ${verificationCode}. Kod ważny przez 10 minut.`)
      console.log('   ✅ SMS "wysłany" pomyślnie (tryb deweloperski)')

      // Symuluj opóźnienie sieci
      await new Promise(resolve => setTimeout(resolve, 500))

      return { success: true }
    }

    // W produkcji - tutaj można podłączyć prawdziwego dostawcę SMS
    // Przykłady: Twilio, SendGrid, AWS SNS, etc.

    // Przykład z Twilio (wymaga konfiguracji):
    /*
    const accountSid = process.env.TWILIO_ACCOUNT_SID
    const authToken = process.env.TWILIO_AUTH_TOKEN
    const client = require('twilio')(accountSid, authToken)
    
    const message = await client.messages.create({
      body: `Twój kod weryfikacyjny: ${verificationCode}. Kod ważny przez 10 minut.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: cleanPhoneNumber
    })
    
    console.log(`✅ SMS wysłany przez Twilio: ${message.sid}`)
    return { success: true }
    */

    // Dla teraz - w produkcji też symulujemy (do czasu podłączenia dostawcy)
    console.log('📱 [PROD] SMS weryfikacyjny (symulacja):')
    console.log(`   Numer: ${cleanPhoneNumber}`)
    console.log(`   Kod: ${verificationCode}`)
    console.log('   ⚠️  UWAGA: W produkcji należy podłączyć prawdziwego dostawcę SMS!')

    return { success: true }

  } catch (error) {
    console.error('❌ Błąd podczas wysyłania SMS:', error)
    return {
      success: false,
      error: 'Wystąpił błąd podczas wysyłania SMS. Spróbuj ponownie za chwilę.'
    }
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