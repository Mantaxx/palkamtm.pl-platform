'use client'

import SellerPayments from '@/components/payments/SellerPayments'
import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Clock,
  CreditCard,
  DollarSign,
  Edit,
  Eye,
  MessageSquare,
  Package,
  Plus,
  Trash2,
  TrendingUp
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Auction {
  id: string
  title: string
  currentPrice: number
  startingPrice: number
  buyNowPrice?: number
  status: 'active' | 'ending' | 'ended' | 'sold'
  endTime: Date
  views: number
  watchers: number
  bids: number
  category: string
  image: string
}

interface SalesStats {
  totalSales: number
  totalRevenue: number
  activeAuctions: number
  completedAuctions: number
  averagePrice: number
  monthlyRevenue: number
  topPerformingAuction: string
}

const mockAuctions: Auction[] = [
  {
    id: '1',
    title: 'Champion "Thunder Storm" - Linia Janssen',
    currentPrice: 8750,
    startingPrice: 5000,
    buyNowPrice: 15000,
    status: 'active',
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    views: 156,
    watchers: 23,
    bids: 8,
    category: 'Pigeon',
    image: '/pigeons/champion1-1.jpg'
  },
  {
    id: '2',
    title: 'Para hodowlana - Linia Sion',
    currentPrice: 12000,
    startingPrice: 8000,
    status: 'ending',
    endTime: new Date(Date.now() + 30 * 60 * 1000),
    views: 89,
    watchers: 15,
    bids: 12,
    category: 'Pigeon',
    image: '/pigeons/champion2-1.jpg'
  },
  {
    id: '3',
    title: 'Suplementy witaminowe Premium',
    currentPrice: 250,
    startingPrice: 200,
    buyNowPrice: 300,
    status: 'sold',
    endTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    views: 45,
    watchers: 8,
    bids: 5,
    category: 'Supplements',
    image: '/supplements/vitamins.jpg'
  },
  {
    id: '4',
    title: 'Klatka transportowa profesjonalna',
    currentPrice: 450,
    startingPrice: 400,
    status: 'ended',
    endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    views: 67,
    watchers: 12,
    bids: 3,
    category: 'Accessories',
    image: '/accessories/cage.jpg'
  }
]

const mockStats: SalesStats = {
  totalSales: 47,
  totalRevenue: 125000,
  activeAuctions: 2,
  completedAuctions: 45,
  averagePrice: 2659,
  monthlyRevenue: 18500,
  topPerformingAuction: 'Champion "Thunder Storm"'
}

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'ending':
        return 'bg-yellow-100 text-yellow-800'
      case 'ended':
        return 'bg-gray-100 text-gray-800'
      case 'sold':
        return 'bg-slate-100 text-slate-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktywna'
      case 'ending':
        return 'Kończy się'
      case 'ended':
        return 'Zakończona'
      case 'sold':
        return 'Sprzedana'
      default:
        return status
    }
  }

  const tabs = [
    { id: 'overview', label: 'Przegląd', icon: BarChart3 },
    { id: 'auctions', label: 'Moje aukcje', icon: Package },
    { id: 'payments', label: 'Płatności', icon: CreditCard },
    { id: 'messages', label: 'Wiadomości', icon: MessageSquare }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel Sprzedawcy</h1>
          <p className="text-gray-600 mt-2">
            Zarządzaj swoimi aukcjami i monitoruj sprzedaż
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Link
              href="/seller/create-auction"
              className="flex items-center gap-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Nowa aukcja
            </Link>
            <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <BarChart3 className="w-4 h-4" />
              Raporty
            </button>
            <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              <MessageSquare className="w-4 h-4" />
              Wiadomości
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                      ? 'border-slate-500 text-slate-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Całkowity przychód</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockStats.totalRevenue.toLocaleString()} zł
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Package className="w-6 h-6 text-slate-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Sprzedane przedmioty</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.totalSales}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Aktywne aukcje</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.activeAuctions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Średnia cena</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockStats.averagePrice.toLocaleString()} zł
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Ostatnia aktywność</h2>

              <div className="space-y-4">
                {mockAuctions.slice(0, 3).map((auction) => (
                  <div key={auction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{auction.title}</p>
                        <p className="text-sm text-gray-600">
                          {auction.currentPrice.toLocaleString()} zł • {auction.bids} ofert
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(auction.status)}`}>
                        {getStatusText(auction.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'auctions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Auctions List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Moje aukcje</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {mockAuctions.map((auction) => (
                  <div key={auction.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900">{auction.title}</h3>
                          <p className="text-sm text-gray-600">
                            {auction.category} • {auction.views} wyświetleń • {auction.watchers} obserwujących
                          </p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-600">
                              Cena: {auction.currentPrice.toLocaleString()} zł
                            </span>
                            <span className="text-sm text-gray-600">
                              Oferty: {auction.bids}
                            </span>
                            <span className="text-sm text-gray-600">
                              Kończy się: {format(auction.endTime, 'dd.MM.yyyy HH:mm', { locale: pl })}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(auction.status)}`}>
                          {getStatusText(auction.status)}
                        </span>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/auctions/${auction.id}`}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Zobacz aukcję"
                            aria-label="Zobacz aukcję"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Edytuj aukcję" aria-label="Edytuj aukcję">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'payments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <SellerPayments />
          </motion.div>
        )}

        {activeTab === 'messages' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Wiadomości</h2>
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Brak nowych wiadomości</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
