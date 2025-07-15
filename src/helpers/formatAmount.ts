export default function formatAmount(amount: string): string {
  const num = parseFloat(amount)

  if (Number.isNaN(num)) return amount

  if (Number.isInteger(num)) return num.toString()

  return num
    .toString()
    .replace(/(\.\d*?[1-9])0+$/g, "$1")
    .replace(/\.0+$/, "")
}
