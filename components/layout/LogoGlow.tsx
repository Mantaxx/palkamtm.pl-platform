'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export function LogoGlow() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2.5, delay: 0.8 }}
            className="relative z-20"
        >
            {/* Ulepszona poświata logo */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-60 h-60 rounded-full logo-glow-effect"
                style={{ x: '-50%', y: '-50%' }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Logo 3D - proste obracanie */}
            <div className="logo-3d-simple">
                <Link href="/">
                    <Image
                        src="/logo.png"
                        alt="Pałka M.T.M. Mistrzowie Sprintu"
                        width={240}
                        height={240}
                        className="h-60 w-auto object-contain cursor-pointer logo-3d-rotate logo-glow-img"
                    />
                </Link>
            </div>
        </motion.div>
    )
}
