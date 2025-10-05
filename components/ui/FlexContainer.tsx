'use client'

import { ReactNode } from 'react'

interface FlexContainerProps {
    children: ReactNode
    className?: string
    direction?: 'row' | 'column'
    align?: 'start' | 'center' | 'end' | 'stretch'
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
    gap?: 'sm' | 'md' | 'lg' | 'xl'
    wrap?: boolean
}

export function FlexContainer({
    children,
    className = '',
    direction = 'row',
    align = 'center',
    justify = 'start',
    gap = 'md',
    wrap = false
}: FlexContainerProps) {
    const baseClasses = 'flex'

    const directionClasses = {
        row: 'flex-row',
        column: 'flex-col'
    }

    const alignClasses = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch'
    }

    const justifyClasses = {
        start: 'justify-start',
        center: 'justify-center',
        end: 'justify-end',
        between: 'justify-between',
        around: 'justify-around',
        evenly: 'justify-evenly'
    }

    const gapClasses = {
        sm: 'gap-2',
        md: 'gap-4',
        lg: 'gap-6',
        xl: 'gap-8'
    }

    const wrapClass = wrap ? 'flex-wrap' : ''

    return (
        <div className={`${baseClasses} ${directionClasses[direction]} ${alignClasses[align]} ${justifyClasses[justify]} ${gapClasses[gap]} ${wrapClass} ${className}`}>
            {children}
        </div>
    )
}
