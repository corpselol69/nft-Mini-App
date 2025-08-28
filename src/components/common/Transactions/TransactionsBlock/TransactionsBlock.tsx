import { FC, useEffect, useRef } from "react"
import { TransactionHistoryProps } from "./index"
import styles from "./TransactionsBlock.module.scss"
import { TransactionDateGroup } from "../TransactionDateGroup/TransactionDateGroup"
import { useActivityQuery } from "@/api/endpoints/finance"
import { ActivityItem } from "@/types/finance"

const groupActivitiesByDate = (items: ActivityItem[]) => {
  const byDate = new Map<string, ActivityItem[]>()

  for (const it of items) {
    const date = new Date(it.time)
    // ключ — YYYY-MM-DD (локальное)
    const key = date.toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    if (!byDate.has(key)) byDate.set(key, [])
    byDate.get(key)!.push(it)
  }

  // отсортируем группы по дате (свежие сверху), а внутри — по времени
  const groups = Array.from(byDate.entries())
    .map(([date, groupItems]) => ({
      date,
      items: groupItems.sort(
        (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
      ),
    }))
    .sort((a, b) => {
      const [da, db] = [a.items[0], b.items[0]]
      return new Date(db.time).getTime() - new Date(da.time).getTime()
    })

  return groups
}

export const TransactionBlock: FC<TransactionHistoryProps> = (
  {
    // onTransactionClick,
  }
) => {
  const didFetch = useRef(false)

  const { data, isLoading, refetch } = useActivityQuery(
    {},
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      // pollingInterval: 10_000,
    }
  )

  useEffect(() => {
    if (didFetch.current) return
    didFetch.current = true
    refetch()
  }, [refetch])

  if (isLoading) {
    return <div className={styles.content}>загружаем историю транзакций...</div>
  }

  const items = data?.items ?? []

  if (!data || items.length === 0) {
    return (
      <div className={styles.content}>
        <span className={styles.label}>
          Совершите свою первую
          <br />
          транзакцию
        </span>
      </div>
    )
  }

  const grouped = groupActivitiesByDate(items)
  console.log("grouped", grouped)
  return (
    <div className={styles.content}>
      {grouped.map((group, idx) => (
        <TransactionDateGroup
          key={idx}
          group={group}
          // onTransactionClick={onTransactionClick}
          isLastGroup={idx === grouped.length - 1}
        />
      ))}
    </div>
  )
}
