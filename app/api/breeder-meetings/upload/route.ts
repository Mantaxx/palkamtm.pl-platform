import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Nieautoryzowany dostęp' }, { status: 401 })
    }

    const formData = await request.formData()
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const meetingDate = formData.get('meetingDate') as string
    const breederName = formData.get('breederName') as string
    const files = formData.getAll('images') as File[]

    if (!title || !breederName || files.length === 0) {
      return NextResponse.json({ error: 'Brakuje wymaganych pól' }, { status: 400 })
    }

    // Utwórz folder dla spotkania
    const meetingId = `meeting-${Date.now()}`
    const meetingFolder = join(process.cwd(), 'public', 'breeder-meetings', breederName.replace(/\s+/g, '-').toLowerCase())
    
    try {
      await mkdir(meetingFolder, { recursive: true })
    } catch (error) {
      // Folder może już istnieć
    }

    // Zapisz zdjęcia
    const imagePaths: string[] = []
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      
      const fileName = `${meetingId}-${i + 1}.${file.name.split('.').pop()}`
      const filePath = join(meetingFolder, fileName)
      
      await writeFile(filePath, buffer)
      imagePaths.push(`/breeder-meetings/${breederName.replace(/\s+/g, '-').toLowerCase()}/${fileName}`)
    }

    // Zapisz do bazy danych
    const breederMeeting = await prisma.breederMeeting.create({
      data: {
        title,
        description: description || null,
        location: location || null,
        meetingDate: meetingDate ? new Date(meetingDate) : null,
        breederName,
        images: JSON.stringify(imagePaths),
        uploadedBy: session.user.id,
        isApproved: false, // Wymaga zatwierdzenia
      },
    })

    return NextResponse.json({
      success: true,
      meeting: breederMeeting,
      message: 'Zdjęcia zostały przesłane i oczekują na zatwierdzenie'
    })

  } catch (error) {
    console.error('Błąd podczas uploadu:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas przesyłania zdjęć' },
      { status: 500 }
    )
  }
}
