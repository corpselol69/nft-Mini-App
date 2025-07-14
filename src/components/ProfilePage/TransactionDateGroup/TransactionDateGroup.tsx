import { FC } from "react"
import { Transaction, TransactionGroup } from "../types"
import { TransactionItem } from "../TransactionItem/TransactionItem"
import styles from "./TransactionDateGroup.module.scss"

type Props = {
  group: TransactionGroup
  onTransactionClick?: (transaction: Transaction) => void
  className?: string
}

export const TransactionDateGroup: FC<Props> = ({
  group,
  onTransactionClick,
  className,
}) => (
  <div className={styles.group}>
    <div className={styles.dateHeader}>{group.date}</div>
    <div className={styles.transactions}>
      {group.transactions.map(el => (
        <TransactionItem
          key={el.id}
          transaction={el}
          onClick={() => onTransactionClick?.(el)}
          className={className}
        />
      ))}
    </div>
  </div>
)
