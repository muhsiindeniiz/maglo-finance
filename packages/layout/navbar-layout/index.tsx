'use client'

import { Button } from '@/core/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/core/ui/components/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/core/ui/components/dropdown-menu'
import { useAuthStore } from '@/packages/hook/use-auth'
import { ChevronDown, Notification, Search } from '@/packages/assets/icons'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface NavbarLayoutProps {
  title: string
}

export default function NavbarLayout({ title }: NavbarLayoutProps) {
  const { user, clearAuth } = useAuthStore()
  const router = useRouter()

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = () => {
    clearAuth()
    toast.success('Logged out successfully')
    router.push('/auth/login')
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-background px-4 py-3 sm:px-6 sm:py-4">
      <h1 className="ml-12 text-base font-semibold text-[#1B212D] sm:text-xl md:text-[25px] lg:ml-0">
        {title}
      </h1>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button variant="ghost" size="icon" className="hidden h-10 w-10 sm:flex">
          <Search className="h-5 w-5 text-[#929EAE] lg:h-6 lg:w-6" strokeWidth={2} />
        </Button>

        <div className="hidden w-4 sm:block lg:w-[45px]" />

        <Button variant="ghost" size="icon" className="relative h-10 w-10">
          <Notification className="h-5 w-5 text-[#929EAE] sm:h-6 sm:w-6" strokeWidth={2} />
        </Button>

        <div className="w-2 sm:w-4 lg:w-[45px]" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-full bg-[#FAFAFA] py-[6px] pl-[7px] pr-[10px] transition-colors hover:bg-[#F0F0F0] focus:outline-none focus:ring-2 focus:ring-[#C8EE44] focus:ring-offset-2 sm:gap-3 sm:pr-[15px]">
              <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                <AvatarImage src={undefined} className="object-cover" />
                <AvatarFallback className="bg-[#C8EE44] text-xs font-semibold text-[#1B212D] sm:text-[14px]">
                  {user?.fullName ? getInitials(user.fullName) : 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="hidden max-w-[100px] truncate text-sm font-semibold text-[#1B212D] sm:inline md:max-w-[150px]">
                {user?.fullName || 'User'}
              </span>
              <div className="hidden w-4 sm:block lg:w-7" />
              <ChevronDown className="h-2.5 w-2.5 text-[#1B212D]" strokeWidth={2} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="truncate text-sm font-semibold">{user?.fullName || 'User'}</p>
              <p className="truncate text-xs text-gray-500">{user?.email || ''}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push('/dashboard')} className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
