/** @type {import('next').NextConfig} */
const nextConfig = {
  // Podstawowa konfiguracja Next.js
  reactStrictMode: true,

  // Wyłącz problematyczne funkcje
  generateEtags: false,
  poweredByHeader: false,

  // Uproszczona konfiguracja webpack
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    // Wyłącz cache tylko w trybie dev
    if (dev) {
      config.cache = false
    } else {
      // Włącz cache w produkcji dla lepszej wydajności
      config.cache = {
        type: 'filesystem',
        buildDependencies: {
          config: [__filename]
        }
      }
    }

    // Ignoruj problematyczne pliki
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.next/**',
        '**/react-loadable-manifest.json',
        '**/routes.d.ts',
        '**/pagefile.sys',
        '**/swapfile.sys',
        '**/hiberfil.sys',
      ],
    }

    // Ignoruj błędy z zewnętrznych skryptów
    config.ignoreWarnings = [
      /Failed to parse source map/,
    ]

    return config
  },

  // Optymalizacja cache
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Włącz kompresję
  compress: true,

  // Zezwól na cross-origin requests w dev
  allowedDevOrigins: ['192.168.177.1'],

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
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

module.exports = nextConfig
