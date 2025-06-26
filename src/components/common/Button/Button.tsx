import { FC } from "react";
import clsx from "classnames";
import type { IButtonProps } from "./Button.d";
import styles from "./Button.module.scss";

export const Button: FC<IButtonProps> = ({
  variant = "primary",
  size = "medium",
  fullWidth = false,
  iconLeft,
  iconRight,
  iconOnly,
  loading = false,
  className,
  children,
  disabled,
  ...rest
}) => {
  return (
    <button
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        {
          [styles.fullWidth]: fullWidth,
          [styles.iconOnly]: iconOnly,
          [styles.loading]: loading,
        },
        className
      )}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && (
        <span className={styles.loader}>
          <span className={styles.loaderDot} />
          <span className={styles.loaderDot} />
          <span className={styles.loaderDot} />
        </span>
      )}
      <>
        {iconOnly ? (
          <span className={styles.icon}>{iconOnly}</span>
        ) : (
          <>
            {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
            {children && <span className={styles.content}>{children}</span>}
            {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
          </>
        )}
      </>
    </button>
  );
};
