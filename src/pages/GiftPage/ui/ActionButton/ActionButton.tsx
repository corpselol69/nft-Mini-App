import { FC, ReactNode } from "react"
import styles from "./ActionButton.module.scss"

export const ActionButton: FC<{
  onClick: () => void
  icon: ReactNode
  children: ReactNode
}> = ({ onClick, children, icon }) => {
  const Icon = icon

  return (
    <div className={styles.actionButtonWrapper} onClick={onClick}>
      <div className={styles.actionButtonIcon}>{Icon}</div>
      <div className={styles.actionButtonContent}>{children}</div>
    </div>
  )
}
