'use client'

import SummaryCard from '../../components/summary-card'
import WorkingCapitalChart from '../../components/working-capital-chart'
import RecentTransactions from '../../components/recent-transactions'
import WalletCards from '../../components/wallet-cards'
import ScheduledTransfers from '../../components/scheduled-transfers'
import {
  useDashboardSummary,
  useWorkingCapital,
  useWallet,
  useRecentTransactions,
  useScheduledTransfers,
} from '../../hook/use-dashboard-data'
import { WalletAdd, WalletClose } from '@/packages/assets/icons'

export default function DashboardPage() {
  const { data: summaryData, isLoading: summaryLoading } = useDashboardSummary()
  const { data: capitalData, isLoading: capitalLoading } = useWorkingCapital()
  const { data: walletData, isLoading: walletLoading } = useWallet()
  const { data: transactionsData, isLoading: transactionsLoading } = useRecentTransactions()
  const { data: transfersData, isLoading: transfersLoading } = useScheduledTransfers()

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex-1 space-y-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <SummaryCard
            title="Total balance"
            data={summaryData?.totalBalance}
            icon={WalletClose}
            variant="balance"
            isLoading={summaryLoading}
          />
          <SummaryCard
            title="Total spending"
            data={summaryData?.totalExpense}
            icon={WalletClose}
            variant="default"
            isLoading={summaryLoading}
          />
          <SummaryCard
            title="Total saved"
            data={summaryData?.totalSavings}
            icon={WalletAdd}
            variant="default"
            isLoading={summaryLoading}
          />
        </div>

        <WorkingCapitalChart data={capitalData} isLoading={capitalLoading} />

        <RecentTransactions data={transactionsData} isLoading={transactionsLoading} />
      </div>

      <div className="w-full lg:w-[380px] space-y-6">
        <WalletCards data={walletData} isLoading={walletLoading} />
        <ScheduledTransfers data={transfersData} isLoading={transfersLoading} />
      </div>
    </div>
  )
}
