export const COMMISSION_PERCENT = 0.5 as const

export const getCommissionValue = (price: number): number => {
  return (price * COMMISSION_PERCENT) / 100
}

export const getNetValue = (price: number) => price - getCommissionValue(price)

export default function formatAmount(amount: string): string {
  const num = parseFloat(amount)

  if (Number.isNaN(num)) return amount

  if (Number.isInteger(num)) return num.toString()

  return num
    .toString()
    .replace(/(\.\d*?[1-9])0+$/g, "$1")
    .replace(/\.0+$/, "")
}
