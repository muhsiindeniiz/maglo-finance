'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authApi } from '../api/auth'
import { useAuthStore } from '@/packages/hook/use-auth'
import { handleApiError } from '@/core/api/client'

export const useLogin = () => {
  const router = useRouter()
  const setAuth = useAuthStore(state => state.setAuth)

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: response => {
      const { user, accessToken } = response.data

      setAuth(user, accessToken, '')

      toast.success(response.message || 'Login successful!')

      router.push('/dashboard')
    },
    onError: error => {
      handleApiError(error)
    },
  })
}
