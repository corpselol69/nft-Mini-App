export const COMMISSION_PERCENT = 0.5 as const

export const getCommissionValue = (price: number): number => {
  return (price * COMMISSION_PERCENT) / 100
}

export const getNetValue = (price: number) => {
  const net = price - getCommissionValue(price)
  return Math.round(net * 1e4) / 1e4
}

export default function formatAmount(amount: string): string {
  const num = parseFloat(amount)

  if (Number.isNaN(num)) return amount

  // округляем до 2 знаков
  const fixed = Math.round(num * 100) / 100

  if (Number.isInteger(fixed)) return fixed.toString()

  return fixed
    .toString()
    .replace(/(\.\d*?[1-9])0+$/g, "$1")
    .replace(/\.0+$/, "")
}
