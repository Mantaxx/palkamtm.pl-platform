import { Facebook, Instagram, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'

const footerLinks = {
  company: [
    { name: 'O nas', href: '/about' },
    { name: 'Nasze Dziedzictwo', href: '/heritage' },
    { name: 'Kontakt', href: '/contact' },
    { name: 'Kariera', href: '/careers' },
  ],
  services: [
    { name: 'Aukcje', href: '/auctions' },
    { name: 'Championy', href: '/champions' },
    { name: 'Referencje', href: '/references' },
    { name: 'Pomoc', href: '/help' },
  ],
  legal: [
    { name: 'Regulamin', href: '/terms' },
    { name: 'Polityka Prywatności', href: '/privacy' },
    { name: 'Warunki Sprzedaży', href: '/sales-terms' },
    { name: 'Rodo', href: '/gdpr' },
  ],
}

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/PalkaGolebiepl/?locale=pl_PL', icon: Facebook },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Twitter', href: '#', icon: Twitter },
]

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">GP</span>
              </div>
              <span className="font-display font-bold text-lg sm:text-xl">
                Gołębie Pocztowe
              </span>
            </div>
            <p className="text-gray-400 mb-4 sm:mb-6 text-sm sm:text-base">
              Ekskluzywna platforma aukcyjna dla hodowców gołębi pocztowych.
              Kupuj i sprzedawaj championów z rodowodami.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3 text-gray-400">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span className="text-xs sm:text-sm break-all">kontakt@golebiepocztowe.pl</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 text-gray-400">
                <span className="text-xs sm:text-sm">Szczegółowe dane kontaktowe znajdziesz na stronie</span>
                <a
                  href="/contact"
                  className="text-white/60 hover:text-white/80 transition-colors underline text-xs sm:text-sm"
                >
                  Kontakt
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Firma</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Usługi</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Prawne</h3>
            <ul className="space-y-1 sm:space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm sm:text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>



        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-gray-400 text-xs sm:text-sm text-center sm:text-left">
              © 2024 Gołębie Pocztowe. Wszystkie prawa zastrzeżone.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
