'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { authApi } from '../api/auth'
import { handleApiError } from '@/core/api/client'

export const useRegister = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: response => {
      toast.success(response.message || 'Registration successful! Please login.')

      router.push('/auth/login')
    },
    onError: error => {
      handleApiError(error)
    },
  })
}
