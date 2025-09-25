import { authOptions } from '@/lib/auth'
import { apiRateLimit } from '@/lib/rate-limit'
import { stripe } from '@/lib/stripe'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = apiRateLimit(request)
    if (rateLimitResponse) {
      return rateLimitResponse
    }

    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Nieautoryzowany dostęp' }, { status: 401 })
    }

    const { amount, auctionId, metadata } = await request.json()

    if (!amount || amount < 100) {
      return NextResponse.json({ error: 'Nieprawidłowa kwota' }, { status: 400 })
    }

    // Utwórz Payment Intent z escrow
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'pln',
      metadata: {
        auctionId,
        buyerId: session.user.id,
        ...metadata
      },
      // W prawdziwej aplikacji tutaj byłby transfer_data dla sprzedawcy
      // transfer_data: {
      //   destination: sellerStripeAccountId
      // },
      application_fee_amount: Math.round(amount * 0.05), // 5% prowizja platformy
      capture_method: 'manual', // Nie pobieraj od razu - czekaj na potwierdzenie odbioru
      automatic_payment_methods: {
        enabled: true
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret
    })
  } catch (error) {
    console.error('Błąd tworzenia Payment Intent:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas tworzenia płatności' },
      { status: 500 }
    )
  }
}
