import { FC } from "react"
import { IInputProps } from "./Input.d"
import styles from "./Input.module.scss"
import clsx from "clsx"

export const Input: FC<IInputProps> = ({ icon, className, ...props }) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {icon && <span className={styles.icon}>{icon}</span>}
      <input className={styles.input} {...props} />
    </div>
  )
}
