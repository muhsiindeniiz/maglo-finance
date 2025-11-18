import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../api/dashboard'

const normalizeCurrency = (currency: string): string => {
    const symbolToCurrency: Record<string, string> = {
        '$': 'USD',
        '€': 'EUR',
        '£': 'GBP',
        '¥': 'JPY',
        '₺': 'TRY',
        '₹': 'INR',
        '₽': 'RUB',
    }
    return symbolToCurrency[currency] || currency.toUpperCase()
}

export const useDashboardSummary = () => {
    return useQuery({
        queryKey: ['dashboard', 'summary'],
        queryFn: async () => {
            const response = await dashboardApi.getSummary()
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}

export const useWorkingCapital = () => {
    return useQuery({
        queryKey: ['dashboard', 'working-capital'],
        queryFn: async () => {
            const response = await dashboardApi.getWorkingCapital()
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}

export const useWallet = () => {
    return useQuery({
        queryKey: ['dashboard', 'wallet'],
        queryFn: async () => {
            const response = await dashboardApi.getWallet()
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}

export const useRecentTransactions = () => {
    return useQuery({
        queryKey: ['dashboard', 'recent-transactions'],
        queryFn: async () => {
            const response = await dashboardApi.getRecentTransactions()
            const data = response.data
            if (data?.transactions) {
                data.transactions = data.transactions.map(transaction => ({
                    ...transaction,
                    currency: normalizeCurrency(transaction.currency)
                }))
            }
            return data
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}

export const useScheduledTransfers = () => {
    return useQuery({
        queryKey: ['dashboard', 'scheduled-transfers'],
        queryFn: async () => {
            const response = await dashboardApi.getScheduledTransfers()
            const data = response.data
            if (data?.transfers) {
                data.transfers = data.transfers.map(transfer => ({
                    ...transfer,
                    currency: normalizeCurrency(transfer.currency)
                }))
            }
            return data
        },
        staleTime: 1000 * 60 * 5,
        retry: 1,
    })
}