import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const meetings = await prisma.breederMeeting.findMany({
      where: {
        isApproved: true
      },
      include: {
        uploader: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Przekształć dane
    const meetingsWithImages = meetings.map((meeting: any) => ({
      ...meeting,
      images: JSON.parse(meeting.images),
      uploaderName: `${meeting.uploader.firstName || ''} ${meeting.uploader.lastName || ''}`.trim() || meeting.uploader.email
    }))

    return NextResponse.json(meetingsWithImages)

  } catch (error) {
    console.error('Błąd podczas pobierania spotkań:', error)
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania spotkań' },
      { status: 500 }
    )
  }
}
