import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { PhoneVerification } from '@/components/auth/PhoneVerification'
import ProfileForm from '@/components/profile/ProfileForm'

export default async function ProfileSettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id) {
    redirect('/auth/signin')
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { 
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      address: true,
      city: true,
      postalCode: true,
      phoneNumber: true, 
      isPhoneVerified: true,
      isActive: true
    }
  })

  if (!user) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ustawienia profilu</h1>
          <p className="text-gray-600">
            Uzupełnij swoje dane aby móc uczestniczyć w aukcjach
          </p>
        </div>

        <div className="space-y-8">
          {/* Formularz profilu */}
          <ProfileForm initialUser={user} />

          {/* Weryfikacja telefonu */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weryfikacja telefonu</h3>
            <PhoneVerification
              user={{
                phoneNumber: user?.phoneNumber ?? null,
                isPhoneVerified: user?.isPhoneVerified ?? false
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}


