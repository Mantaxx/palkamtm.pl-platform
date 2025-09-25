'use client'

import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle, CreditCard, Shield, X } from 'lucide-react'
import { useState } from 'react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  auctionId: string
  amount: number
  auctionTitle: string
  sellerName: string
  onPaymentSuccess: (paymentIntentId: string) => void
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const PaymentForm = ({
  amount,
  auctionTitle,
  sellerName,
  onPaymentSuccess,
  onClose
}: {
  amount: number
  auctionTitle: string
  sellerName: string
  onPaymentSuccess: (paymentIntentId: string) => void
  onClose: () => void
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success' | 'error'>('form')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setError(null)
    setPaymentStep('processing')

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setError('Nie można znaleźć elementu karty')
      setIsProcessing(false)
      setPaymentStep('error')
      return
    }

    try {
      // Utwórz Payment Intent z escrow
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: amount * 100, // Stripe używa groszy
          auctionId: auctionTitle,
          metadata: {
            auctionTitle,
            sellerName
          }
        })
      })

      const { clientSecret, error: serverError } = await response.json()

      if (serverError) {
        throw new Error(serverError)
      }

      // Potwierdź płatność
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: 'Kupujący'
            }
          }
        }
      )

      if (confirmError) {
        throw new Error(confirmError.message)
      }

      if (paymentIntent?.status === 'succeeded') {
        setPaymentStep('success')
        onPaymentSuccess(paymentIntent.id)
      } else {
        throw new Error('Płatność nie została zakończona')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas płatności')
      setPaymentStep('error')
    } finally {
      setIsProcessing(false)
    }
  }

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#9e2146'
      }
    }
  }

  if (paymentStep === 'processing') {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Przetwarzanie płatności...</h3>
        <p className="text-gray-600">Proszę czekać, nie zamykaj tej strony</p>
      </div>
    )
  }

  if (paymentStep === 'success') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Płatność zakończona pomyślnie!</h3>
        <p className="text-gray-600 mb-4">
          Twoja płatność została przetworzona. Sprzedawca zostanie powiadomiony o dokonaniu płatności.
        </p>
        <button
          onClick={onClose}
          className="bg-slate-600 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors"
        >
          Zamknij
        </button>
      </div>
    )
  }

  if (paymentStep === 'error') {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Błąd płatności</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setPaymentStep('form')}
            className="bg-slate-600 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors"
          >
            Spróbuj ponownie
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
          >
            Anuluj
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-slate-600" />
          <h3 className="font-semibold text-slate-900">Bezpieczna płatność</h3>
        </div>
        <p className="text-sm text-slate-800">
          Twoje środki są bezpieczne. Pieniądze zostaną przekazane sprzedawcy dopiero po potwierdzeniu odbioru przedmiotu.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-900 mb-2">Szczegóły płatności</h3>
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Aukcja:</span>
              <span className="font-medium">{auctionTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Sprzedawca:</span>
              <span className="font-medium">{sellerName}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span>Do zapłaty:</span>
              <span className="text-slate-600">{amount.toLocaleString()} zł</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dane karty płatniczej
          </label>
          <div className="border border-gray-300 rounded-md p-3">
            <CardElement options={cardElementOptions} />
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 bg-slate-600 text-white py-3 px-4 rounded-md font-medium hover:bg-slate-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? 'Przetwarzanie...' : `Zapłać ${amount.toLocaleString()} zł`}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
        >
          Anuluj
        </button>
      </div>
    </form>
  )
}

export default function PaymentModal({
  isOpen,
  onClose,
  amount,
  auctionTitle,
  sellerName,
  onPaymentSuccess
}: PaymentModalProps) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Płatność</h2>
                  <p className="text-sm text-gray-600">Bezpieczna transakcja</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Zamknij"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <Elements stripe={stripePromise}>
              <PaymentForm
                amount={amount}
                auctionTitle={auctionTitle}
                sellerName={sellerName}
                onPaymentSuccess={onPaymentSuccess}
                onClose={onClose}
              />
            </Elements>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
