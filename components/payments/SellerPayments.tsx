'use client'

import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  MessageSquare,
  Package,
  Truck
} from 'lucide-react'
import { useState } from 'react'

interface Payment {
  id: string
  auctionId: string
  auctionTitle: string
  buyerName: string
  amount: number
  status: 'pending' | 'shipped' | 'delivered' | 'disputed' | 'completed'
  createdAt: Date
  shippedAt?: Date
  deliveredAt?: Date
  disputeReason?: string
  commission: number
  netAmount: number
}

const mockPayments: Payment[] = [
  {
    id: 'pi_1',
    auctionId: '1',
    auctionTitle: 'Champion "Thunder Storm" - Linia Janssen',
    buyerName: 'Anna Nowak',
    amount: 8750,
    status: 'shipped',
    createdAt: new Date('2024-03-15'),
    shippedAt: new Date('2024-03-16'),
    commission: 437.5,
    netAmount: 8312.5
  },
  {
    id: 'pi_2',
    auctionId: '2',
    auctionTitle: 'Para hodowlana - Linia Sion',
    buyerName: 'Piotr Wiśniewski',
    amount: 12000,
    status: 'completed',
    createdAt: new Date('2024-03-10'),
    shippedAt: new Date('2024-03-12'),
    deliveredAt: new Date('2024-03-14'),
    commission: 600,
    netAmount: 11400
  },
  {
    id: 'pi_3',
    auctionId: '3',
    auctionTitle: 'Suplementy witaminowe Premium',
    buyerName: 'Maria Zielińska',
    amount: 250,
    status: 'disputed',
    createdAt: new Date('2024-03-08'),
    shippedAt: new Date('2024-03-09'),
    disputeReason: 'Przedmiot nie odpowiada opisowi',
    commission: 12.5,
    netAmount: 237.5
  }
]

export default function SellerPayments() {
  const [payments] = useState<Payment[]>(mockPayments)
  const [isMarkingShipped, setIsMarkingShipped] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'shipped':
        return 'bg-slate-100 text-slate-800'
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
        return <Truck className="w-4 h-4" />
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

  const handleMarkAsShipped = async (paymentId: string) => {
    setIsMarkingShipped(paymentId)

    try {
      // Symulacja API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Tutaj byłoby prawdziwe API call do aktualizacji statusu
      console.log('Oznaczono jako wysłane:', paymentId)
    } catch (error) {
      console.error('Błąd:', error)
    } finally {
      setIsMarkingShipped(null)
    }
  }

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.netAmount, 0)

  const pendingAmount = payments
    .filter(p => p.status === 'shipped')
    .reduce((sum, p) => sum + p.netAmount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Moje płatności</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <CreditCard className="w-4 h-4" />
          <span>System escrow - bezpieczne płatności</span>
        </div>
      </div>

      {/* Statystyki */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Wypłacone</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalRevenue.toLocaleString()} zł
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-slate-100 rounded-lg">
              <Clock className="w-6 h-6 text-slate-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Oczekuje na wypłatę</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingAmount.toLocaleString()} zł
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Package className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Do wysłania</p>
              <p className="text-2xl font-bold text-gray-900">
                {payments.filter(p => p.status === 'pending').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista płatności */}
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
                <p className="text-sm text-gray-600 mb-2">Kupujący: {payment.buyerName}</p>
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
                  <span className="font-medium text-red-800">Spór zgłoszony przez kupującego:</span>
                </div>
                <p className="text-sm text-red-700">{payment.disputeReason}</p>
              </div>
            )}

            {/* Szczegóły finansowe */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Kwota brutto:</p>
                  <p className="font-semibold">{payment.amount.toLocaleString()} zł</p>
                </div>
                <div>
                  <p className="text-gray-600">Prowizja (5%):</p>
                  <p className="font-semibold text-red-600">-{payment.commission.toLocaleString()} zł</p>
                </div>
                <div>
                  <p className="text-gray-600">Kwota netto:</p>
                  <p className="font-semibold text-green-600">{payment.netAmount.toLocaleString()} zł</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {payment.status === 'pending' && (
                <button
                  onClick={() => handleMarkAsShipped(payment.id)}
                  disabled={isMarkingShipped === payment.id}
                  className="flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-md hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isMarkingShipped === payment.id ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : (
                    <Truck className="w-4 h-4" />
                  )}
                  {isMarkingShipped === payment.id ? 'Oznaczam...' : 'Oznacz jako wysłane'}
                </button>
              )}

              <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">
                <MessageSquare className="w-4 h-4" />
                Skontaktuj się z kupującym
              </button>
            </div>
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
