export function exchangeHelper(amount: number, exchangeRate: number) {
  return Math.round(amount * exchangeRate)
}

export const exchangeRates = {
  USD: 120,
  EUR: 131,
  ZL: 21
}
