import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendVerificationSms } from '@/lib/phone-verification';
import crypto from 'crypto';

// Function to generate a random 6-digit code
function generateVerificationCode() {
  return crypto.randomInt(100000, 1000000).toString();
}

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Nieautoryzowany dostęp' }, { status: 401 });
  }

  try {
    // 1. Get user's phone number from DB
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { phoneNumber: true },
    });

    if (!user?.phoneNumber) {
      return NextResponse.json({ error: 'Brak numeru telefonu w profilu.' }, { status: 400 });
    }

    // 2. Generate a verification code and expiration date
    const code = generateVerificationCode();
    const expires = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 minutes from now

    // 3. Save the code and expiration date to the user's record
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        phoneVerificationCode: code,
        phoneVerificationExpires: expires,
      },
    });

    // 4. Send the SMS via Twilio
    const smsResult = await sendVerificationSms(user.phoneNumber, code);

    if (!smsResult.success) {
      // If SMS fails, don't expose the internal error to the client
      return NextResponse.json({ error: 'Nie udało się wysłać SMS-a weryfikacyjnego.' }, { status: 500 });
    }

    // 5. Return a success response
    return NextResponse.json({ success: true, message: 'Kod weryfikacyjny został wysłany.' });

  } catch (error) {
    console.error('Error in send-verification endpoint:', error);
    return NextResponse.json({ error: 'Wystąpił wewnętrzny błąd serwera.' }, { status: 500 });
  }
}
