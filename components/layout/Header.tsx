'use client';

import { LogoGlow } from '@/components/layout/LogoGlow';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
    { name: 'Start', href: '/' },
    { name: 'Aukcje', href: '/auctions' },
    { name: 'Osiągnięcia', href: '/achievements' },
    { name: 'Championy', href: '/champions' },
    { name: 'Spotkania', href: '/breeder-meetings' },
    { name: 'Referencje', href: '/references' },
    { name: 'Prasa', href: '/press' },
    { name: 'O Nas', href: '/about' },
    { name: 'Kontakt', href: '/contact' },
];

export function Header() {
    const pathname = usePathname();
    const { user, signOut } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-md z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <Link href="/" aria-label="Strona główna">
                            <LogoGlow />
                        </Link>
                    </div>
                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${isActive
                                            ? 'bg-gray-700 text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                            }`}
                                    >
                                        <span className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[8px] left-[8px] right-[8px] bottom-[8px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[58px] left-[58px] right-[58px] bottom-[58px] border border-white rounded-sm pointer-events-none"></span>
                                        {link.name}
                                    </Link>
                                );
                            })}

                            {/* Kafle użytkownika */}
                            {user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className={`relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${pathname === '/dashboard'
                                            ? 'bg-gray-700 text-white'
                                            : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                            }`}
                                    >
                                        <span className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[8px] left-[8px] right-[8px] bottom-[8px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[58px] left-[58px] right-[58px] bottom-[58px] border border-white rounded-sm pointer-events-none"></span>
                                        Konto
                                    </Link>
                                    <div className="relative">
                                        <button
                                            onClick={() => setShowUserMenu(!showUserMenu)}
                                            className="relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 text-gray-300 hover:bg-gray-800 hover:text-white"
                                        >
                                            <span className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] border border-white rounded-sm pointer-events-none"></span>
                                            <span className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] border border-white rounded-sm pointer-events-none"></span>
                                            <span className="absolute top-[8px] left-[8px] right-[8px] bottom-[8px] border border-white rounded-sm pointer-events-none"></span>
                                            <span className="absolute top-[58px] left-[58px] right-[58px] bottom-[58px] border border-white rounded-sm pointer-events-none"></span>
                                            <User className="w-4 h-4 inline mr-1" />
                                            {user.displayName || 'Użytkownik'}
                                        </button>

                                        {showUserMenu && (
                                            <div className="absolute top-full right-0 mt-2 bg-black/90 backdrop-blur-xl rounded-lg border border-white/20 p-2 z-50 min-w-[200px]">
                                                <Link
                                                    href="/profile"
                                                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                                                >
                                                    <Settings className="w-4 h-4 text-white/70" />
                                                    <span className="text-white/70">Ustawienia</span>
                                                </Link>
                                                <button
                                                    onClick={signOut}
                                                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500/20 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4 text-red-400" />
                                                    <span className="text-red-400">Wyloguj się</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/auth/signin"
                                        className="relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 text-gray-300 hover:bg-gray-800 hover:text-white"
                                    >
                                        <span className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[8px] left-[8px] right-[8px] bottom-[8px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[58px] left-[58px] right-[58px] bottom-[58px] border border-white rounded-sm pointer-events-none"></span>
                                        Zaloguj się
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        className="relative px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 text-gray-300 hover:bg-gray-800 hover:text-white"
                                    >
                                        <span className="absolute top-[3px] left-[3px] right-[3px] bottom-[3px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[5px] left-[5px] right-[5px] bottom-[5px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[8px] left-[8px] right-[8px] bottom-[8px] border border-white rounded-sm pointer-events-none"></span>
                                        <span className="absolute top-[58px] left-[58px] right-[58px] bottom-[58px] border border-white rounded-sm pointer-events-none"></span>
                                        Zarejestruj się
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
