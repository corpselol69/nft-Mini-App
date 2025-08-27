import { FC } from "react"
import { TransactionGroup } from "../TransactionsBlock/index"
import { TransactionItem } from "../TransactionItem/TransactionItem"
import styles from "./TransactionDateGroup.module.scss"
import { ActivityItem } from "@/types/finance"

type Props = {
  group: TransactionGroup
  onTransactionClick?: (transaction: ActivityItem) => void
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
      {group.items.map((el, idx) => {
        const isLast = isLastGroup && idx === group.items.length - 1
        return (
          <TransactionItem
            key={idx}
            transaction={el}
            onClick={() => onTransactionClick?.(el)}
            isLast={isLast}
          />
        )
      })}
    </div>
  </div>
)
