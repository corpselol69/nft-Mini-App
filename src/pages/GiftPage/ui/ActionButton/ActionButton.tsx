import { FC, ReactNode } from "react"
import clsx from "classnames"
import styles from "./ActionButton.module.scss"

export const ActionButton: FC<{
  onClick: () => void
  icon: ReactNode
  children: ReactNode
  className?: string
}> = ({ onClick, children, icon, className }) => {
  const Icon = icon

  return (
    <div
      className={clsx(styles.actionButtonWrapper, className)}
      onClick={onClick}
    >
      <div className={styles.actionButtonIcon}>{Icon}</div>
      <div className={styles.actionButtonContent}>{children}</div>
    </div>
  )
}
