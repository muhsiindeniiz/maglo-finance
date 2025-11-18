import NavbarLayout from '@/packages/layout/navbar-layout'
import SidebarLayout from '@/packages/layout/sidebar-layout'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <SidebarLayout />
      <div className="flex flex-1 flex-col overflow-hidden lg:pl-64">
        <NavbarLayout title="Dashboard" />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
