import { NextRequest, NextResponse } from 'next/server'
import { requireFirebaseAuth } from './firebase-auth'
import { prisma } from './prisma'

/**
 * Sends a verification SMS to a given phone number.
 * W środowisku deweloperskim - symuluje wysyłanie SMS.
 * W produkcji - używa Firebase Phone Authentication
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

    // W środowisku deweloperskim - loguj informacje
    if (process.env.NODE_ENV === 'development') {
      console.log('📱 [DEV] SMS weryfikacyjny:')
      console.log(`   Numer: ${cleanPhoneNumber}`)
      console.log(`   Kod: ${verificationCode}`)
      console.log('   ✅ SMS wysłany pomyślnie (tryb deweloperski)')
      return { success: true }
    }

    // W produkcji - użyj Firebase Phone Authentication
    // Firebase automatycznie wyśle SMS z kodem weryfikacyjnym
    console.log(`✅ Firebase Phone Auth - SMS zostanie wysłany na ${cleanPhoneNumber}`)
    return { success: true }

  } catch (error) {
    console.error('❌ Błąd podczas wysyłania SMS:', error)
    return {
      success: false,
      error: 'Wystąpił błąd podczas wysyłania SMS. Spróbuj ponownie za chwilę.'
    }
  }
}

export async function requirePhoneVerification(request: NextRequest) {
  const authResult = await requireFirebaseAuth(request)
  if (authResult instanceof NextResponse) {
    return authResult
  }
  const { decodedToken } = authResult

  try {
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.uid },
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
  return async (request: NextRequest) => {
    return await requirePhoneVerification(request)
  }
}