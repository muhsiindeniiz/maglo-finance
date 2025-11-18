'use client'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/core/ui/components/button'
import { cn } from '@/packages/util/cn'
import { LoginInput } from '../../types/auth'
import { loginSchema } from '../../utils/validation'
import { useLogin } from '../../hook/use-login'
import { useAuthRedirect } from '../../hook/use-auth-redirect'
import { AuthInput } from '../../components/auth-input'
import { PasswordInput } from '../../components/password-input'
import { signInPageVariants, type SignInPageVariants } from './sign-in-page.cva'
import { SignInPageProps } from './sign-in-page.type'
import { Logo } from '@/packages/components/logo'
import Image from 'next/image'
import AuthBanner from '../../assets/banner/auth-banner.png'
import { GoogleButton } from '../../components/google-button'

export const SignInPage = ({ className }: SignInPageProps & SignInPageVariants) => {
  const loginMutation = useLogin()
  const { isAuthenticated } = useAuthRedirect()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const onSubmit = (data: LoginInput) => {
    loginMutation.mutate(data)
  }

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked')
  }

  if (isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#C8EE44]" />
      </div>
    )
  }

  return (
    <div className={cn(signInPageVariants({ layout: 'default' }), className)}>
      <div className="flex w-full flex-col lg:w-1/2 relative min-h-screen">
        <div className="w-full flex justify-center px-8 pt-10 pb-4 lg:pb-0">
          <div className="w-full max-w-[404px] relative">
            <Logo className="absolute top-0 left-0" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 py-8">
          <div className="w-full max-w-[404px] space-y-8">
            <div className="space-y-2">
              <h1 className="text-[30px] font-semibold text-[#1B212D] mb-2">Sign In</h1>
              <p className="text-[16px] font-normal text-[#78778B] mb-[35px]">
                Welcome back! Please enter your details
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-0 mb-0 mt-[25px]">
              <div className="mb-[15px]">
                <AuthInput
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="example@gmail.com"
                  error={errors.email?.message || ''}
                  disabled={loginMutation.isPending}
                  {...register('email')}
                />
              </div>

              <div className="mb-[25px]">
                <PasswordInput
                  id="password"
                  label="Password"
                  placeholder="••••••••"
                  error={errors.password?.message || ''}
                  disabled={loginMutation.isPending}
                  {...register('password')}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 rounded-[10px] bg-[#C8EE44] text-[#1B212D] text-[16px] font-semibold hover:bg-[#B5E625] transition-all mb-[15px] shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button>

              <GoogleButton onClick={handleGoogleSignIn} disabled={loginMutation.isPending} />
            </form>

            <div className="text-center flex items-center justify-center gap-1 text-[14px] font-normal text-[#929EAE] mt-6">
              Don't have an account?{' '}
              <div className="w-max relative inline-block">
                <Link
                  href="/auth/signup"
                  className="text-[#1B212D] text-[14px] font-semibold hover:underline underline-offset-4 transition-colors"
                >
                  Sign up
                </Link>
                <svg
                  className="absolute left-0 -bottom-2 w-full"
                  width="45"
                  height="8"
                  viewBox="0 0 45 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0.901001 6.5C7.47045 1.56444 34.4948 -1.70074 43.901 6.49999"
                    stroke="#C8EE44"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          alt="Authentication banner"
          src={AuthBanner.src}
          className="w-full h-screen object-cover"
          width={1000}
          height={1000}
          priority
        />
      </div>
    </div>
  )
}
