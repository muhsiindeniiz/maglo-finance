'use client'

import { Button } from '@/core/ui/components/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/core/ui/components/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  }

  const handleLogout = () => {
    clearAuth()
    toast.success('Logged out successfully')
    router.push('/auth/login')
  }

  return (
    <header className="sticky top-0 z-30 flex py-[1px] items-center justify-between bg-background px-6">
      <h1 className="text-[25px] font-semibold text-[#1B212D]">{title}</h1>

      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="h-10 w-10">
          <Search className="h-12 w-12 text-[#929EAE]" strokeWidth={2} />
        </Button>

        <div className="w-[45px]" />

        <Button variant="ghost" size="icon" className="relative h-10 w-10">
          <Notification className="h-6 w-6 text-[#929EAE]" strokeWidth={2} />
        </Button>

        <div className="w-[45px]" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-full bg-[#FAFAFA] pl-[7px] py-[6px] pr-[15px] transition-colors hover:bg-[#F0F0F0]">
              <Avatar className="h-9 w-9">
                <AvatarImage src={undefined} className="object-cover" />
                <AvatarFallback className="bg-[#C8EE44] text-[14px] font-semibold text-[#1B212D]">
                  {user?.fullName ? getInitials(user.fullName) : 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold text-[#1B212D]">
                {user?.fullName || 'User'}
              </span>
              <div className="w-7" />
              <ChevronDown className="h-2.5 w-2.5 text-[#1B212D]" strokeWidth={2} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
