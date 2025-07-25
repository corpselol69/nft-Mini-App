import { FC } from "react"
import { TransactionGroup } from "../TransactionsBlock/index"
import { TransactionItem } from "../TransactionItem/TransactionItem"
import styles from "./TransactionDateGroup.module.scss"
import { Transaction } from "@/types/transaction"

type Props = {
  group: TransactionGroup
  onTransactionClick?: (transaction: Transaction) => void
  isLastGroup?: boolean
}

export const TransactionDateGroup: FC<Props> = ({
  group,
  onTransactionClick,

  isLastGroup = false,
}) => (
  <div className={styles.group}>
    <div className={styles.dateHeader}>{group.date}</div>
    <div className={styles.transactions}>
      {group.transactions.map((el, idx) => {
        const isLast = isLastGroup && idx === group.transactions.length - 1
        return (
          <TransactionItem
            key={el.id}
            transaction={el}
            onClick={() => onTransactionClick?.(el)}
            isLast={isLast}
          />
        )
      })}
    </div>
  </div>
)
