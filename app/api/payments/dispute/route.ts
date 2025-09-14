import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Nieautoryzowany dostęp' }, { status: 401 })
    }

    const { paymentIntentId, reason, description } = await request.json()

    if (!paymentIntentId || !reason) {
      return NextResponse.json({ error: 'Brak wymaganych danych' }, { status: 400 })
    }

    // Pobierz Payment Intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (!paymentIntent) {
      return NextResponse.json({ error: 'Nie znaleziono płatności' }, { status: 404 })
    }

    // Sprawdź czy płatność należy do użytkownika
    if (paymentIntent.metadata.buyerId !== session.user.id) {
      return NextResponse.json({ error: 'Brak uprawnień' }, { status: 403 })
    }

    // Anuluj płatność (zwróć środki kupującemu)
    const cancelledPayment = await stripe.paymentIntents.cancel(paymentIntentId)

    if (cancelledPayment.status === 'canceled') {
      // Tutaj można dodać logikę powiadamiania administratora
      // i zapisania sporu w bazie danych
      
      return NextResponse.json({
        success: true,
        message: 'Spór został zgłoszony. Środki zostały zwrócone na Twoje konto.'
      })
    } else {
      return NextResponse.json(
        { error: 'Nie udało się anulować płatności' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Błąd zgłaszania sporu:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas zgłaszania sporu' },
      { status: 500 }
    )
  }
}
