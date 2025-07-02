// components/common/DetailsTable/DetailsTable.tsx
import React, { ReactNode } from "react"
import styles from "./DetailsTable.module.scss"

type DetailRow = {
  label: string
  value: ReactNode
}

type DetailsTableProps = {
  rows: DetailRow[]
}

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
