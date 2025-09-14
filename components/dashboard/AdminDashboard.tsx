'use client'

import { format } from 'date-fns'
import { pl } from 'date-fns/locale'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  BarChart3,
  DollarSign,
  Eye,
  Package,
  Settings,
  UserCheck,
  Users,
  UserX
} from 'lucide-react'
import { useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: 'BUYER' | 'SELLER' | 'ADMIN'
  status: 'active' | 'pending' | 'blocked'
  joinDate: Date
  salesCount?: number
  purchasesCount?: number
  rating?: number
}

interface Transaction {
  id: string
  auctionTitle: string
  buyer: string
  seller: string
  amount: number
  status: 'pending' | 'completed' | 'disputed'
  date: Date
  commission: number
}

interface PlatformStats {
  totalUsers: number
  totalRevenue: number
  totalAuctions: number
  activeAuctions: number
  pendingSellers: number
  monthlyRevenue: number
  averageCommission: number
  disputeCount: number
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    role: 'SELLER',
    status: 'active',
    joinDate: new Date('2024-01-15'),
    salesCount: 47,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Anna Nowak',
    email: 'anna@example.com',
    role: 'BUYER',
    status: 'active',
    joinDate: new Date('2024-02-20'),
    purchasesCount: 12
  },
  {
    id: '3',
    name: 'Piotr Wiśniewski',
    email: 'piotr@example.com',
    role: 'SELLER',
    status: 'pending',
    joinDate: new Date('2024-03-10')
  },
  {
    id: '4',
    name: 'Maria Zielińska',
    email: 'maria@example.com',
    role: 'BUYER',
    status: 'blocked',
    joinDate: new Date('2024-01-05')
  }
]

const mockTransactions: Transaction[] = [
  {
    id: '1',
    auctionTitle: 'Champion "Thunder Storm"',
    buyer: 'Anna Nowak',
    seller: 'Jan Kowalski',
    amount: 8750,
    status: 'completed',
    date: new Date('2024-03-15'),
    commission: 437.5
  },
  {
    id: '2',
    auctionTitle: 'Para hodowlana - Linia Sion',
    buyer: 'Piotr Wiśniewski',
    seller: 'Jan Kowalski',
    amount: 12000,
    status: 'pending',
    date: new Date('2024-03-16'),
    commission: 600
  },
  {
    id: '3',
    auctionTitle: 'Suplementy witaminowe',
    buyer: 'Maria Zielińska',
    seller: 'Anna Nowak',
    amount: 250,
    status: 'disputed',
    date: new Date('2024-03-14'),
    commission: 12.5
  }
]

const mockStats: PlatformStats = {
  totalUsers: 1247,
  totalRevenue: 1250000,
  totalAuctions: 3421,
  activeAuctions: 156,
  pendingSellers: 8,
  monthlyRevenue: 185000,
  averageCommission: 5.0,
  disputeCount: 3
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'blocked':
        return 'bg-red-100 text-red-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'disputed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktywny'
      case 'pending':
        return 'Oczekuje'
      case 'blocked':
        return 'Zablokowany'
      case 'completed':
        return 'Zakończona'
      case 'disputed':
        return 'Spór'
      default:
        return status
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'BUYER':
        return 'Kupujący'
      case 'SELLER':
        return 'Sprzedawca'
      case 'ADMIN':
        return 'Administrator'
      default:
        return role
    }
  }

  const tabs = [
    { id: 'overview', label: 'Przegląd', icon: BarChart3 },
    { id: 'users', label: 'Użytkownicy', icon: Users },
    { id: 'transactions', label: 'Transakcje', icon: DollarSign },
    { id: 'settings', label: 'Ustawienia', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel Administratora</h1>
          <p className="text-gray-600 mt-2">
            Zarządzaj platformą, użytkownikami i transakcjami
          </p>
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
                        ? 'border-blue-500 text-blue-600'
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
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Użytkownicy</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Przychód platformy</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {mockStats.totalRevenue.toLocaleString()} zł
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
                    <p className="text-sm font-medium text-gray-600">Aktywne aukcje</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.activeAuctions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Spory</p>
                    <p className="text-2xl font-bold text-gray-900">{mockStats.disputeCount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Ostatnie transakcje</h2>

                <div className="space-y-4">
                  {mockTransactions.slice(0, 3).map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{transaction.auctionTitle}</p>
                        <p className="text-sm text-gray-600">
                          {transaction.buyer} → {transaction.seller}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {transaction.amount.toLocaleString()} zł
                        </p>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {getStatusText(transaction.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Oczekujące akcje</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-gray-900">Zatwierdzenie sprzedawców</p>
                        <p className="text-sm text-gray-600">{mockStats.pendingSellers} oczekuje</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Sprawdź
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="font-medium text-gray-900">Spory do rozstrzygnięcia</p>
                        <p className="text-sm text-gray-600">{mockStats.disputeCount} spraw</p>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Sprawdź
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Zarządzanie użytkownikami</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Użytkownik
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rola
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data dołączenia
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Akcje
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900">{getRoleText(user.role)}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                            {getStatusText(user.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(user.joinDate, 'dd.MM.yyyy', { locale: pl })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-900" title="Zobacz użytkownika" aria-label="Zobacz użytkownika">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900" title="Zatwierdź użytkownika" aria-label="Zatwierdź użytkownika">
                              <UserCheck className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900" title="Zablokuj użytkownika" aria-label="Zablokuj użytkownika">
                              <UserX className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'transactions' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Transakcje</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aukcja
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kupujący
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sprzedawca
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kwota
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prowizja
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockTransactions.map((transaction) => (
                      <tr key={transaction.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {transaction.auctionTitle}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.buyer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.seller}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.amount.toLocaleString()} zł
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.commission.toLocaleString()} zł
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                            {getStatusText(transaction.status)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {format(transaction.date, 'dd.MM.yyyy', { locale: pl })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Ustawienia platformy</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prowizja platformy (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="5.0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Prowizja platformy w procentach"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maksymalny czas trwania aukcji (dni)
                  </label>
                  <input
                    type="number"
                    defaultValue="30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Maksymalny czas trwania aukcji w dniach"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimalna cena wywoławcza (zł)
                  </label>
                  <input
                    type="number"
                    defaultValue="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Minimalna cena wywoławcza w złotych"
                  />
                </div>

                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Zapisz ustawienia
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
