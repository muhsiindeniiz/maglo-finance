'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/packages/util'
import { useAuthStore } from '@/packages/hook/use-auth'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Help, Home, Invoices, Logout, Settings, Transaction, WalletsOpen } from '@/packages/assets/icons'
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

  const handleLogout = () => {
    clearAuth()
    toast.success('Logged out successfully')
    router.push('/auth/login')
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-[#FAFAFA]">
      <div className="flex h-full flex-col pt-[14px]">
        <div className="flex h-16 items-center px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
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
            className="flex cursor-pointer w-full items-center gap-3 rounded-lg px-[15px] py-[14px] text-sm font-semibold text-[#929EAE] transition-colors hover:bg-[#C8EE44] hover:text-[#1B212D]"
          >
            <Logout className="h-5 w-5" strokeWidth={2} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  )
}