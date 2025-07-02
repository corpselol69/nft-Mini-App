import { FC, ReactNode } from "react"
import styles from "./Chip.module.scss"

export const Chip: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className={styles.chipWrapper}>{children}</div>
}
