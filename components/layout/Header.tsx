'use client';

import { LogoGlow } from '@/components/layout/LogoGlow';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { name: 'Start', href: '/' },
    { name: 'Gołębie', href: '/pigeons' },
    { name: 'Hodowla', href: '/breeding' },
            { name: 'Osiągnięcia', href: '/achievements' },
    { name: 'Kontakt', href: '/contact' },
];

export function Header() {
    const pathname = usePathname();

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
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
