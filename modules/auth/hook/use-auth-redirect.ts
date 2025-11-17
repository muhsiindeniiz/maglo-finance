'use client'

import { useAuthStore } from '@/packages/hook/use-auth'

export const useAuthRedirect = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  return { isAuthenticated }
}
