'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { ShieldAlert, Star, Upload, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const addReferenceSchema = z.object({
  rating: z.number().min(1, 'Ocena jest wymagana.').max(5),
  pigeonId: z.string().optional(),
  comment: z.string().min(10, 'Komentarz musi mieć co najmniej 10 znaków.'),
  photo: z.any().optional(),
})

type AddReferenceFormData = z.infer<typeof addReferenceSchema>

interface MediaFile {
  file: File
  preview: string
}

function StarRating({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  const [hoverValue, setHoverValue] = useState(0)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <Star
          key={star}
          className={`w-8 h-8 cursor-pointer transition-colors ${
            (hoverValue || value) >= star ? 'text-yellow-400' : 'text-white/30'
          }`}
          fill={(hoverValue || value) >= star ? 'currentColor' : 'none'}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(0)}
        />
      ))}
    </div>
  )
}

export function AddReferenceForm() {
  const { data: session, status } = useSession()
  const [mediaFile, setMediaFile] = useState<MediaFile | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AddReferenceFormData>({
    resolver: zodResolver(addReferenceSchema),
    defaultValues: {
      rating: 0,
    },
  })

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      setMediaFile({
        file,
        preview: URL.createObjectURL(file),
      })
      setValue('photo', file)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
    multiple: false,
  })

  const removeMediaFile = () => {
    if (mediaFile) URL.revokeObjectURL(mediaFile.preview)
    setMediaFile(null)
    setValue('photo', null)
  }

  const onSubmit = async (data: AddReferenceFormData) => {
    if (!session?.user?.isPhoneVerified) return

    setIsSubmitting(true)
    console.log('Wysyłanie referencji:', { ...data, photo: mediaFile?.file.name })
    // Symulacja wysyłania do akceptacji admina
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    reset()
    removeMediaFile()
    // Tutaj można dodać np. powiadomienie o sukcesie
  }

  if (status === 'unauthenticated' || !session?.user.isPhoneVerified) {
    return (
      <div className="bg-yellow-50/10 border-l-4 border-yellow-400 p-4 rounded-md text-white">
        <div className="flex">
          <div className="flex-shrink-0"><ShieldAlert className="h-5 w-5 text-yellow-400" /></div>
          <div className="ml-3">
            <p className="text-sm text-yellow-200">
              Musisz być zalogowany i zweryfikowany, aby dodać referencję.
              <Link href={status === 'unauthenticated' ? '/auth/signin' : '/settings/profile'} className="font-medium underline text-yellow-300 hover:text-yellow-400 ml-2">
                {status === 'unauthenticated' ? 'Zaloguj się' : 'Zweryfikuj numer'}
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Twoja ocena</label>
        <Controller name="rating" control={control} render={({ field }) => <StarRating value={field.value} onChange={field.onChange} />} />
        {errors.rating && <p className="text-red-400 text-sm mt-1">{errors.rating.message}</p>}
      </div>

      <div>
        <label htmlFor="pigeonId" className="block text-sm font-medium text-white/80 mb-2">Gołąb, którego dotyczy opinia (opcjonalnie)</label>
        <input {...register('pigeonId')} id="pigeonId" className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="np. numer obrączki, nazwa" />
      </div>

      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-white/80 mb-2">Komentarz</label>
        <textarea {...register('comment')} id="comment" rows={4} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Podziel się swoją opinią..."></textarea>
        {errors.comment && <p className="text-red-400 text-sm mt-1">{errors.comment.message}</p>}
      </div>

      <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragActive ? 'border-cyan-400 bg-cyan-500/10' : 'border-white/30 hover:border-white/50'}`}>
        <input {...getInputProps()} />
        <Upload className="w-10 h-10 text-white/50 mx-auto mb-3" />
        <p className="font-medium text-white">Dodaj zdjęcie (opcjonalnie)</p>
        <p className="text-xs text-white/60">Przeciągnij lub kliknij, aby wybrać</p>
      </div>

      {mediaFile && (
        <div className="relative w-32 h-32 group">
          <Image src={mediaFile.preview} alt="Podgląd" layout="fill" className="rounded-lg object-cover" />
          <button type="button" onClick={removeMediaFile} className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" title="Usuń plik">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <button type="submit" disabled={isSubmitting} className="w-full bg-cyan-600 text-white py-3 px-4 rounded-md font-medium hover:bg-cyan-700 disabled:bg-gray-500 transition-colors">
        {isSubmitting ? 'Wysyłanie...' : 'Wyślij referencję do akceptacji'}
      </button>
    </form>
  )
}