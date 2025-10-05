'use client'

import { ReactNode } from 'react'

interface BaseCardProps {
    children: ReactNode
    className?: string
    variant?: 'default' | 'glass' | 'transparent'
    hover?: boolean
}

export function BaseCard({
    children,
    className = '',
    variant = 'default',
    hover = true
}: BaseCardProps) {
    const baseClasses = 'rounded-lg p-4 transition-colors'

    const variantClasses = {
        default: 'bg-white/10 border border-white/20',
        glass: 'bg-white/5 backdrop-blur-sm border border-white/10',
        transparent: 'bg-transparent border border-white/20'
    }

    const hoverClasses = hover ? 'hover:border-white/40 hover:bg-white/15' : ''

    return (
        <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}>
            {children}
        </div>
    )
}
