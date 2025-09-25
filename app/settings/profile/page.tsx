import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PhoneVerification } from '@/components/auth/PhoneVerification'

export default async function ProfileSettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { phoneNumber: true, isPhoneVerified: true }
  })

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Ustawienia profilu</h1>
      <div className="space-y-6">
        <PhoneVerification
          user={{
            phoneNumber: user?.phoneNumber ?? null,
            isPhoneVerified: user?.isPhoneVerified ?? false
          }}
        />
      </div>
    </div>
  )
}


