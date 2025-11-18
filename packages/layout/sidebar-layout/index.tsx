'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/packages/util'
import { useAuthStore } from '@/packages/hook/use-auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { X, Menu } from 'lucide-react'

import {
  Help,
  Home,
  Invoices,
  Logout,
  Settings,
  Transaction,
  WalletsOpen,
} from '@/packages/assets/icons'
import { Logo } from '@/packages/components/logo'

const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
  },
  {
    label: 'Transactions',
    href: '/transactions',
    icon: Transaction,
  },
  {
    label: 'Invoices',
    href: '/invoices',
    icon: Invoices,
  },
  {
    label: 'My Wallets',
    href: '/wallets',
    icon: WalletsOpen,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export default function SidebarLayout() {
  const pathname = usePathname()
  const router = useRouter()
  const { clearAuth } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const handleLogout = () => {
    clearAuth()
    toast.success('Logged out successfully')
    router.push('/auth/login')
  }

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FAFAFA] lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6 text-[#1B212D]" />
      </button>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-screen w-64 bg-[#FAFAFA] transition-transform duration-300 ease-in-out',
          'lg:translate-x-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col pt-[14px]">
          <div className="flex h-16 items-center justify-between px-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-200 lg:hidden"
              aria-label="Close menu"
            >
              <X className="h-5 w-5 text-[#1B212D]" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {menuItems.map(item => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center rounded-lg px-[15px] py-[14px] text-sm font-semibold transition-colors',
                    'gap-3',
                    isActive
                      ? 'bg-[#C8EE44] text-[#1B212D]'
                      : 'text-[#929EAE] hover:bg-[#C8EE44] hover:text-[#1B212D]'
                  )}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                  <span className="text-sm font-semibold">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="space-y-1 p-4">
            <Link
              href="/help"
              className="flex items-center gap-3 rounded-lg px-[15px] py-[14px] text-sm font-semibold text-[#929EAE] transition-colors hover:bg-[#C8EE44] hover:text-[#1B212D]"
            >
              <Help className="h-5 w-5" strokeWidth={2} />
              <span>Help</span>
            </Link>

            <button
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-[15px] py-[14px] text-sm font-semibold text-[#929EAE] transition-colors hover:bg-[#C8EE44] hover:text-[#1B212D]"
            >
              <Logout className="h-5 w-5" strokeWidth={2} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
