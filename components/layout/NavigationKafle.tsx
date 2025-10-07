'use client'

import { useAuth } from '@/contexts/AuthContext'
import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

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
]

export function NavigationKafle() {
    const pathname = usePathname()
    const { user, signOut } = useAuth()
    const [showUserMenu, setShowUserMenu] = useState(false)

    return (
        <>
            <style jsx>{`
        .nav-kafle-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          pointer-events: none;
          z-index: 1000;
        }

        .nav-kafle {
          position: absolute;
          top: 50%;
          left: -200px;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 20px;
          pointer-events: auto;
          perspective: 1000px;
        }

        .nav-kafle-item {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          font-size: 12px;
          font-weight: bold;
          text-align: center;
          transition: all 0.3s ease;
          transform-style: preserve-3d;
          animation: slideInLeft 0.8s ease-out forwards;
          opacity: 0;
          transform: translateX(-100px) rotateY(-45deg);
        }

        .nav-kafle-item:nth-child(1) { animation-delay: 0.1s; }
        .nav-kafle-item:nth-child(2) { animation-delay: 0.2s; }
        .nav-kafle-item:nth-child(3) { animation-delay: 0.3s; }
        .nav-kafle-item:nth-child(4) { animation-delay: 0.4s; }
        .nav-kafle-item:nth-child(5) { animation-delay: 0.5s; }
        .nav-kafle-item:nth-child(6) { animation-delay: 0.6s; }
        .nav-kafle-item:nth-child(7) { animation-delay: 0.7s; }
        .nav-kafle-item:nth-child(8) { animation-delay: 0.8s; }
        .nav-kafle-item:nth-child(9) { animation-delay: 0.9s; }

        .nav-kafle-item:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateX(10px) rotateY(0deg) scale(1.1);
          box-shadow: 
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 40px rgba(255, 255, 255, 0.2);
        }

        .nav-kafle-item.active {
          background: rgba(255, 255, 255, 0.3);
          border-color: rgba(255, 255, 255, 0.8);
          transform: translateX(15px) rotateY(0deg) scale(1.2);
          box-shadow: 
            0 0 25px rgba(255, 255, 255, 0.4),
            0 0 50px rgba(255, 255, 255, 0.3);
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-100px) rotateY(-45deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
          }
        }

        .user-menu {
          position: absolute;
          top: 50%;
          right: -200px;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 15px;
          pointer-events: auto;
          perspective: 1000px;
        }

        .user-kafle-item {
          width: 70px;
          height: 70px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          font-size: 11px;
          font-weight: bold;
          text-align: center;
          transition: all 0.3s ease;
          transform-style: preserve-3d;
          animation: slideInRight 0.8s ease-out forwards;
          opacity: 0;
          transform: translateX(100px) rotateY(45deg);
        }

        .user-kafle-item:nth-child(1) { animation-delay: 1.0s; }
        .user-kafle-item:nth-child(2) { animation-delay: 1.1s; }
        .user-kafle-item:nth-child(3) { animation-delay: 1.2s; }

        .user-kafle-item:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.6);
          transform: translateX(-10px) rotateY(0deg) scale(1.1);
          box-shadow: 
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 40px rgba(255, 255, 255, 0.2);
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px) rotateY(45deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0deg);
          }
        }

        .user-dropdown {
          position: absolute;
          top: 0;
          right: 80px;
          background: rgba(0, 0, 0, 0.9);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 15px;
          padding: 10px;
          min-width: 200px;
          opacity: 0;
          transform: translateX(20px) scale(0.9);
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .user-dropdown.show {
          opacity: 1;
          transform: translateX(0) scale(1);
          pointer-events: auto;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 15px;
          color: white;
          text-decoration: none;
          border-radius: 10px;
          transition: all 0.3s ease;
          font-size: 14px;
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .dropdown-item.logout {
          color: #ff6b6b;
        }

        .dropdown-item.logout:hover {
          background: rgba(255, 107, 107, 0.1);
        }
      `}</style>

            <div className="nav-kafle-container">
                {/* Lewe kafle nawigacji */}
                <div className="nav-kafle">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`nav-kafle-item ${isActive ? 'active' : ''}`}
                                title={link.name}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </div>

                {/* Prawe kafle użytkownika */}
                {user && (
                    <div className="user-menu">
                        <Link
                            href="/dashboard"
                            className="user-kafle-item"
                            title="Panel Klienta"
                        >
                            <User className="w-6 h-6" />
                        </Link>

                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="user-kafle-item"
                            title="Menu Użytkownika"
                        >
                            <Settings className="w-6 h-6" />
                        </button>

                        <button
                            onClick={signOut}
                            className="user-kafle-item"
                            title="Wyloguj się"
                        >
                            <LogOut className="w-6 h-6" />
                        </button>

                        {showUserMenu && (
                            <div className="user-dropdown show">
                                <Link href="/profile" className="dropdown-item">
                                    <Settings className="w-4 h-4" />
                                    Ustawienia
                                </Link>
                                <button onClick={signOut} className="dropdown-item logout">
                                    <LogOut className="w-4 h-4" />
                                    Wyloguj się
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Kafle logowania dla niezalogowanych */}
                {!user && (
                    <div className="user-menu">
                        <Link
                            href="/auth/signin"
                            className="user-kafle-item"
                            title="Zaloguj się"
                        >
                            LOGIN
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="user-kafle-item"
                            title="Zarejestruj się"
                        >
                            REG
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}
