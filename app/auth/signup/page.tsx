import { Metadata } from 'next'
import { SignUpPage } from '@/modules/auth/view/sign-up-page'

export const metadata: Metadata = {
  title: 'Sign Up - Maglo',
  description: 'Create a new Maglo account to start managing your finances.',
}

export default function SignupPage() {
  return <SignUpPage />
}
