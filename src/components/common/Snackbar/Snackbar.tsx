import type { FC } from "react"
import { useEffect } from "react"
import styles from "./Snackbar.module.scss"
import Icon from "@/components/common/Icon/Icon"
import type { SnackbarProps } from "./Snackbar.d"
import { Button } from "@/components/common/Button/Button"
import imgCheck from "@/static/icons/check_small.svg"
import imgClose from "@/static/icons/icn-L_Close.svg"

export const Snackbar: FC<SnackbarProps> = ({
  title,
  description,
  onClose,
  autoHide = true,
  duration = 5000,
}) => {
  useEffect(() => {
    if (autoHide && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [autoHide, duration, onClose])

  return (
    <div className={styles.snackbar}>
      <div className={styles.content}>
        <div className={styles.iconContainer}>
          <Icon src={imgCheck} className={styles.checkIcon} />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.title}>{title}</div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
        </div>
        <Button type="icon" className={styles.closeButton} onClick={onClose}>
          <Icon src={imgClose} />
        </Button>
      </div>
    </div>
  )
}
