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

    const { paymentIntentId } = await request.json()

    if (!paymentIntentId) {
      return NextResponse.json({ error: 'Brak ID płatności' }, { status: 400 })
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

    // Potwierdź płatność (zwolnij środki ze escrow)
    const confirmedPayment = await stripe.paymentIntents.capture(paymentIntentId)

    if (confirmedPayment.status === 'succeeded') {
      // Tutaj można dodać logikę powiadamiania sprzedawcy
      // i aktualizacji statusu w bazie danych
      
      return NextResponse.json({
        success: true,
        message: 'Płatność została potwierdzona. Środki zostały przekazane sprzedawcy.'
      })
    } else {
      return NextResponse.json(
        { error: 'Nie udało się potwierdzić płatności' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Błąd potwierdzania dostawy:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas potwierdzania dostawy' },
      { status: 500 }
    )
  }
}
