'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'danger' | 'success'
    size?: 'sm' | 'md' | 'lg'
    fullWidth?: boolean
}

export function BaseButton({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}: BaseButtonProps) {
    const baseClasses = 'font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'

    const variantClasses = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-600 text-white hover:bg-gray-700',
        danger: 'bg-red-600 text-white hover:bg-red-700',
        success: 'bg-green-600 text-white hover:bg-green-700'
    }

    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    }

    const widthClass = fullWidth ? 'w-full' : ''

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}
