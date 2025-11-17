export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string => {
  let currencyCode = currency.toUpperCase().trim()
  
  const symbolToCurrency: Record<string, string> = {
    '$': 'USD',
    '€': 'EUR',
    '£': 'GBP',
    '¥': 'JPY',
    '₺': 'TRY',
    '₹': 'INR',
    '₽': 'RUB',
    'C$': 'CAD',
    'A$': 'AUD',
  }

  if (symbolToCurrency[currency]) {
    currencyCode = symbolToCurrency[currency]
  }

  if (currencyCode.length !== 3) {
    console.warn(`Invalid currency code: ${currency}, defaulting to USD`)
    currencyCode = 'USD'
  }

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  } catch (error) {
    console.error(`Error formatting currency: ${error}`)
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }
}

export const formatDate = (
  date: string | Date,
  format: 'short' | 'long' | 'relative' = 'short',
  locale: string = 'en-US'
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date provided to formatDate')
    return 'Invalid date'
  }

  if (format === 'relative') {
    const now = new Date()
    const diffInMs = now.getTime() - dateObj.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) return 'Today'
    if (diffInDays === 1) return 'Yesterday'
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
    return `${Math.floor(diffInDays / 365)} years ago`
  }

  if (format === 'long') {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(dateObj)
  }

  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(dateObj)
}

export const formatCardNumber = (cardNumber: string): string => {
  if (!cardNumber) return ''
  const cleaned = cardNumber.replace(/\D/g, '')
  return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export const maskCardNumber = (cardNumber: string): string => {
  if (!cardNumber) return ''
  const cleaned = cardNumber.replace(/\D/g, '')
  const lastFour = cleaned.slice(-4)
  return `**** **** **** ${lastFour}`
}

export const getCurrencySymbol = (currencyCode: string, locale: string = 'en-US'): string => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(0)
      .replace(/\d/g, '')
      .trim()
  } catch (error) {
    return currencyCode
  }
}