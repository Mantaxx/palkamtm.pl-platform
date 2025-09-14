'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  CreditCard, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Package, 
  MessageSquare,
  RefreshCw
} from 'lucide-react'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'

interface Payment {
  id: string
  auctionId: string
  auctionTitle: string
  sellerName: string
  amount: number
  status: 'pending' | 'shipped' | 'delivered' | 'disputed' | 'completed'
  createdAt: Date
  shippedAt?: Date
  deliveredAt?: Date
  disputeReason?: string
}

const mockPayments: Payment[] = [
  {
    id: 'pi_1',
    auctionId: '1',
    auctionTitle: 'Champion "Thunder Storm" - Linia Janssen',
    sellerName: 'Jan Kowalski',
    amount: 8750,
    status: 'shipped',
    createdAt: new Date('2024-03-15'),
    shippedAt: new Date('2024-03-16')
  },
  {
    id: 'pi_2',
    auctionId: '2',
    auctionTitle: 'Para hodowlana - Linia Sion',
    sellerName: 'Anna Nowak',
    amount: 12000,
    status: 'delivered',
    createdAt: new Date('2024-03-10'),
    shippedAt: new Date('2024-03-12'),
    deliveredAt: new Date('2024-03-14')
  },
  {
    id: 'pi_3',
    auctionId: '3',
    auctionTitle: 'Suplementy witaminowe Premium',
    sellerName: 'Piotr Wiśniewski',
    amount: 250,
    status: 'disputed',
    createdAt: new Date('2024-03-08'),
    shippedAt: new Date('2024-03-09'),
    disputeReason: 'Przedmiot nie odpowiada opisowi'
  }
]

export default function PaymentManagement() {
  const [payments] = useState<Payment[]>(mockPayments)
  const [isConfirming, setIsConfirming] = useState<string | null>(null)
  const [isDisputing, setIsDisputing] = useState<string | null>(null)
  const [disputeReason, setDisputeReason] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'disputed':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Oczekuje na wysyłkę'
      case 'shipped':
        return 'Wysłane'
      case 'delivered':
        return 'Dostarczone'
      case 'disputed':
        return 'Spór'
      case 'completed':
        return 'Zakończone'
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />
      case 'shipped':
        return <Package className="w-4 h-4" />
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />
      case 'disputed':
        return <AlertTriangle className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleConfirmDelivery = async (paymentId: string) => {
    setIsConfirming(paymentId)
    
    try {
      const response = await fetch('/api/payments/confirm-delivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentIntentId: paymentId })
      })

      const result = await response.json()

      if (result.success) {
        // Aktualizuj status w UI
        console.log('Dostawa potwierdzona:', result.message)
      } else {
        console.error('Błąd potwierdzania dostawy:', result.error)
      }
    } catch (error) {
      console.error('Błąd:', error)
    } finally {
      setIsConfirming(null)
    }
  }

  const handleDispute = async (paymentId: string) => {
    if (!disputeReason.trim()) return

    setIsDisputing(paymentId)
    
    try {
      const response = await fetch('/api/payments/dispute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          paymentIntentId: paymentId,
          reason: 'item_not_as_described',
          description: disputeReason
        })
      })

      const result = await response.json()

      if (result.success) {
        // Aktualizuj status w UI
        console.log('Spór zgłoszony:', result.message)
        setDisputeReason('')
      } else {
        console.error('Błąd zgłaszania sporu:', result.error)
      }
    } catch (error) {
      console.error('Błąd:', error)
    } finally {
      setIsDisputing(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Moje płatności</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CreditCard className="w-4 h-4" />
          <span>Bezpieczne płatności z escrow</span>
        </div>
      </div>

      <div className="space-y-4">
        {payments.map((payment) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{payment.auctionTitle}</h3>
                <p className="text-sm text-gray-600 mb-2">Sprzedawca: {payment.sellerName}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Zapłacono: {format(payment.createdAt, 'dd.MM.yyyy HH:mm', { locale: pl })}</span>
                  {payment.shippedAt && (
                    <span>Wysłane: {format(payment.shippedAt, 'dd.MM.yyyy', { locale: pl })}</span>
                  )}
                  {payment.deliveredAt && (
                    <span>Dostarczone: {format(payment.deliveredAt, 'dd.MM.yyyy', { locale: pl })}</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">{payment.amount.toLocaleString()} zł</p>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(payment.status)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {getStatusText(payment.status)}
                  </span>
                </div>
              </div>
            </div>

            {payment.disputeReason && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-red-800">Powód sporu:</span>
                </div>
                <p className="text-sm text-red-700">{payment.disputeReason}</p>
              </div>
            )}

            <div className="flex items-center gap-3">
              {payment.status === 'delivered' && (
                <button
                  onClick={() => handleConfirmDelivery(payment.id)}
                  disabled={isConfirming === payment.id}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isConfirming === payment.id ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  )}
                  {isConfirming === payment.id ? 'Potwierdzam...' : 'Potwierdź odbiór'}
                </button>
              )}

              {payment.status === 'shipped' && (
                <button
                  onClick={() => handleDispute(payment.id)}
                  disabled={isDisputing === payment.id}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isDisputing === payment.id ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <AlertTriangle className="w-4 h-4" />
                  )}
                  {isDisputing === payment.id ? 'Zgłaszam...' : 'Zgłoś problem'}
                </button>
              )}

              <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                <MessageSquare className="w-4 h-4" />
                Skontaktuj się ze sprzedawcą
              </button>
            </div>

            {payment.status === 'shipped' && isDisputing === payment.id && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opisz problem:
                </label>
                <textarea
                  value={disputeReason}
                  onChange={(e) => setDisputeReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Opisz szczegółowo problem z przedmiotem..."
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleDispute(payment.id)}
                    disabled={!disputeReason.trim()}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Zgłoś spór
                  </button>
                  <button
                    onClick={() => setIsDisputing(null)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Anuluj
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {payments.length === 0 && (
        <div className="text-center py-12">
          <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Brak płatności</h3>
          <p className="text-gray-600">Nie masz jeszcze żadnych płatności do zarządzania.</p>
        </div>
      )}
    </div>
  )
}
