'use client'

import { ReactNode } from 'react'
import { cn } from '@/packages/util/cn'
import SidebarLayout from '../sidebar-layout'
import NavbarLayout from '../navbar-layout'

interface AppLayoutProps {
  children: ReactNode
  className?: string
}

export const AppLayout = ({ children, className }: AppLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarLayout />
      <div className="flex flex-1 flex-col overflow-hidden">
        <NavbarLayout title="" />
        <main className={cn('flex-1 overflow-y-auto bg-gray-50 p-6', className)}>{children}</main>
      </div>
    </div>
  )
}
