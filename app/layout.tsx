import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/providers/Providers'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`),
  title: 'Pałka MTM - Mistrzowie Sprintu | Gołębie Pocztowe',
  description: 'Ekskluzywna platforma aukcyjna dla hodowców gołębi pocztowych. Kupuj i sprzedawaj championów z rodowodami.',
  keywords: 'gołębie pocztowe, aukcje, hodowla, championy, rodowody, Pałka MTM, mistrzowie sprintu',
  authors: [{ name: 'Pałka MTM - Mistrzowie Sprintu' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Pałka MTM - Mistrzowie Sprintu',
    description: 'Ekskluzywna platforma aukcyjna dla hodowców gołębi pocztowych',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Pałka MTM - Mistrzowie Sprintu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pałka MTM - Mistrzowie Sprintu',
    description: 'Ekskluzywna platforma aukcyjna dla hodowców gołębi pocztowych',
    images: ['/logo.png'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Tłumienie błędów z zewnętrznych skryptów
              window.addEventListener('error', function(e) {
                if (e.filename && (
                  e.filename.includes('share-modal.js') ||
                  e.filename.includes('runtime.lastError') ||
                  e.filename.includes('chrome-extension://') ||
                  e.filename.includes('moz-extension://') ||
                  e.filename.includes('tui-image-editor')
                )) {
                  e.preventDefault();
                  return false;
                }
              });
              
              // Tłumienie błędów z Promise
              window.addEventListener('unhandledrejection', function(e) {
                if (e.reason && e.reason.message && (
                  e.reason.message.includes('share-modal') ||
                  e.reason.message.includes('runtime.lastError') ||
                  e.reason.message.includes('Could not establish connection') ||
                  e.reason.message.includes('tui-image-editor')
                )) {
                  e.preventDefault();
                  return false;
                }
              });
              
              // Tłumienie błędów z TUI Image Editor
              const originalQuerySelector = document.querySelector;
              document.querySelector = function(selector) {
                if (selector && (
                  selector.includes('tui-image-editor-main-container') ||
                  selector.includes('tui-image-editor-download-btn')
                )) {
                  return null;
                }
                return originalQuerySelector.call(this, selector);
              };
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <ErrorBoundary>
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}
