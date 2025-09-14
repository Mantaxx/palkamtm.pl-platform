import { Footer } from '@/components/layout/Footer'
import { Navigation } from '@/components/layout/Navigation'
import { Providers } from '@/components/providers/Providers'
import type { Metadata } from 'next'
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
  title: 'Gołębie Pocztowe - Platforma Aukcyjna',
  description: 'Ekskluzywna platforma aukcyjna dla hodowców gołębi pocztowych. Kupuj i sprzedawaj championów z rodowodami.',
  keywords: 'gołębie pocztowe, aukcje, hodowla, championy, rodowody',
  authors: [{ name: 'Platforma Gołębi Pocztowych' }],
  openGraph: {
    title: 'Gołębie Pocztowe - Platforma Aukcyjna',
    description: 'Ekskluzywna platforma aukcyjna dla hodowców gołębi pocztowych',
    type: 'website',
    locale: 'pl_PL',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
