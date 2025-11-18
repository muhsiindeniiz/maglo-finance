import { Metadata } from 'next'
import DashboardPage from '@/modules/dashboard/view/dashboard-page'

export const metadata: Metadata = {
  title: 'Dashboard - Maglo',
  description: 'View your financial overview, transactions, and wallet information.',
}

export default function Page() {
  return <DashboardPage />
}
