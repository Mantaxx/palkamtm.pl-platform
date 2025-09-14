import { Mail, MapPin, Phone, Facebook } from 'lucide-react'

export const metadata = {
  title: 'Kontakt - Gołębie Pocztowe',
  description: 'Skontaktuj się z nami. Adres, telefon, email i lokalizacja Pałka MTM.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kontakt</h1>
          <p className="text-xl text-gray-600">
            Skontaktuj się z nami w dowolny sposób
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Dane kontaktowe
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <a 
                      href="mailto:kontakt@golebiepocztowe.pl"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      kontakt@golebiepocztowe.pl
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Telefon</h3>
                    <a 
                      href="tel:+48757224729"
                      className="text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      +48 75 722 47 29
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Adres</h3>
                    <p className="text-gray-600">
                      ul. Stawowa 6<br />
                      59-800 Lubań
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                O firmie
              </h3>
              <p className="text-gray-600">
                Pałka MTM to renomowana firma specjalizująca się w hodowli gołębi pocztowych. 
                Oferujemy ekskluzywne gołębie z rodowodami oraz profesjonalne usługi hodowlane.
              </p>
            </div>
          </div>

          {/* Maps and Facebook */}
          <div className="space-y-8">
            {/* Google Maps */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Lokalizacja
              </h2>
              <div className="relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2504.1234567890123!2d15.2877!3d51.1187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTnCsDA3JzA3LjMiTiAxNcKwMTcnMTIuNyJF!5e0!3m2!1spl!2spl!4v1234567890123"
                  width="100%"
                  height="300"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg border-0"
                  title="Lokalizacja Pałka MTM - ul. Stawowa 6, Lubań"
                />
                <div className="absolute inset-0 bg-black/10 rounded-lg pointer-events-none"></div>
              </div>
              <div className="mt-3">
                <a
                  href="https://maps.google.com/?q=ul.+Stawowa+6,+59-800+Lubań"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors text-sm"
                >
                  <span>Sprawdź trasę dojazdu</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Facebook Page Plugin */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Śledź nas na Facebooku
              </h2>
              <div className="w-full h-[300px]">
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FPalkaGolebiepl%2F&tabs=timeline&width=400&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  width="100%"
                  height="300"
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="rounded-lg border-0 overflow-hidden"
                  title="Facebook Page Plugin - Pałka Gołębie"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
