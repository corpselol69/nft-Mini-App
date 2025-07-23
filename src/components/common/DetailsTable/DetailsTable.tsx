// components/common/DetailsTable/DetailsTable.tsx
import React from "react"
import styles from "./DetailsTable.module.scss"
import { DetailsTableProps } from "./DetailsTable.d"

export const DetailsTable: React.FC<DetailsTableProps> = ({ rows }) => {
  return (
    <div className={styles.table}>
      {rows.map(({ label, value }) => (
        <div key={label} className={styles.row}>
          <div className={styles.label}>{label}</div>
          <div className={styles.value}>{value}</div>
        </div>
      ))}
    </div>
  )
}
