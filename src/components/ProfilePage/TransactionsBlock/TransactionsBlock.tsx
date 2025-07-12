import { FC } from "react"
import { TransactionHistoryProps } from "../types"
import styles from "./TransactionsBlock.module.scss"
import { TransactionDateGroup } from "../TransactionDateGroup/TransactionDateGroup"

export const TransactionBlock: FC<TransactionHistoryProps> = ({
  groups,
  loading,
  onTransactionClick,
}) => {
  if (loading) {
    return <span>Загрузка...</span>
  }

  return (
    <div className={styles.content}>
      {groups.map(group => (
        <TransactionDateGroup
          key={group.date}
          group={group}
          onTransactionClick={onTransactionClick}
        />
      ))}
    </div>
  )
}
