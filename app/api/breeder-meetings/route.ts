import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    // Sprawdź autoryzację
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Nieautoryzowany dostęp' },
        { status: 401 }
      );
    }

    // Sprawdź czy użytkownik ma zweryfikowany telefon
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { isPhoneVerified: true }
    });

    if (!user?.isPhoneVerified) {
      return NextResponse.json(
        { error: 'Weryfikacja numeru telefonu jest wymagana' },
        { status: 403 }
      );
    }

    // Parsuj formularz
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const location = formData.get('location') as string;
    const date = formData.get('date') as string;
    const images = formData.getAll('images') as File[];

    // Walidacja
    if (!title || !location || !date || images.length === 0) {
      return NextResponse.json(
        { error: 'Wszystkie wymagane pola muszą być wypełnione' },
        { status: 400 }
      );
    }

    // Walidacja zdjęć
    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    for (const image of images) {
      if (image.size > maxFileSize) {
        return NextResponse.json(
          { error: `Zdjęcie ${image.name} jest za duże. Maksymalny rozmiar to 5MB.` },
          { status: 400 }
        );
      }

      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json(
          { error: `Nieprawidłowy format zdjęcia ${image.name}. Dozwolone formaty: JPG, PNG, WebP.` },
          { status: 400 }
        );
      }
    }

    // Stwórz folder dla zdjęć
    const uploadDir = join(process.cwd(), 'public', 'meetings with breeders');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Zapisz zdjęcia
    const imagePaths: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const timestamp = Date.now();
      const fileName = `${timestamp}_${i}_${image.name}`;
      const filePath = join(uploadDir, fileName);

      const bytes = await image.arrayBuffer();
      await writeFile(filePath, Buffer.from(bytes));

      imagePaths.push(`/meetings with breeders/${fileName}`);
    }

    // Zapisz spotkanie do bazy danych
    const meeting = await prisma.breederMeeting.create({
      data: {
        title,
        description: description || '',
        location,
        date: new Date(date),
        images: JSON.stringify(imagePaths),
        userId: session.user.id
      }
    });

    return NextResponse.json({
      success: true,
      message: 'Spotkanie zostało dodane pomyślnie',
      meeting: {
        id: meeting.id,
        title: meeting.title,
        location: meeting.location,
        date: meeting.date,
        imagesCount: imagePaths.length
      }
    });

  } catch (error) {
    console.error('Błąd podczas dodawania spotkania:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas dodawania spotkania' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const meetings = await prisma.breederMeeting.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        description: true,
        location: true,
        date: true,
        images: true,
        createdAt: true,
        user: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      }
    });

    return NextResponse.json({ meetings });
  } catch (error) {
    console.error('Błąd podczas pobierania spotkań:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas pobierania spotkań' },
      { status: 500 }
    );
  }
}