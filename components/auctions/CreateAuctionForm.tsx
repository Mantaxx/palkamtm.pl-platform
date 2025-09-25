'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Upload,
  Video,
  X
} from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const createAuctionSchema = z.object({
  category: z.enum(['Pigeon', 'Supplements', 'Accessories'], {
    required_error: 'Wybierz kategorię'
  }),
  title: z.string().min(10, 'Tytuł musi mieć co najmniej 10 znaków'),
  description: z.string().min(50, 'Opis musi mieć co najmniej 50 znaków'),

  // Pola specyficzne dla gołębi
  ringNumber: z.string().optional(),
  bloodline: z.string().optional(),
  sex: z.enum(['male', 'female']).optional(),
  birthDate: z.string().optional(),
  pedigreeFile: z.any().optional(),
  eyeColor: z.string().optional(),
  featherColor: z.string().optional(),
  disciplines: z.array(z.string()).optional(),
  dnaCertificate: z.string().optional(),

  // PPQC - ogólny opis
  ppqcSize: z.string().optional(),
  ppqcBody: z.string().optional(),
  ppqcVitality: z.string().optional(),
  ppqcColorDensity: z.string().optional(),
  ppqcLength: z.string().optional(),
  ppqcEndurance: z.string().optional(),
  ppqcForkStrength: z.string().optional(),
  ppqcForkLayout: z.string().optional(),
  ppqcMuscles: z.string().optional(),
  ppqcBalance: z.string().optional(),
  ppqcBack: z.string().optional(),

  // PPQC - skrzydło
  ppqcBreedingFeathers: z.string().optional(),
  ppqcPrimaries: z.string().optional(),
  ppqcPlumage: z.string().optional(),
  ppqcFeatherQuality: z.string().optional(),
  ppqcSecondaries: z.string().optional(),
  ppqcElasticity: z.string().optional(),

  // Cena i format sprzedaży
  startingPrice: z.number().min(1, 'Cena wywoławcza musi być większa od 0'),
  buyNowPrice: z.number().optional(),
  saleFormat: z.enum(['auction', 'auction_with_buy_now', 'buy_now_only']),

  // Czas trwania aukcji
  duration: z.number().min(1).max(30),

  // Lokalizacja
  location: z.string().min(2, 'Podaj lokalizację')
})

type CreateAuctionFormData = z.infer<typeof createAuctionSchema>

interface MediaFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video'
}

interface CreateAuctionFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

const steps = [
  { id: 1, title: 'Kategoria', description: 'Wybierz typ produktu' },
  { id: 2, title: 'Szczegóły', description: 'Podstawowe informacje' },
  { id: 3, title: 'Cena', description: 'Ustaw cenę i format' },
  { id: 4, title: 'Media', description: 'Dodaj zdjęcia i filmy' },
  { id: 5, title: 'Podsumowanie', description: 'Sprawdź i opublikuj' }
]

export default function CreateAuctionForm({ onSuccess }: CreateAuctionFormProps) {
  const { data: session, status } = useSession()
  const [currentStep, setCurrentStep] = useState(1)
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<CreateAuctionFormData>({
    resolver: zodResolver(createAuctionSchema),
    mode: 'onChange'
  })

  const watchedCategory = watch('category')
  const watchedSaleFormat = watch('saleFormat')

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles: MediaFile[] = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('video/') ? 'video' : 'image'
    }))

    setMediaFiles(prev => [...prev, ...newFiles])
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 10
  })

  const removeMediaFile = (id: string) => {
    setMediaFiles(prev => {
      const file = prev.find(f => f.id === id)
      if (file) {
        URL.revokeObjectURL(file.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: CreateAuctionFormData) => {
    setIsSubmitting(true)

    try {
      // Tworzenie nowej aukcji
      const newAuction = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        startingPrice: data.startingPrice,
        currentPrice: data.startingPrice,
        buyNowPrice: data.buyNowPrice,
        endTime: new Date(Date.now() + (data.duration || 7) * 24 * 60 * 60 * 1000),
        bids: 0,
        watchers: 0,
        category: data.category,
        bloodline: data.bloodline,
        age: data.birthDate ? new Date().getFullYear() - new Date(data.birthDate).getFullYear() + ' lat' : null,
        location: data.location,
        seller: 'Pałka M.T.M.', // Domyślny sprzedawca
        sellerRating: 5.0,
        images: mediaFiles.filter(f => f.type === 'image').map(f => f.preview),
        isWatched: false,
        createdAt: new Date().toISOString(),
        status: 'active'
      }

      // Pobieranie istniejących aukcji z localStorage
      const existingAuctions = JSON.parse(localStorage.getItem('auctions') || '[]')

      // Dodanie nowej aukcji
      const updatedAuctions = [...existingAuctions, newAuction]

      // Zapisanie do localStorage
      localStorage.setItem('auctions', JSON.stringify(updatedAuctions))

      // Symulacja opóźnienia
      await new Promise(resolve => setTimeout(resolve, 1000))

      console.log('Aukcja utworzona:', newAuction)

      // Wywołanie callback onSuccess
      if (onSuccess) {
        onSuccess()
      } else {
        // Fallback - przekierowanie do strony aukcji
        window.location.href = '/auctions'
      }

    } catch (error) {
      console.error('Błąd podczas tworzenia aukcji:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center p-8">
        <p>Ładowanie sesji...</p>
      </div>
    )
  }

  if (status === 'unauthenticated' || !session?.user) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
        <p className="text-sm text-red-700">
          Musisz być zalogowany, aby utworzyć aukcję.
          <Link href="/auth/signin" className="font-medium underline text-red-800 hover:text-red-900 ml-2">
            Zaloguj się
          </Link>
        </p>
      </div>
    )
  }

  if (!session.user.isPhoneVerified) {
    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <ShieldAlert className="h-5 w-5 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Weryfikacja numeru telefonu jest wymagana.
              <Link href="/settings/profile" className="font-medium underline text-yellow-800 hover:text-yellow-900 ml-2">
                Przejdź do ustawień, aby zweryfikować swój numer i uzyskać pełen dostęp.
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Wybierz kategorię</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { value: 'Pigeon', label: 'Gołąb Pocztowy', icon: '🐦' },
                { value: 'Supplements', label: 'Suplementy', icon: '💊' },
                { value: 'Accessories', label: 'Akcesoria', icon: '🏠' }
              ].map((category) => (
                <label
                  key={category.value}
                  className={`relative flex flex-col items-center p-6 border-2 rounded-lg cursor-pointer transition-colors ${watchedCategory === category.value
                    ? 'border-slate-500 bg-slate-50'
                    : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  <input
                    type="radio"
                    value={category.value}
                    {...register('category')}
                    className="sr-only"
                  />
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <span className="font-medium text-gray-900">{category.label}</span>
                </label>
              ))}
            </div>

            {errors.category && (
              <p className="text-red-600 text-sm">{errors.category.message}</p>
            )}
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Szczegóły produktu</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tytuł aukcji *
                </label>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="np. Champion 'Thunder Storm' - Linia Janssen"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opis *
                </label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="Opisz szczegółowo produkt, jego historię, osiągnięcia..."
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              {watchedCategory === 'Pigeon' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numer obrączki
                    </label>
                    <input
                      type="text"
                      {...register('ringNumber')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="PL 2024 123456"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Linia krwi/Szczep
                    </label>
                    <input
                      type="text"
                      {...register('bloodline')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="np. Janssen, Sion, Bricoux"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Płeć
                    </label>
                    <select
                      {...register('sex')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                    >
                      <option value="">Wybierz płeć</option>
                      <option value="male">Samiec</option>
                      <option value="female">Samica</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Data urodzenia
                    </label>
                    <input
                      type="date"
                      {...register('birthDate')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kolor oka (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      {...register('eyeColor')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="np. żółty"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Barwa gołębia (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      {...register('featherColor')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="np. szpak"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dyscypliny (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      {...register('disciplines')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="np. krótki dystans, średni dystans"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Certyfikat DNA (opcjonalnie)
                    </label>
                    <input
                      type="text"
                      {...register('dnaCertificate')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="np. Oboje rodziców"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lokalizacja *
                </label>
                <input
                  type="text"
                  {...register('location')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  placeholder="np. Kraków, Polska"
                />
                {errors.location && (
                  <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Cena i format sprzedaży</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format sprzedaży *
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'auction', label: 'Tylko licytacja', description: 'Aukcja od ceny wywoławczej' },
                    { value: 'auction_with_buy_now', label: 'Licytacja + Kup teraz', description: 'Możliwość licytacji lub natychmiastowego zakupu' },
                    { value: 'buy_now_only', label: 'Tylko Kup teraz', description: 'Stała cena bez licytacji' }
                  ].map((format) => (
                    <label
                      key={format.value}
                      className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${watchedSaleFormat === format.value
                        ? 'border-slate-500 bg-slate-50'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <input
                        type="radio"
                        value={format.value}
                        {...register('saleFormat')}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{format.label}</p>
                        <p className="text-sm text-gray-600">{format.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cena wywoławcza (zł) *
                  </label>
                  <input
                    type="number"
                    {...register('startingPrice', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                    placeholder="5000"
                  />
                  {errors.startingPrice && (
                    <p className="text-red-600 text-sm mt-1">{errors.startingPrice.message}</p>
                  )}
                </div>

                {(watchedSaleFormat === 'auction_with_buy_now' || watchedSaleFormat === 'buy_now_only') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cena Kup teraz (zł)
                    </label>
                    <input
                      type="number"
                      {...register('buyNowPrice', { valueAsNumber: true })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                      placeholder="15000"
                    />
                  </div>
                )}
              </div>

              {watchedSaleFormat !== 'buy_now_only' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Czas trwania aukcji (dni)
                  </label>
                  <select
                    {...register('duration', { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
                  >
                    <option value={1}>1 dzień</option>
                    <option value={3}>3 dni</option>
                    <option value={7}>7 dni</option>
                    <option value={14}>14 dni</option>
                    <option value={30}>30 dni</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Zdjęcia i filmy</h2>

            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                ? 'border-slate-500 bg-slate-50'
                : 'border-gray-300 hover:border-gray-400'
                }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-900 mb-2">
                {isDragActive ? 'Upuść pliki tutaj' : 'Przeciągnij pliki lub kliknij, aby wybrać'}
              </p>
              <p className="text-sm text-gray-600">
                Obsługiwane formaty: JPG, PNG, WebP, MP4, MOV, AVI (max 10 plików)
              </p>
            </div>

            {mediaFiles.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mediaFiles.map((file) => (
                  <div key={file.id} className="relative group">
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                      {file.type === 'image' ? (
                        <Image
                          src={file.preview}
                          alt="Preview"
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeMediaFile(file.id)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Usuń plik"
                      aria-label="Usuń plik"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {/* PPQC i Charakterystyka - opcjonalne */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Charakterystyka i PPQC (opcjonalnie)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wielkość</label>
                  <input type="text" {...register('ppqcSize')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="średni" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budowa korpusu</label>
                  <input type="text" {...register('ppqcBody')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="normalny" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Witalność</label>
                  <input type="text" {...register('ppqcVitality')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="silny" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gęstość barwy</label>
                  <input type="text" {...register('ppqcColorDensity')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="bardzo silny" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Długość</label>
                  <input type="text" {...register('ppqcLength')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="średni" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Wytrzymałość</label>
                  <input type="text" {...register('ppqcEndurance')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="silny" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Siła widełek</label>
                  <input type="text" {...register('ppqcForkStrength')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="silny" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Układ widełek</label>
                  <input type="text" {...register('ppqcForkLayout')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="lekko otwarty" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mięśnie</label>
                  <input type="text" {...register('ppqcMuscles')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="giętki" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Balans</label>
                  <input type="text" {...register('ppqcBalance')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="zbalansowany" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plecy</label>
                  <input type="text" {...register('ppqcBack')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="przeciętny" />
                </div>

                <div className="md:col-span-2 h-px bg-gray-200" />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pióra rozpłodowe</label>
                  <input type="text" {...register('ppqcBreedingFeathers')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="za młody" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lotki</label>
                  <input type="text" {...register('ppqcPrimaries')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="długi, normalny" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upierzenie</label>
                  <input type="text" {...register('ppqcPlumage')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="normalne upierzenie" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jakość piór</label>
                  <input type="text" {...register('ppqcFeatherQuality')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="miękki" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lotki II-go rzędu</label>
                  <input type="text" {...register('ppqcSecondaries')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="normalny" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Elastyczność</label>
                  <input type="text" {...register('ppqcElasticity')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="bardzo giętki" />
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Podsumowanie</h2>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Kategoria</h3>
                <p className="text-gray-600">{watchedCategory}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Tytuł</h3>
                <p className="text-gray-600">{watch('title')}</p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900">Cena wywoławcza</h3>
                <p className="text-gray-600">{watch('startingPrice')} zł</p>
              </div>

              {watch('buyNowPrice') && (
                <div>
                  <h3 className="font-medium text-gray-900">Cena Kup teraz</h3>
                  <p className="text-gray-600">{watch('buyNowPrice')} zł</p>
                </div>
              )}

              <div>
                <h3 className="font-medium text-gray-900">Pliki multimedialne</h3>
                <p className="text-gray-600">{mediaFiles.length} plików</p>
              </div>

              {/* PPQC summary (optional) */}
              <div>
                <h3 className="font-medium text-gray-900">PPQC (opcjonalnie)</h3>
                <p className="text-gray-600 text-sm">Możesz uzupełnić po opublikowaniu w edycji aukcji.</p>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Progress bar */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= step.id
                  ? 'bg-slate-600 text-white'
                  : 'bg-gray-200 text-gray-600'
                  }`}
              >
                {step.id}
              </div>
              <div className="ml-3 hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{step.title}</p>
                <p className="text-xs text-gray-500">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="w-8 h-0.5 bg-gray-200 mx-4 hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form content */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Wstecz
          </button>

          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-6 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors"
            >
              Dalej
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Publikuję...' : 'Opublikuj aukcję'}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}