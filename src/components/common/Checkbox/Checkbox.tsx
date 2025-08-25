import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import clsx from "classnames"

import styles from "./Checkbox.module.scss"
import { CheckboxProps } from "./Checkbox.d"

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ indeterminate = false, label, className, ...rest }, forwardedRef) => {
    const internalRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(forwardedRef, () => internalRef.current!, [])

    useEffect(() => {
      if (internalRef.current) {
        internalRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    return (
      <label className={styles.checkboxLabelWrapper}>
        <input
          {...rest}
          type="checkbox"
          ref={internalRef}
          className={clsx(styles.checkbox, className)}
        />
        <span
          className={clsx(
            styles.checkboxCustom,
            indeterminate && styles.indeterminate,
            className
          )}
        />
        {label && <span>{label}</span>}
      </label>
    )
  }
)
