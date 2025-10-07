import FirebaseAuthForm from '@/components/auth/FirebaseAuthForm'
import { UnifiedLayout } from '@/components/layout/UnifiedLayout'

export default function SignInPage() {
  return (
    <UnifiedLayout>
      <FirebaseAuthForm />
    </UnifiedLayout>
  )
}