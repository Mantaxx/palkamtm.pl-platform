'use client'

import { UnifiedButton } from '@/components/ui/UnifiedButton'
import { UnifiedCard } from '@/components/ui/UnifiedCard'
import { Activity, AlertTriangle, Bookmark, Box, ChevronRight, Gavel, MessageCircle, Package, Plus, Receipt, Settings, ShoppingBag, Star, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Mock data
const mockData = {
    watchlist: [
        {
            id: 1,
            title: "Champion Olimpijski 2023",
            currentPrice: 12500,
            bids: 24,
            timeLeft: "2h 15m",
            imageUrl: "/images/pigeon1.jpg"
        },
        {
            id: 2,
            title: "Młody Zawodnik z Rodu Mistrzów",
            currentPrice: 5200,
            bids: 12,
            timeLeft: "5h 30m",
            imageUrl: "/images/pigeon2.jpg"
        },
        {
            id: 3,
            title: "Córka Championa z 2022",
            currentPrice: 8750,
            bids: 18,
            timeLeft: "1d 4h",
            imageUrl: "/images/pigeon3.jpg"
        }
    ],
    orders: [
        {
            id: 101,
            orderNumber: "ORD-2023-08-001",
            date: "2023-08-15",
            amount: 12500,
            status: "delivered"
        },
        {
            id: 102,
            orderNumber: "ORD-2023-09-002",
            date: "2023-09-02",
            amount: 8750,
            status: "shipped"
        },
        {
            id: 103,
            orderNumber: "ORD-2023-09-003",
            date: "2023-09-10",
            amount: 5200,
            status: "processing"
        }
    ],
    messages: [
        {
            id: 201,
            sender: "Administracja MTM",
            subject: "Potwierdzenie złożenia oferty",
            date: "2023-09-10",
            read: true
        },
        {
            id: 202,
            sender: "Jan Kowalski",
            subject: "Pytanie o rodowód gołębia",
            date: "2023-09-08",
            read: false
        },
        {
            id: 203,
            sender: "Obsługa Klienta",
            subject: "Aktualizacja statusu zamówienia",
            date: "2023-09-05",
            read: false
        }
    ],
    activityData: [
        { name: 'Sty', bids: 12, purchases: 5 },
        { name: 'Lut', bids: 19, purchases: 2 },
        { name: 'Mar', bids: 8, purchases: 3 },
        { name: 'Kwi', bids: 25, purchases: 4 },
        { name: 'Maj', bids: 30, purchases: 6 },
        { name: 'Cze', bids: 14, purchases: 1 },
    ]
}

export function BuyerDashboard() {
    const [activeTab, setActiveTab] = useState('overview')
    const router = useRouter()

    const tabs = [
        { id: 'overview', label: 'Przegląd', icon: Activity },
        { id: 'watchlist', label: 'Obserwowane', icon: Bookmark },
        { id: 'orders', label: 'Zamówienia', icon: Box },
        { id: 'messages', label: 'Wiadomości', icon: MessageCircle },
        { id: 'settings', label: 'Ustawienia', icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Sidebar */}
                    <div className="w-full md:w-64 shrink-0">
                        <UnifiedCard variant="glass" className="p-4 lg:p-6 sticky top-20">
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white">
                                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-xl">
                                        MK
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">Marek Kowalski</h2>
                                    <p className="text-sm text-gray-300">Premium Buyer</p>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${activeTab === tab.id
                                            ? 'bg-white/20 backdrop-blur-sm text-white'
                                            : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                            }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span>{tab.label}</span>
                                        {tab.id === 'messages' && (
                                            <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                2
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <button
                                    onClick={() => router.push('/auth/logout')}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-all duration-200"
                                >
                                    <span>Wyloguj się</span>
                                </button>
                            </div>
                        </UnifiedCard>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Dashboard Overview */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-semibold text-white mb-6">Panel Klienta</h1>

                                {/* Stats Overview */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <UnifiedCard variant="glass" className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-300">Aktywne oferty</p>
                                                <p className="text-2xl font-semibold text-white">7</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                                <Gavel className="w-5 h-5 text-blue-400" />
                                            </div>
                                        </div>
                                    </UnifiedCard>

                                    <UnifiedCard variant="glass" className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-300">Obserwowane</p>
                                                <p className="text-2xl font-semibold text-white">12</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                                                <Star className="w-5 h-5 text-green-400" />
                                            </div>
                                        </div>
                                    </UnifiedCard>

                                    <UnifiedCard variant="glass" className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-300">Zamówienia</p>
                                                <p className="text-2xl font-semibold text-white">3</p>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                                <Package className="w-5 h-5 text-purple-400" />
                                            </div>
                                        </div>
                                    </UnifiedCard>
                                </div>

                                {/* Recent Activity Chart */}
                                <UnifiedCard variant="glass" className="p-6">
                                    <h2 className="text-lg font-semibold text-white mb-4">Twoja aktywność</h2>
                                    <div className="h-72">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={mockData.activityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                                <XAxis dataKey="name" stroke="#888" />
                                                <YAxis stroke="#888" />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#333', borderColor: '#555' }}
                                                    labelStyle={{ color: '#fff' }}
                                                />
                                                <Legend />
                                                <Bar dataKey="bids" stackId="a" fill="#60a5fa" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="purchases" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </UnifiedCard>

                                {/* Watchlist */}
                                <UnifiedCard variant="glass" className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-white">Obserwowane aukcje</h2>
                                        <Link href="/dashboard/watchlist" className="text-blue-400 text-sm hover:text-blue-300 flex items-center">
                                            <span>Zobacz wszystkie</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <div className="space-y-4">
                                        {mockData.watchlist.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 rounded-lg bg-gray-700 flex-shrink-0 overflow-hidden">
                                                        {item.imageUrl ? (
                                                            <Image src={item.imageUrl} alt={item.title} width={48} height={48} className="object-cover" />
                                                        ) : (
                                                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700"></div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-medium">{item.title}</h3>
                                                        <div className="flex items-center space-x-3 text-xs text-gray-300">
                                                            <span>{item.bids} ofert</span>
                                                            <span className="text-orange-300">{item.timeLeft}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-right">
                                                        <p className="text-white font-medium">
                                                            {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(item.currentPrice)}
                                                        </p>
                                                        <UnifiedButton variant="secondary" size="sm" className="mt-1">
                                                            Licytuj
                                                        </UnifiedButton>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </UnifiedCard>

                                {/* Recent Orders */}
                                <UnifiedCard variant="glass" className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-white">Ostatnie zamówienia</h2>
                                        <Link href="/dashboard/orders" className="text-blue-400 text-sm hover:text-blue-300 flex items-center">
                                            <span>Zobacz wszystkie</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <div className="space-y-4">
                                        {mockData.orders.map((order) => (
                                            <div key={order.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                                                        {order.status === 'processing' && <Package className="w-5 h-5 text-yellow-400" />}
                                                        {order.status === 'shipped' && <Truck className="w-5 h-5 text-blue-400" />}
                                                        {order.status === 'delivered' && <ShoppingBag className="w-5 h-5 text-green-400" />}
                                                        {order.status === 'cancelled' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-medium">{order.orderNumber}</h3>
                                                        <div className="flex items-center space-x-3 text-xs text-gray-300">
                                                            <span>{new Date(order.date).toLocaleDateString('pl-PL')}</span>
                                                            <span className={`
                                                                ${order.status === 'processing' && 'text-yellow-400'}
                                                                ${order.status === 'shipped' && 'text-blue-400'}
                                                                ${order.status === 'delivered' && 'text-green-400'}
                                                                ${order.status === 'cancelled' && 'text-red-400'}
                                                            `}>
                                                                {order.status === 'processing' && 'W przygotowaniu'}
                                                                {order.status === 'shipped' && 'Wysłane'}
                                                                {order.status === 'delivered' && 'Dostarczone'}
                                                                {order.status === 'cancelled' && 'Anulowane'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-right">
                                                        <p className="text-white font-medium">
                                                            {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN' }).format(order.amount)}
                                                        </p>
                                                        <Link href={`/dashboard/orders/${order.id}`} className="text-xs text-blue-400 hover:text-blue-300">
                                                            Szczegóły
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </UnifiedCard>

                                {/* Recent Messages */}
                                <UnifiedCard variant="glass" className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg font-semibold text-white">Wiadomości</h2>
                                        <Link href="/dashboard/messages" className="text-blue-400 text-sm hover:text-blue-300 flex items-center">
                                            <span>Zobacz wszystkie</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>

                                    <div className="space-y-4">
                                        {mockData.messages.map((message) => (
                                            <div key={message.id} className={`flex items-center justify-between p-3 rounded-xl backdrop-blur-sm ${message.read ? 'bg-white/5' : 'bg-blue-500/10 border border-blue-500/30'}`}>
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                                                        {message.sender.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-white font-medium flex items-center">
                                                            {message.subject}
                                                            {!message.read && (
                                                                <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></span>
                                                            )}
                                                        </h3>
                                                        <div className="flex items-center space-x-3 text-xs text-gray-300">
                                                            <span>{message.sender}</span>
                                                            <span>{new Date(message.date).toLocaleDateString('pl-PL')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Link href={`/dashboard/messages/${message.id}`} className="text-blue-400 hover:text-blue-300">
                                                    <ChevronRight className="w-5 h-5" />
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                </UnifiedCard>
                            </div>
                        )}

                        {/* Watchlist Tab */}
                        {activeTab === 'watchlist' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h1 className="text-2xl font-semibold text-white">Obserwowane aukcje</h1>
                                    <UnifiedButton variant="primary" size="sm">
                                        <Plus className="w-4 h-4 mr-1" />
                                        Obserwuj więcej
                                    </UnifiedButton>
                                </div>

                                <UnifiedCard variant="glass" className="p-6">
                                    <div className="space-y-4">
                                        <p className="text-gray-300">Lista wszystkich obserwowanych aukcji będzie tutaj.</p>
                                    </div>
                                </UnifiedCard>
                            </div>
                        )}

                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h1 className="text-2xl font-semibold text-white">Twoje zamówienia</h1>
                                    <UnifiedButton variant="secondary" size="sm">
                                        <Receipt className="w-4 h-4 mr-1" />
                                        Historia zamówień
                                    </UnifiedButton>
                                </div>

                                <UnifiedCard variant="glass" className="p-6">
                                    <div className="space-y-4">
                                        <p className="text-gray-300">Historia wszystkich zamówień będzie tutaj.</p>
                                    </div>
                                </UnifiedCard>
                            </div>
                        )}

                        {/* Messages Tab */}
                        {activeTab === 'messages' && (
                            <div>
                                <h1 className="text-2xl font-semibold text-white mb-6">Wiadomości</h1>
                                <UnifiedCard variant="glass" className="p-6">
                                    <div className="space-y-4">
                                        <p className="text-gray-300">System wiadomości będzie tutaj.</p>
                                    </div>
                                </UnifiedCard>
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <div>
                                <h1 className="text-2xl font-semibold text-white mb-6">Ustawienia konta</h1>
                                <UnifiedCard variant="glass" className="p-6">
                                    <div className="space-y-4">
                                        <p className="text-gray-300">Ustawienia konta będą tutaj.</p>
                                    </div>
                                </UnifiedCard>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}