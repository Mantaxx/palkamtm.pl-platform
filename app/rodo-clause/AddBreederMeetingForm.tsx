'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Camera, FileUp, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { UnifiedButton } from '../../components/ui/UnifiedButton'
import { UnifiedCard } from '../../components/ui/UnifiedCard'

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const formSchema = z.object({
    title: z.string().min(3, 'Tytuł musi mieć co najmniej 3 znaki.'),
    breederName: z.string().min(3, 'Nazwa hodowcy jest wymagana.'),
    description: z.string().optional(),
    location: z.string().optional(),
    meetingDate: z.string().optional(),
    images: z
        .unknown()
        .refine((files) => files && Array.isArray(files) && files.length > 0, 'Wymagane jest co najmniej jedno zdjęcie.')
        .refine((files) => files && Array.isArray(files) && files.length <= 10, 'Można przesłać maksymalnie 10 plików.')
        .refine(
            (files) => files && Array.isArray(files) && Array.from(files).every((file: unknown) => 
                file && typeof file === 'object' && 'size' in file && typeof file.size === 'number' && file.size <= MAX_FILE_SIZE
            ),
            `Maksymalny rozmiar pliku to 5MB.`
        )
        .refine(
            (files) => files && Array.isArray(files) && Array.from(files).every((file: unknown) => 
                file && typeof file === 'object' && 'type' in file && typeof file.type === 'string' && ALLOWED_FILE_TYPES.includes(file.type)
            ),
            'Dozwolone są tylko pliki .jpg, .jpeg, .png i .webp.'
        ),
})

type FormData = z.infer<typeof formSchema>

export default function AddBreederMeetingForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true)
        setServerError(null)
        setSuccessMessage(null)

        const formData = new FormData()
        formData.append('title', data.title)
        formData.append('breederName', data.breederName)
        if (data.description) formData.append('description', data.description)
        if (data.location) formData.append('location', data.location)
        if (data.meetingDate) formData.append('meetingDate', data.meetingDate)

        for (let i = 0; i < (data.images as File[]).length; i++) {
            formData.append('images', (data.images as File[])[i])
        }

        try {
            const response = await fetch('/api/breeder-meetings/upload', {
                method: 'POST',
                body: formData,
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || 'Wystąpił nieznany błąd.')
            }

            setSuccessMessage(result.message || 'Zdjęcia zostały pomyślnie przesłane.')
            reset()
        } catch (error: unknown) {
            setServerError(error instanceof Error ? error.message : 'Wystąpił nieznany błąd.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <UnifiedCard variant="glass" className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {serverError && <div className="text-red-400 p-3 bg-red-900/20 rounded-md">{serverError}</div>}
                {successMessage && <div className="text-green-400 p-3 bg-green-900/20 rounded-md">{successMessage}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-white/80 mb-2">Tytuł spotkania</label>
                        <input id="title" {...register('title')} className="input-field w-full" />
                        {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="breederName" className="block text-sm font-medium text-white/80 mb-2">Nazwa hodowcy</label>
                        <input id="breederName" {...register('breederName')} className="input-field w-full" />
                        {errors.breederName && <p className="text-red-400 text-sm mt-1">{errors.breederName.message}</p>}
                    </div>
                </div>

                <div>
                    <label htmlFor="images" className="block text-sm font-medium text-white/80 mb-2">Zdjęcia (max 10)</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                        <div className="text-center">
                            <Camera className="mx-auto h-12 w-12 text-white/60" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-white/60">
                                <label htmlFor="images" className="relative cursor-pointer rounded-md font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-cyan-400">
                                    <span>Prześlij pliki</span>
                                    <input id="images" type="file" {...register('images')} className="sr-only" multiple accept="image/*" />
                                </label>
                                <p className="pl-1">lub przeciągnij i upuść</p>
                            </div>
                            <p className="text-xs leading-5 text-white/50">PNG, JPG, WEBP do 5MB</p>
                        </div>
                    </div>
                    {errors.images && <p className="text-red-400 text-sm mt-1">{errors.images.message?.toString()}</p>}
                </div>

                <div className="flex justify-end">
                    <UnifiedButton type="submit" disabled={isSubmitting} variant="primary" intensity="high">
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileUp className="mr-2 h-4 w-4" />}
                        {isSubmitting ? 'Przesyłanie...' : 'Prześlij zdjęcia'}
                    </UnifiedButton>
                </div>
            </form>
        </UnifiedCard>
    )
}