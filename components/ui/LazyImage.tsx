'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image';

interface LazyImageProps {
    src: string
    alt: string
    className?: string
    width?: number
    height?: number
    priority?: boolean
    placeholder?: string
    onLoad?: () => void
    onError?: () => void
}

export function LazyImage({
    src,
    alt,
    className = '',
    width,
    height,
    priority = false,
    placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
    onLoad,
    onError
}: LazyImageProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInView, setIsInView] = useState(priority)
    const [hasError, setHasError] = useState(false)
    const imgRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (priority) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true)
                    observer.disconnect()
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px'
            }
        )

        if (imgRef.current) {
            observer.observe(imgRef.current)
        }

        return () => observer.disconnect()
    }, [priority])

    const handleLoad = () => {
        setIsLoaded(true)
        onLoad?.()
    }

    const handleError = () => {
        setHasError(true)
        onError?.()
    }

    return (
        <div
            ref={imgRef}
            className={`relative overflow-hidden ${className}`}
            {...(width && { style: { width: `${width}px` } })}
            {...(height && { style: { height: `${height}px` } })}
        >
            {/* Placeholder */}
            {!isLoaded && !hasError && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center bg-gray-100"
                >
                    <Image
                        src={placeholder}
                        alt=""
                        width={width || 400}
                        height={height || 300}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            )}

            {/* Error state */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-center text-gray-500">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                        <p className="text-sm">Błąd ładowania obrazu</p>
                    </div>
                </div>
            )}

            {/* Actual image */}
            {isInView && !hasError && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full"
                >
                    <Image
                        src={src}
                        alt={alt}
                        width={width || 400}
                        height={height || 300}
                        className="w-full h-full object-cover"
                        onLoad={handleLoad}
                        onError={handleError}
                        loading={priority ? 'eager' : 'lazy'}
                        decoding="async"
                    />
                </motion.div>
            )}
        </div>
    )
}
