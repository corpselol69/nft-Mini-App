import { forwardRef, InputHTMLAttributes, useEffect, useRef } from "react"
import clsx from "clsx"

import styles from "./Checkbox.module.scss"

type Props = {
  indeterminate?: boolean
  label?: React.ReactNode
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ indeterminate = false, label, className, ...rest }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(internalRef.current)
        } else {
          ;(ref as React.MutableRefObject<HTMLInputElement | null>).current =
            internalRef.current
        }
      }
    }, [ref])

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
            indeterminate && styles.indeterminate
          )}
        />
        {label && <span>{label}</span>}
      </label>
    )
  }
)
