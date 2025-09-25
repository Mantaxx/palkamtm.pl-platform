'use client';

import { Footer } from '@/components/layout/Footer';
import { heritageAchievements } from '@/lib/data/heritage-achievements';
// removed temporary sticky header/nav
import { useEffect, useRef, useState } from 'react';
import { FlyingPigeons3D } from './FlyingPigeons3D';

const SCROLL_MULTIPLIER = 3; // Each page is 3 screens high

export function HeritageFlyingPages() {
    const [currentPage, setCurrentPage] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [startPositions, setStartPositions] = useState<{ x: number; y: number; rotate: number }[]>([]);
    const [endPositions, setEndPositions] = useState<{ x: number; y: number; rotate: number }[]>([]);

    useEffect(() => {
        const startPos = heritageAchievements.map(() => ({
            x: (Math.random() - 0.5) * window.innerWidth * 2.5,
            y: (Math.random() - 0.5) * window.innerHeight * 0.5,
            rotate: (Math.random() - 0.5) * 60,
        }));
        const endPos = heritageAchievements.map(() => ({
            x: (Math.random() - 0.5) * window.innerWidth * 0.4,
            y: (Math.random() - 0.5) * window.innerHeight * 0.4,
            rotate: (Math.random() - 0.5) * 15,
        }));
        setStartPositions(startPos);
        setEndPositions(endPos);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            const pageHeight = window.innerHeight * SCROLL_MULTIPLIER;
            const newPage = Math.min(Math.floor(scrollY / pageHeight), heritageAchievements.length - 1);
            if (newPage !== currentPage) {
                setCurrentPage(newPage);
            }

            const glassPanel = document.querySelector('.glass-panel') as HTMLElement;
            if (glassPanel && startPositions.length > 0 && endPositions.length > 0) {
                const scrollProgress = (scrollY % pageHeight) / pageHeight;

                const instabilityFactor = Math.pow(Math.cos(scrollProgress * Math.PI), 2);

                const startZ = -5000;
                const endZ = 2000;
                const currentZ = startZ + (endZ - startZ) * scrollProgress;

                const startScale = 0.05;
                const endScale = 2.5;
                const currentScale = startScale + (endScale - startScale) * scrollProgress;

                const currentStartPos = startPositions[newPage];
                const currentEndPos = endPositions[newPage];

                let currentX = currentStartPos.x + (currentEndPos.x - currentStartPos.x) * scrollProgress;
                let currentY = currentStartPos.y + (currentEndPos.y - currentStartPos.y) * scrollProgress;

                let currentRotate = currentStartPos.rotate * instabilityFactor;

                const driftStrength = 100;
                const driftFrequency = 2;
                currentX += Math.sin(scrollProgress * Math.PI * driftFrequency) * driftStrength * instabilityFactor;
                currentY += Math.cos(scrollProgress * Math.PI * driftFrequency) * driftStrength * 0.5 * instabilityFactor;

                const opacity = Math.sin(scrollProgress * Math.PI);

                glassPanel.style.transform = `
                    translateX(${currentX}px) 
                    translateY(${currentY}px) 
                    translateZ(${currentZ}px) 
                    scale(${currentScale}) 
                    rotateY(${-5 + currentRotate}deg) 
                    rotateX(2deg)
                `;
                glassPanel.style.opacity = `${opacity}`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [startPositions, endPositions, currentPage]);

    useEffect(() => {
        if (containerRef.current) {
            const totalHeight = window.innerHeight * heritageAchievements.length * SCROLL_MULTIPLIER;
            containerRef.current.style.height = `${totalHeight}px`;
        }
    }, []);

    return (
        <div className="relative w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 pt-20">
            {/* header/navigation reverted */}
            <div
                className="fixed top-0 left-0 h-1 w-full bg-gradient-to-r from-yellow-400 to-orange-500 z-50 transition-all duration-300 ease-out"
                style={{ width: `${((currentPage + 1) / heritageAchievements.length) * 100}%` }}
            />

            <div ref={containerRef} className="h-[2400vh] min-h-[2400vh]" />

            <div className="fixed inset-0 w-full h-screen z-10 pointer-events-none">
                {heritageAchievements.length > 0 && <FlyingPigeons3D data={heritageAchievements[currentPage]} />}
            </div>

            <Footer />
        </div>
    );
}
