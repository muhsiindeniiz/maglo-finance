import { apiClient } from '../client'
import {
  FinancialSummary,
  WorkingCapital,
  Wallet,
  RecentTransactions,
  ScheduledTransfers,
} from '../types'

export const financialApi = {
  getSummary: () => apiClient.get<FinancialSummary>('/financial/summary'),

  getWorkingCapital: () => apiClient.get<WorkingCapital>('/financial/working-capital'),

  getWallet: () => apiClient.get<Wallet>('/financial/wallet'),

  getRecentTransactions: () => apiClient.get<RecentTransactions>('/financial/transactions/recent'),

  getScheduledTransfers: () => apiClient.get<ScheduledTransfers>('/financial/transfers/scheduled'),
}
