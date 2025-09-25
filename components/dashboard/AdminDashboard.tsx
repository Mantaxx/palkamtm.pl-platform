'use client'

import { motion } from 'framer-motion';
import {
  AlertTriangle,
  BarChart3,
  DollarSign,
  Package,
  Settings,
  UserCheck,
  Users
} from 'lucide-react';
import { useEffect, useState } from 'react';
interface StatsResponse { totalUsers: number; totalAuctions: number; totalTransactions: number; disputes: number }

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

type TransactionStatus = 'pending' | 'completed' | 'disputed'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [users, setUsers] = useState<any[]>([])
  const [usersTotal, setUsersTotal] = useState(0)
  const [usersPage, setUsersPage] = useState(1)
  const [usersPageSize, setUsersPageSize] = useState(10)
  const [usersRole, setUsersRole] = useState<string>('')
  const [usersStatus, setUsersStatus] = useState<string>('')
  const [editingUser, setEditingUser] = useState<any | null>(null)
  const [editForm, setEditForm] = useState<{ firstName: string; lastName: string; role: string; isActive: boolean }>({ firstName: '', lastName: '', role: 'BUYER', isActive: true })
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [txs, setTxs] = useState<any[]>([])
  const [txsTotal, setTxsTotal] = useState(0)
  const [txsPage, setTxsPage] = useState(1)
  const [txsPageSize, setTxsPageSize] = useState(10)
  const [txsStatus, setTxsStatus] = useState<string>('')

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [s, u, t] = await Promise.all([
          fetch('/api/admin/stats').then(r => r.ok ? r.json() : null),
          fetch(`/api/admin/users?page=${usersPage}&pageSize=${usersPageSize}${usersRole ? `&role=${usersRole}` : ''}${usersStatus ? `&status=${usersStatus}` : ''}`).then(r => r.ok ? r.json() : null),
          fetch(`/api/admin/transactions?page=${txsPage}&pageSize=${txsPageSize}${txsStatus ? `&status=${txsStatus}` : ''}`).then(r => r.ok ? r.json() : null),
        ])
        if (s) setStats(s)
        if (u) { setUsers(u.items); setUsersTotal(u.total) }
        if (t) { setTxs(t.items); setTxsTotal(t.total) }
      } catch { }
    }
    fetchAll()
  }, [usersPage, usersPageSize, usersRole, usersStatus, txsPage, txsPageSize, txsStatus])

  const openEdit = (u: any) => {
    setEditingUser(u)
    setEditForm({
      firstName: u.firstName || '',
      lastName: u.lastName || '',
      role: u.role || 'BUYER',
      isActive: Boolean(u.isActive)
    })
  }

  const saveEdit = async () => {
    if (!editingUser?.id) return
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm)
      })
      if (res.ok) {
        // refresh list
        const u = await fetch(`/api/admin/users?page=${usersPage}&pageSize=${usersPageSize}${usersRole ? `&role=${usersRole}` : ''}${usersStatus ? `&status=${usersStatus}` : ''}`).then(r => r.json())
        setUsers(u.items); setUsersTotal(u.total)
        setEditingUser(null)
      }
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (u: any) => {
    await fetch(`/api/admin/users/${u.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: !u.isActive })
    })
    const refreshed = await fetch(`/api/admin/users?page=${usersPage}&pageSize=${usersPageSize}${usersRole ? `&role=${usersRole}` : ''}${usersStatus ? `&status=${usersStatus}` : ''}`).then(r => r.json())
    setUsers(refreshed.items); setUsersTotal(refreshed.total)
  }

  const deleteUser = async (u: any) => {
    if (!confirm('Na pewno usunąć użytkownika?')) return
    setDeleting(true)
    try {
      await fetch(`/api/admin/users/${u.id}`, { method: 'DELETE' })
      const refreshed = await fetch(`/api/admin/users?page=${usersPage}&pageSize=${usersPageSize}${usersRole ? `&role=${usersRole}` : ''}${usersStatus ? `&status=${usersStatus}` : ''}`).then(r => r.json())
      setUsers(refreshed.items); setUsersTotal(refreshed.total)
    } finally {
      setDeleting(false)
    }
  }

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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-white">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Panel Administratora</h1>
          <p className="text-white/70 mt-2">
            Zarządzaj platformą, użytkownikami i transakcjami
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-white/20">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                      ? 'border-white text-white'
                      : 'border-transparent text-white/60 hover:text-white hover:border-white/40'
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
            {/* Stats Cards (no mock data) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 border-2 border-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">Użytkownicy</p>
                    <p className="text-2xl font-bold text-white">{stats?.totalUsers ?? 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border-2 border-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">Przychód platformy</p>
                    <p className="text-2xl font-bold text-white">{stats?.totalTransactions ? stats.totalTransactions.toLocaleString() + ' trans.' : '0 trans.'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border-2 border-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <Package className="w-6 h-6 text-amber-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">Aktywne aukcje</p>
                    <p className="text-2xl font-bold text-white">{stats?.totalAuctions ?? 0}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border-2 border-white rounded-lg shadow-sm p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-rose-400" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white/70">Spory</p>
                    <p className="text-2xl font-bold text-white">{stats?.disputes ?? 0}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-800 border-2 border-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Ostatnie transakcje</h2>
                <div className="space-y-4">
                  {txs.length === 0 ? (
                    <div className="text-sm text-white/70">Brak danych</div>
                  ) : (
                    txs.slice(0, 3).map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium text-white">{tx.auction?.title || 'Aukcja'}</p>
                          <p className="text-sm text-white/70">{(tx.buyer?.firstName || '') + ' ' + (tx.buyer?.lastName || '')}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-white">{Number(tx.amount || 0).toLocaleString()} zł</p>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(String(tx.status || 'pending'))}`}>
                            {getStatusText(String(tx.status || 'pending'))}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="bg-gray-800 border-2 border-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Oczekujące akcje</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <UserCheck className="w-5 h-5 text-amber-400" />
                      <div>
                        <p className="font-medium text-white">Zatwierdzenie sprzedawców</p>
                        <p className="text-sm text-white/70">0 oczekuje</p>
                      </div>
                    </div>
                    <button className="text-white/80 hover:text-white font-medium">
                      Sprawdź
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                      <div>
                        <p className="font-medium text-white">Spory do rozstrzygnięcia</p>
                        <p className="text-sm text-white/70">0 spraw</p>
                      </div>
                    </div>
                    <button className="text-white/80 hover:text-white font-medium">
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
            <div className="bg-white border-2 border-white rounded-lg shadow-sm overflow-hidden">
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
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-gray-600">Brak danych użytkowników</td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{`${u.firstName || ''} ${u.lastName || ''}`.trim() || u.email}</div>
                              <div className="text-sm text-gray-500">{u.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-900">{getRoleText(u.role)}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(u.isActive ? 'active' : 'blocked')}`}>
                              {getStatusText(u.isActive ? 'active' : 'blocked')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(u.createdAt).toLocaleDateString('pl-PL')}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-600">
                            <div className="flex items-center gap-2">
                              <button aria-label="Edytuj" title="Edytuj" onClick={() => openEdit(u)} className="px-3 py-1 border rounded hover:bg-gray-50 text-gray-700">Edytuj</button>
                              <button aria-label={u.isActive ? 'Dezaktywuj' : 'Aktywuj'} title={u.isActive ? 'Dezaktywuj' : 'Aktywuj'} onClick={() => toggleActive(u)} className="px-3 py-1 border rounded hover:bg-gray-50 text-gray-700">
                                {u.isActive ? 'Dezaktywuj' : 'Aktywuj'}
                              </button>
                              <button aria-label="Usuń" title="Usuń" onClick={() => deleteUser(u)} disabled={deleting} className="px-3 py-1 border rounded hover:bg-red-50 disabled:opacity-50 text-gray-700">Usuń</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {editingUser && (
                  <div role="dialog" aria-modal="true" aria-label="Edytuj użytkownika" className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                    <div className="bg-white border-2 border-white rounded-lg shadow-lg w-full max-w-md p-6">
                      <h3 className="text-lg font-semibold mb-4">Edytuj użytkownika</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Email</label>
                          <input aria-label="Email" value={editingUser?.email || ''} readOnly className="w-full border rounded px-3 py-2 bg-gray-50 text-gray-600 cursor-not-allowed" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Imię</label>
                          <input aria-label="Imię" value={editForm.firstName} onChange={(e) => setEditForm(f => ({ ...f, firstName: e.target.value }))} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Nazwisko</label>
                          <input aria-label="Nazwisko" value={editForm.lastName} onChange={(e) => setEditForm(f => ({ ...f, lastName: e.target.value }))} className="w-full border rounded px-3 py-2" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Rola</label>
                          <select aria-label="Rola" value={editForm.role} onChange={(e) => setEditForm(f => ({ ...f, role: e.target.value }))} className="w-full border rounded px-3 py-2">
                            <option value="BUYER">Kupujący</option>
                            <option value="SELLER">Sprzedawca</option>
                            <option value="ADMIN">Administrator</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-2">
                          <input id="isActive" aria-label="Aktywne konto" type="checkbox" checked={editForm.isActive} onChange={(e) => setEditForm(f => ({ ...f, isActive: e.target.checked }))} />
                          <label htmlFor="isActive" className="text-sm text-gray-700">Aktywne konto</label>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-2">
                        <button onClick={() => setEditingUser(null)} className="px-4 py-2 border rounded">Anuluj</button>
                        <button onClick={saveEdit} disabled={saving} className="px-4 py-2 bg-slate-600 text-white rounded disabled:opacity-50">Zapisz</button>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Rola</label>
                    <select aria-label="Filtr roli użytkownika" title="Filtr roli użytkownika" value={usersRole} onChange={(e) => { setUsersPage(1); setUsersRole(e.target.value) }} className="border rounded px-2 py-1 text-sm">
                      <option value="">Wszystkie</option>
                      <option value="BUYER">Kupujący</option>
                      <option value="SELLER">Sprzedawca</option>
                      <option value="ADMIN">Administrator</option>
                    </select>
                    <label className="text-sm text-gray-600 ml-4">Status</label>
                    <select aria-label="Filtr statusu użytkownika" title="Filtr statusu użytkownika" value={usersStatus} onChange={(e) => { setUsersPage(1); setUsersStatus(e.target.value) }} className="border rounded px-2 py-1 text-sm">
                      <option value="">Wszystkie</option>
                      <option value="active">Aktywny</option>
                      <option value="blocked">Zablokowany</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <button disabled={usersPage <= 1} onClick={() => setUsersPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-50">Poprzednia</button>
                    <span>Strona {usersPage} z {Math.max(1, Math.ceil(usersTotal / usersPageSize))}</span>
                    <button disabled={usersPage >= Math.ceil(usersTotal / usersPageSize)} onClick={() => setUsersPage(p => p + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Następna</button>
                    <select aria-label="Rozmiar strony użytkowników" title="Rozmiar strony użytkowników" value={usersPageSize} onChange={(e) => { setUsersPage(1); setUsersPageSize(parseInt(e.target.value, 10)) }} className="ml-2 border rounded px-2 py-1">
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
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
            <div className="bg-white border-2 border-white rounded-lg shadow-sm overflow-hidden">
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
                    {txs.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-600">Brak danych transakcji</td>
                      </tr>
                    ) : (
                      txs.map((tx) => (
                        <tr key={tx.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{tx.auction?.title || 'Aukcja'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {`${tx.buyer?.firstName || ''} ${tx.buyer?.lastName || ''}`.trim() || tx.buyer?.email || ''}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {`${tx.seller?.firstName || ''} ${tx.seller?.lastName || ''}`.trim() || tx.seller?.email || ''}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {Number(tx.amount || 0).toLocaleString()} zł
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {Number(tx.commission || 0).toLocaleString()} zł
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(String(tx.status || 'pending'))}`}>
                              {getStatusText(String(tx.status || 'pending'))}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(tx.createdAt).toLocaleDateString('pl-PL')}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Status</label>
                    <select aria-label="Filtr statusu transakcji" title="Filtr statusu transakcji" value={txsStatus} onChange={(e) => { setTxsPage(1); setTxsStatus(e.target.value) }} className="border rounded px-2 py-1 text-sm">
                      <option value="">Wszystkie</option>
                      <option value="PENDING">Oczekuje</option>
                      <option value="COMPLETED">Zakończona</option>
                      <option value="DISPUTED">Spór</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <button disabled={txsPage <= 1} onClick={() => setTxsPage(p => Math.max(1, p - 1))} className="px-3 py-1 border rounded disabled:opacity-50">Poprzednia</button>
                    <span>Strona {txsPage} z {Math.max(1, Math.ceil(txsTotal / txsPageSize))}</span>
                    <button disabled={txsPage >= Math.ceil(txsTotal / txsPageSize)} onClick={() => setTxsPage(p => p + 1)} className="px-3 py-1 border rounded disabled:opacity-50">Następna</button>
                    <select aria-label="Rozmiar strony transakcji" title="Rozmiar strony transakcji" value={txsPageSize} onChange={(e) => { setTxsPage(1); setTxsPageSize(parseInt(e.target.value, 10)) }} className="ml-2 border rounded px-2 py-1">
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                    </select>
                  </div>
                </div>
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
            <div className="bg-white border-2 border-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Ustawienia platformy</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prowizja platformy (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="5.0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                    aria-label="Minimalna cena wywoławcza w złotych"
                  />
                </div>

                <button className="bg-slate-600 text-white px-6 py-2 rounded-md hover:bg-slate-700 transition-colors">
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
