import { Transaction } from "@/types/transaction"

interface GroupedTransaction {
  date: string
  transactions: Transaction[]
}

const ruDateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
})

function formatDate(isoString: string): string {
  return ruDateFormatter.format(new Date(isoString)).toUpperCase()
}

export function groupTransactionsByDate(
  data: Transaction[]
): GroupedTransaction[] {
  if (!data.length) return []

  const map = new Map<string, Transaction[]>()

  // предварительно отсортировать
  const sorted = [...data].sort((a, b) => {
    const timeA = new Date(a.created_at ?? 0).getTime()
    const timeB = new Date(b.created_at ?? 0).getTime()
    return timeB - timeA
  })

  sorted.forEach(tx => {
    const date = tx.created_at ? formatDate(tx.created_at) : "ДАТА НЕ УКАЗАНА" // или "UNKNOWN"

    if (!map.has(date)) {
      map.set(date, [])
    }

    map.get(date)!.push(tx)
  })

  return Array.from(map.entries()).map(([date, transactions]) => ({
    date,
    transactions,
  }))
}
