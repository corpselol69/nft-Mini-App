import { FC, useEffect, useRef } from "react"
import { TransactionHistoryProps } from "./index"
import styles from "./TransactionsBlock.module.scss"
import { TransactionDateGroup } from "../TransactionDateGroup/TransactionDateGroup"
import { useLazyGetMyTransactionsQuery } from "@/api/endpoints/transactions"
import { groupTransactionsByDate } from "@/helpers/groupTransactionsByDate"

export const TransactionBlock: FC<TransactionHistoryProps> = ({
  onTransactionClick,
}) => {
  const didFetch = useRef(false)

  const [fetchTransactions, { data, isLoading }] =
    useLazyGetMyTransactionsQuery()

  useEffect(() => {
    if (didFetch.current) return
    didFetch.current = true
    fetchTransactions()
  }, [fetchTransactions])

  if (isLoading) {
    return <div className={styles.content}>загружаем историю транзакций...</div>
  }

  if (!data || data?.length === 0) {
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

  const groupedTransactions = groupTransactionsByDate(data || [])

  return (
    <div className={styles.content}>
      {groupedTransactions.map((group, idx) => (
        <TransactionDateGroup
          key={group.date}
          group={group}
          onTransactionClick={onTransactionClick}
          isLastGroup={idx === groupedTransactions.length - 1}
        />
      ))}
    </div>
  )
}
