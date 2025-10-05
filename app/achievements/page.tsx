'use client'

import { AchievementsCarousel } from '@/components/achievements/AchievementsCarousel'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'
import { useCallback, useEffect, useState } from 'react'

export default function AchievementsPage() {
    const [, setNavigation] = useState<{
        prevSlide: () => void;
        nextSlide: () => void;
        goToSlide: (index: number) => void;
        currentIndex: number;
        totalItems: number;
    } | null>(null)

    const handleNavigationReady = useCallback((nav: {
        prevSlide: () => void;
        nextSlide: () => void;
        goToSlide: (index: number) => void;
        currentIndex: number;
        totalItems: number;
    }) => {
        setNavigation(nav)
    }, [])

    useEffect(() => {
        // Pozwól na scroll - nie blokuj go
        // Dodaj tabIndex żeby strona mogła mieć focus dla klawiatury
        document.body.tabIndex = -1
        document.body.focus()

        return () => {
            // Cleanup - nie ma nic do przywrócenia
        }
    }, [])

    return (
        <UnifiedLayout showFooter={false} showNavigation={true}>
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-full max-w-7xl mx-auto px-4">
                    <AchievementsCarousel onNavigationReady={handleNavigationReady} />
                </div>
            </div>
        </UnifiedLayout>
    )
}
