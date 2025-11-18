import { apiClient } from '../client'
import {
    ApiResponse,
    FinancialSummary,
    WorkingCapital,
    Wallet,
    RecentTransactions,
    ScheduledTransfers,
} from '../types'

export const financialEndpoints = {
    getSummary: () =>
        apiClient.get<ApiResponse<FinancialSummary>>('/financial/summary'),

    getWorkingCapital: () =>
        apiClient.get<ApiResponse<WorkingCapital>>('/financial/working-capital'),

    getWallet: () =>
        apiClient.get<ApiResponse<Wallet>>('/financial/wallet'),

    getRecentTransactions: () =>
        apiClient.get<ApiResponse<RecentTransactions>>('/financial/transactions/recent'),

    getScheduledTransfers: () =>
        apiClient.get<ApiResponse<ScheduledTransfers>>('/financial/transfers/scheduled'),
}