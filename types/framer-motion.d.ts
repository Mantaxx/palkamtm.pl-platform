declare module 'framer-motion' {
    import { ComponentProps } from 'react'

    export interface MotionProps {
        className?: string
        style?: React.CSSProperties
        onClick?: (e: React.MouseEvent) => void
        onSubmit?: (e: React.FormEvent) => void
        href?: string
        type?: string
        disabled?: boolean
        src?: string
        alt?: string
        width?: number | string
        height?: number | string
        fill?: boolean
        sizes?: string
        quality?: number
        priority?: boolean
        placeholder?: 'blur' | 'empty'
        blurDataURL?: string
        onLoad?: () => void
        onError?: () => void
        loading?: string
        decoding?: string
    }

    export const motion: {
        [K in keyof JSX.IntrinsicElements]: React.ComponentType<
            MotionProps & ComponentProps<JSX.IntrinsicElements[K]>
        >
    }

    export const AnimatePresence: React.ComponentType<any>

    // Hooks
    export function useScroll(options?: any): { scrollYProgress: any }
    export function useSpring(value: any, config?: any): any
    export function useTransform(value: any, inputRange: any[], outputRange: any[]): any
}
