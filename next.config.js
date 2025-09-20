/** @type {import('next').NextConfig} */
const nextConfig = {
  // Podstawowa konfiguracja Next.js
  reactStrictMode: true,

  images: {
    domains: ['localhost', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },

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

    // Wyłącz cache w trybie dev
    if (dev) {
      config.cache = false
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
      /share-modal\.js/,
      /runtime\.lastError/,
      /tui-image-editor/,
      /tui-image-editor-main-container/,
      /tui-image-editor-download-btn/,
    ]

    return config
  },

  // Wyłącz cache
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

module.exports = nextConfig
