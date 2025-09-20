'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function LogoGlow() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2.5, delay: 0.8 }}
            className="absolute top-8 left-8 z-20"
        >
            {/* Światła lamp */}
            <div
                className="absolute top-40 -left-8 w-[28rem] h-40 rounded-full animate-pulse logo-glow-1"
            ></div>
            <div
                className="absolute top-44 -left-6 w-96 h-32 rounded-full animate-pulse logo-glow-2"
            ></div>
            <div
                className="absolute top-48 -left-4 w-80 h-24 rounded-full animate-pulse logo-glow-3"
            ></div>
            <div
                className="absolute top-52 -left-2 w-64 h-16 rounded-full animate-pulse logo-glow-4"
            ></div>

            {/* Logo 3D - proste obracanie */}
            <div className="logo-3d-simple">
                <Link href="/">
                    <img
                        src="/logo.png"
                        alt="Pałka M.T.M. Mistrzowie Sprintu"
                        className="h-72 w-auto object-contain cursor-pointer logo-3d-rotate"
                    />
                </Link>
            </div>
        </motion.div>
    )
}
