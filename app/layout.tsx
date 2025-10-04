import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ErrorHandlers } from '@/components/ErrorHandlers'
import ClientProviders from '@/components/providers/ClientProviders'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`),
  title: 'Palka MTM - Mistrzowie Sprintu | Golebie Pocztowe',
  description: 'Ekskluzywna platforma aukcyjna dla hodowcow golebi pocztowych. Kupuj i sprzedawaj championow z rodowodami.',
  keywords: 'golebie pocztowe, aukcje, hodowla, championy, rodowody, Palka MTM, mistrzowie sprintu',
  authors: [{ name: 'Palka MTM - Mistrzowie Sprintu' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Palka MTM - Mistrzowie Sprintu',
    description: 'Ekskluzywna platforma aukcyjna dla hodowcow golebi pocztowych',
    type: 'website',
    locale: 'pl_PL',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Palka MTM - Mistrzowie Sprintu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palka MTM - Mistrzowie Sprintu',
    description: 'Ekskluzywna platforma aukcyjna dla hodowcow golebi pocztowych',
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
    <html lang="pl" data-scroll-behavior="smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          precedence="default"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Natychmiastowe wyciszenie błędów - wykonuje się przed wszystkimi innymi skryptami
              (function() {
                // Override console methods NATYCHMIAST
                const originalError = console.error;
                const originalWarn = console.warn;
                const originalLog = console.log;
                
                console.error = function(...args) {
                  const message = args.join(' ');
                  if (message.includes('runtime.lastError') || 
                      message.includes('message port closed') ||
                      message.includes('share-modal') ||
                      message.includes('Could not establish connection') ||
                      message.includes('Receiving end does not exist')) {
                    return; // Wycisz te błędy
                  }
                  originalError.apply(console, args);
                };

                console.warn = function(...args) {
                  const message = args.join(' ');
                  if (message.includes('runtime.lastError') || 
                      message.includes('message port closed')) {
                    return;
                  }
                  originalWarn.apply(console, args);
                };

                // Globalne przechwytywanie błędów
                window.addEventListener('error', function(e) {
                  if (e.message && (
                    e.message.includes('addEventListener') && e.message.includes('null') ||
                    e.message.includes('share-modal') ||
                    e.message.includes('runtime.lastError') ||
                    e.message.includes('Could not establish connection') ||
                    e.message.includes('Receiving end does not exist')
                  )) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    return false;
                  }
                }, true); // Capture phase - wykonuje się przed innymi
                
                // Promise rejections
                window.addEventListener('unhandledrejection', function(e) {
                  if (e.reason && (
                    (e.reason.message && (
                      e.reason.message.includes('runtime.lastError') ||
                      e.reason.message.includes('message port closed') ||
                      e.reason.message.includes('Could not establish connection') ||
                      e.reason.message.includes('Receiving end does not exist')
                    )) ||
                    (typeof e.reason === 'string' && (
                      e.reason.includes('runtime.lastError') ||
                      e.reason.includes('Could not establish connection')
                    ))
                  )) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                  }
                }, true);

                // Dodatkowa ochrona - override window.onerror
                window.onerror = function(message, source, lineno, colno, error) {
                  if (typeof message === 'string' && (
                    message.includes('share-modal') ||
                    message.includes('runtime.lastError') ||
                    message.includes('Could not establish connection')
                  )) {
                    return true; // Zatrzymaj propagację
                  }
                  return false; // Pozwól na normalne błędy
                };
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-900 text-white relative bg-cover bg-top bg-no-repeat bg-fixed pigeon-lofts-background">
        {/* Nakładka dla kontrastu */}
        <div className="absolute inset-0 bg-gray-500/55 z-[-1]" />
        <ClientProviders>
          <ErrorBoundary>
            <ErrorHandlers />
            {children}
          </ErrorBoundary>
        </ClientProviders>
      </body>
    </html>
  )
}
