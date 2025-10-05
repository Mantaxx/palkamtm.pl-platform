'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface LazyImageProps {
    src: string
    alt: string
    width?: number
    height?: number
    className?: string
    priority?: boolean
    placeholder?: 'blur' | 'empty'
    blurDataURL?: string
    sizes?: string
    quality?: number
    fill?: boolean
    onClick?: () => void
    onLoad?: () => void
    onError?: () => void
}

export function LazyImage({
    src,
    alt,
    width,
    height,
    className,
    priority = false,
    placeholder = 'blur',
    blurDataURL,
    sizes,
    quality = 75,
    fill = false,
    onClick,
    onLoad,
    onError
}: LazyImageProps) {
    const [isInView, setIsInView] = useState(priority)
    const imgRef = useRef<HTMLDivElement>(null)

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
        onLoad?.()
    }

    const handleError = () => {
        onError?.()
    }

    // Placeholder blur data URL
    const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k='

    return (
        <div
            ref={imgRef}
            className={`lazy-image-container relative overflow-hidden ${className || ''}`}
            onClick={onClick}
        >
            {isInView ? (
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    fill={fill}
                    sizes={sizes}
                    quality={quality}
                    priority={priority}
                    placeholder={placeholder}
                    blurDataURL={blurDataURL || defaultBlurDataURL}
                    onLoad={handleLoad}
                    onError={handleError}
                    className="transition-opacity duration-300 opacity-100"
                />
            ) : (
                <div className="lazy-image-placeholder">
                    <div className="lazy-image-loading-text">Ładowanie...</div>
                </div>
            )}
        </div>
    )
}