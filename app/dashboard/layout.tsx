import NavbarLayout from '@/packages/layout/navbar-layout'
import SidebarLayout from '@/packages/layout/sidebar-layout'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <SidebarLayout />
      <div className="flex flex-1 flex-col overflow-hidden pl-64">
        <div className="pt-[14px]">
          <NavbarLayout title="Dashboard" />
        </div>
        <main className="flex-1 overflow-y-auto px-6 pt-[29px]">{children}</main>
      </div>
    </div>
  )
}
