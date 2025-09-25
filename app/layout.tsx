import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ErrorHandlers } from '@/components/ErrorHandlers'
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
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${poppins.variable}`} data-scroll-behavior="smooth">
      {/*
        Dodajemy tutaj link do Font Awesome.
        W Next.js App Router nie powinno się dodawać własnego tagu <head> do RootLayout,
        ale można dodawać tagi <link> i <script> bezpośrednio w <html>.
      */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
      <body className={`${inter.className} min-h-screen flex flex-col`}> {/* Usunięto tag <head> i <link> - Next.js zarządza tym automatycznie */}
        <Providers>
          <ErrorBoundary>
            <ErrorHandlers />
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
