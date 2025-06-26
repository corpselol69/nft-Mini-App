import React from "react";
import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.d";

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
      {children && <span className={styles.content}>{children}</span>}
      {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </button>
  );
};
