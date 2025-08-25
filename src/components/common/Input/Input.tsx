import { FC } from "react"
import { IInputProps } from "./Input.d"
import styles from "./Input.module.scss"
import clsx from "classnames"

export const Input: FC<IInputProps> = ({
  icon,
  iconPosition = "left",
  className,
  ...props
}) => {
  return (
    <div className={clsx(styles.wrapper, className)}>
      {iconPosition === "left" && icon}
      <input className={styles.input} {...props} />
      {iconPosition === "right" && icon}
    </div>
  )
}
