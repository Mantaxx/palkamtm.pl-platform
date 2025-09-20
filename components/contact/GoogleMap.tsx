'use client'

import { motion } from 'framer-motion'
import { ExternalLink, MapPin, Navigation } from 'lucide-react'

export default function GoogleMap() {
    const address = "ul. Stawowa 6, 59-800 Lubań"
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`

    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Mapa */}
                <div className="relative">
                    <div className="aspect-video rounded-2xl overflow-hidden border-2 border-white" style={{
                        boxShadow: '0 8px 32px rgba(255, 255, 255, 0.4), 0 16px 64px rgba(255, 255, 255, 0.2), 0 24px 96px rgba(255, 255, 255, 0.1)'
                    }}>
                        <iframe
                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(address)}&zoom=15`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa hodowli MTM Pałka"
                        />
                    </div>
                </div>

                {/* Informacje o dojeździe */}
                <div className="space-y-6">
                    <div className="text-center lg:text-left">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center lg:justify-start">
                            <MapPin className="w-6 h-6 mr-2 text-slate-400" />
                            Jak do nas trafić
                        </h3>
                        <p className="text-slate-200 mb-6">
                            Nasza hodowla znajduje się w Lubaniu, w sercu Dolnego Śląska.
                            Zapraszamy do odwiedzenia nas po wcześniejszym umówieniu.
                        </p>
                    </div>

                    {/* Przyciski akcji */}
                    <div className="space-y-4">
                        <motion.a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="block w-full p-4 glass-morphism rounded-2xl border-2 border-white hover:glass-morphism-strong transition-all duration-300 group"
                            style={{
                                boxShadow: '0 8px 32px rgba(255, 255, 255, 0.4), 0 16px 64px rgba(255, 255, 255, 0.2), 0 24px 96px rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <div className="flex items-center justify-center">
                                <MapPin className="w-5 h-5 mr-3 text-slate-400 group-hover:text-white transition-colors" />
                                <span className="text-white font-medium">Zobacz na mapie</span>
                                <ExternalLink className="w-4 h-4 ml-2 text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                        </motion.a>

                        <motion.a
                            href={directionsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="block w-full p-4 glass-morphism rounded-2xl border-2 border-white hover:glass-morphism-strong transition-all duration-300 group"
                            style={{
                                boxShadow: '0 8px 32px rgba(255, 255, 255, 0.4), 0 16px 64px rgba(255, 255, 255, 0.2), 0 24px 96px rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <div className="flex items-center justify-center">
                                <Navigation className="w-5 h-5 mr-3 text-slate-400 group-hover:text-white transition-colors" />
                                <span className="text-white font-medium">Pobierz trasę</span>
                                <ExternalLink className="w-4 h-4 ml-2 text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                        </motion.a>
                    </div>

                    {/* Dodatkowe informacje */}
                    <div className="mt-8 p-6 glass-morphism rounded-2xl border-2 border-white" style={{
                        boxShadow: '0 8px 32px rgba(255, 255, 255, 0.4), 0 16px 64px rgba(255, 255, 255, 0.2), 0 24px 96px rgba(255, 255, 255, 0.1)'
                    }}>
                        <h4 className="text-lg font-semibold text-white mb-4">Wskazówki dojazdu</h4>
                        <ul className="space-y-2 text-slate-200 text-sm">
                            <li>• Z centrum Lubania: 5 minut samochodem</li>
                            <li>• Z Wrocławia: około 1 godziny</li>
                            <li>• Z Jeleniej Góry: około 30 minut</li>
                            <li>• Parking dostępny na miejscu</li>
                            <li>• Wizyty tylko po wcześniejszym umówieniu</li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
