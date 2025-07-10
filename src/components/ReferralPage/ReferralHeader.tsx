import type { FC } from "react"
import styles from "./ReferralHeader.module.scss"

interface ReferralHeaderProps {
  totalEarned: string
  description: string
}

export const ReferralHeader: FC<ReferralHeaderProps> = ({
  totalEarned,
  description,
}) => {
  // Parse the amount and currency from totalEarned (e.g., "12.4 TON")
  const parts = totalEarned.split(" ")
  const amount = parts[0] || "0"
  const currency = parts[1] || "TON"

  // Split amount into integer and decimal parts
  const [integer, decimal] = amount.split(".")

  return (
    <div className={styles.referralHeader}>
      <div className={styles.label}>Вы заработали</div>
      <div className={styles.amount}>
        <span className={styles.amountMain}>{integer}</span>
        {decimal && <span className={styles.amountSub}>,{decimal} </span>}
        <span className={styles.currency}>{currency}</span>
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}
