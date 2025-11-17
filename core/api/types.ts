export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
}

export interface ApiErrorResponse {
  success: false
  error: string
  message: string
  code?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export interface FinancialAmount {
  amount: number
  currency: string
  change?: {
    percentage: number
    amount: number
    trend: 'up' | 'down'
  }
}

export interface FinancialSummary {
  totalBalance: FinancialAmount
  totalExpense: FinancialAmount
  totalSavings: FinancialAmount
  lastUpdated: string
}

export interface WorkingCapitalDataPoint {
  date: string
  income: number
  expenses: number
}

export interface WorkingCapital {
  period: string
  currency: string
  data: WorkingCapitalDataPoint[]
  summary: {
    totalIncome: number
    totalExpenses: number
    netChange: number
  }
}

export interface Card {
  id: string
  type: 'debit' | 'credit'
  bankName: string
  cardNumber: string
  expiryDate: string
  cardHolder: string
  balance?: number
  currency: string
  brand: 'visa' | 'mastercard'
}

export interface Wallet {
  cards: Card[]
}

export interface Transaction {
  id: string
  name: string
  business: string
  type: string
  amount: number
  currency: string
  date: string
  icon?: string
}

export interface RecentTransactions {
  transactions: Transaction[]
  summary: {
    totalAmount: number
    count: number
  }
}

export interface ScheduledTransfer {
  id: string
  recipientName: string
  recipientAvatar?: string
  amount: number
  currency: string
  scheduledDate: string
}

export interface ScheduledTransfers {
  transfers: ScheduledTransfer[]
  summary: {
    totalAmount: number
    count: number
  }
}

export interface RegisterInput {
  fullName: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}

export interface UserResponse {
  id: string
  fullName: string
  email: string
  role: string
  isActive: boolean
  lastLoginAt?: string
  lastLoginIP?: string
  createdAt: string
  updatedAt: string
}

export interface RegisterResponse {
  id: string
  fullName: string
  email: string
}

export interface LoginResponse {
  user: UserResponse
  accessToken: string
}
