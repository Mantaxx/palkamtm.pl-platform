'use client'

import { ReactNode } from 'react'

interface CenteredContainerProps {
    children: ReactNode
    className?: string
    direction?: 'row' | 'column'
    gap?: 'sm' | 'md' | 'lg'
}

export function CenteredContainer({
    children,
    className = '',
    direction = 'row',
    gap = 'md'
}: CenteredContainerProps) {
    const baseClasses = 'flex items-center justify-center'

    const directionClasses = {
        row: 'flex-row',
        column: 'flex-col'
    }

    const gapClasses = {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6'
    }

    return (
        <div className={`${baseClasses} ${directionClasses[direction]} ${gapClasses[gap]} ${className}`}>
            {children}
        </div>
    )
}
