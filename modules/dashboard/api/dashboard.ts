import { financialEndpoints } from '@/core/api/endpoints/financial'

export const dashboardApi = {
    getSummary: financialEndpoints.getSummary,
    getWorkingCapital: financialEndpoints.getWorkingCapital,
    getWallet: financialEndpoints.getWallet,
    getRecentTransactions: financialEndpoints.getRecentTransactions,
    getScheduledTransfers: financialEndpoints.getScheduledTransfers,
}