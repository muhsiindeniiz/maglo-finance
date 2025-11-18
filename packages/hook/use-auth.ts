'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { UserResponse } from '@/core/api/types'

interface AuthState {
  user: UserResponse | null
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean
  setAuth: (user: UserResponse, accessToken: string, refreshToken: string) => void
  clearAuth: () => void
  hydrated: boolean
  setHydrated: () => void
}

const customStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(name)
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === 'undefined') return

    localStorage.setItem(name, value)

    try {
      const parsedValue = JSON.parse(value)
      const state = parsedValue?.state

      if (state) {
        document.cookie = `auth-storage=${encodeURIComponent(value)}; path=/; max-age=2592000; SameSite=Lax; Secure`

        if (state.accessToken) {
          document.cookie = `accessToken=${encodeURIComponent(state.accessToken)}; path=/; max-age=2592000; SameSite=Lax; Secure`
        }

        if (state.refreshToken) {
          document.cookie = `refreshToken=${encodeURIComponent(state.refreshToken)}; path=/; max-age=2592000; SameSite=Lax; Secure`
        }
      }
    } catch (error) {
      console.error('Error parsing auth state for cookies:', error)
    }
  },
  removeItem: (name: string): void => {
    if (typeof window === 'undefined') return

    localStorage.removeItem(name)

    const cookiesToRemove = ['auth-storage', 'accessToken', 'refreshToken']
    cookiesToRemove.forEach(cookieName => {
      document.cookie = `${cookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`
    })
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      hydrated: false,

      setHydrated: () => {
        set({ hydrated: true })
      },

      setAuth: (user, accessToken, refreshToken) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', accessToken)
          if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken)
          }
        }

        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        })
      },

      clearAuth: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => customStorage),
      onRehydrateStorage: () => state => {
        state?.setHydrated()
      },
    }
  )
)
