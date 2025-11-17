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

export interface FinancialAmount {
  amount: number
  currency: string
  change?: {
    percentage: number
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
  month: string
  income: number
  expense: number
  net: number
}

export interface WorkingCapital {
  period: string
  currency: string
  data: WorkingCapitalDataPoint[]
  summary: {
    totalIncome: number
    totalExpense: number
    netBalance: number
  }
}

export interface Card {
  id: string
  name: string
  type: 'debit' | 'credit'
  cardNumber: string
  bank: string
  network: string
  brand?: 'visa' | 'mastercard' | 'amex'
  expiryMonth: number
  expiryYear: number
  expiryDate?: string
  color: string
  isDefault: boolean
}

export interface Wallet {
  cards: Card[]
}

export interface Transaction {
  id: string
  name: string
  business: string
  image: string
  icon?: string
  type: string
  amount: number
  currency: string
  date: string
  status: string
}

export interface RecentTransactions {
  transactions: Transaction[]
  summary: {
    totalIncome: number
    totalExpense: number
    count: number
  }
}

export interface ScheduledTransfer {
  id: string
  name: string
  recipientName?: string
  image: string
  recipientAvatar?: string
  date: string
  scheduledDate?: string
  amount: number
  currency: string
  status: string
}

export interface ScheduledTransfers {
  transfers: ScheduledTransfer[]
  summary: {
    totalScheduledAmount: number
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