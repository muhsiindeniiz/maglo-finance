'use client'

import { Search, Bell } from 'lucide-react'
import { useAuthStore } from '@/packages/hook/use-auth'
import { Input } from '@/core/ui/components/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/core/ui/components/avatar'

export const NavbarLayout = () => {
  const { user } = useAuthStore()

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input type="search" placeholder="Search..." className="pl-9 bg-gray-50 border-none" />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-full p-2 hover:bg-gray-100">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/avatar-placeholder.png" alt={user?.fullName} />
            <AvatarFallback>{user?.fullName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium">{user?.fullName || 'User'}</div>
            <div className="text-gray-500">{user?.email || 'user@example.com'}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
