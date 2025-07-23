import { FC } from "react"
import styles from "./Chip.module.scss"
import { ChipProps } from "./Chip.d"

export const Chip: FC<ChipProps> = ({ children }) => {
  return <div className={styles.chipWrapper}>{children}</div>
}
