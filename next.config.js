/** @type {import('next').NextConfig} */
const nextConfig = {
  // Podstawowa konfiguracja Next.js
  reactStrictMode: true,

  // Wyłącz problematyczne funkcje
  generateEtags: false,
  poweredByHeader: false,

  // Optymalizacja wydajności
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Ustawienia dla stabilności na Windows
  ...(process.env.NODE_ENV === 'development' && {
    // Stabilny build ID
    generateBuildId: () => 'dev-build-stable',
  }),

  // Stabilna konfiguracja webpack
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      }
    }

    // Optymalizacja bundle size
    if (!dev) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }

    return config
  },

  // Optymalizacja cache - wyłącz w dev
  ...(process.env.NODE_ENV === 'production' && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),

  // Włącz kompresję tylko w production
  compress: process.env.NODE_ENV === 'production',

  // Optymalizacja obrazów - Next.js 15 format
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.buymeacoffee.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '',
        pathname: '/**',
      },
    ],
    localPatterns: [
      {
        pathname: '/**',
      },
    ],
    qualities: [25, 50, 75, 85, 100],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
