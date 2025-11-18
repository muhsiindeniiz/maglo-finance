export const formatCurrency = (
  amount: number,
  currency: string = 'USD',
  locale?: string
): string => {
  let currencyCode = currency.toUpperCase().trim()

  const symbolToCurrency: Record<string, string> = {
    $: 'USD',
    '€': 'EUR',
    '£': 'GBP',
    '¥': 'JPY',
    '₺': 'TRY',
    '₹': 'INR',
    '₽': 'RUB',
    C$: 'CAD',
    A$: 'AUD',
  }

  const currencyToLocale: Record<string, string> = {
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    JPY: 'ja-JP',
    TRY: 'tr-TR',
    INR: 'en-IN',
    RUB: 'ru-RU',
    CAD: 'en-CA',
    AUD: 'en-AU',
  }

  if (symbolToCurrency[currency]) {
    currencyCode = symbolToCurrency[currency]
  }

  if (currencyCode.length !== 3) {
    console.warn(`Invalid currency code: ${currency}, defaulting to USD`)
    currencyCode = 'USD'
  }

  const finalLocale = locale || currencyToLocale[currencyCode] || 'en-US'

  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount

  if (isNaN(numericAmount)) {
    console.error(`Invalid amount: ${amount}`)
    return '$0.00'
  }

  try {
    return new Intl.NumberFormat(finalLocale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericAmount)
  } catch (_error) {
    console.error('Error formatting currency')
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericAmount)
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
    if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7)
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`
    }
    if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30)
      return months === 1 ? '1 month ago' : `${months} months ago`
    }
    const years = Math.floor(diffInDays / 365)
    return years === 1 ? '1 year ago' : `${years} years ago`
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
  return cleaned.replace(/(\d{4})(?=\d)/g, '$1  ')
}

export const maskCardNumber = (cardNumber: string): string => {
  if (!cardNumber) return ''
  const cleaned = cardNumber.replace(/\D/g, '')

  if (cleaned.length < 8) return cleaned

  const firstEight = cleaned.slice(0, 8)
  return `${firstEight}****`
}

export const getCurrencySymbol = (currencyCode: string, locale?: string): string => {
  const currencyToLocale: Record<string, string> = {
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    JPY: 'ja-JP',
    TRY: 'tr-TR',
    INR: 'en-IN',
    RUB: 'ru-RU',
    CAD: 'en-CA',
    AUD: 'en-AU',
  }

  const finalLocale = locale || currencyToLocale[currencyCode.toUpperCase()] || 'en-US'

  try {
    return new Intl.NumberFormat(finalLocale, {
      style: 'currency',
      currency: currencyCode.toUpperCase(),
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(0)
      .replace(/\d/g, '')
      .trim()
  } catch (_error) {
    return currencyCode
  }
}
