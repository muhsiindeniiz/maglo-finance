import { Metadata } from 'next'
import { SignInPage } from '@/modules/auth/view/sign-in-page'

export const metadata: Metadata = {
  title: 'Sign In - Maglo',
  description: 'Sign in to your Maglo account to access your financial dashboard.',
}

export default function LoginPage() {
  return <SignInPage />
}
