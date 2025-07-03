import React from "react"
import styles from "./Button.module.scss"
import { ButtonProps } from "./Button.d"
import cs from "classnames"

export const Button: React.FC<ButtonProps> = ({
  leftIcon,
  rightIcon,
  children,
  type = "primary",
  className = "",
  size = "medium",
  isDisabled = false,
  ...props
}) => {
  return (
    <button
      className={[
        styles.button,
        styles[type],
        className,
        styles[size],
        isDisabled ? styles.disabled : "",
      ].join(" ")}
      {...props}
    >
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      {children && (
        <span
          className={cs(styles.content, type === "vertical" && styles.column)}
        >
          {children}
        </span>
      )}
      {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </button>
  )
}
