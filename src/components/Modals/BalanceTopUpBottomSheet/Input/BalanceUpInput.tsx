import { FC, useRef, useState } from "react"
import styles from "./BalanceUpInput.module.scss"

type Props = {
  value: string
  onChange: (v: string) => void
  unit?: string
}

export const BalanceUpInput: FC<Props> = ({
  onChange,
  value,
  unit = "TON",
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputBlock}>
        <input
          ref={inputRef}
          className={styles.input}
          type="number"
          value={value}
          onChange={e => onChange(e.target.value.replace(/^0+/, ""))}
        />
      </div>
      <span className={styles.unit}>{unit}</span>
    </div>
  )
}
