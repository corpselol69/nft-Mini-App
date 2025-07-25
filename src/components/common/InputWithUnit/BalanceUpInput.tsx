import { FC, useEffect, useId, useRef } from "react"
import classnames from "classnames"
import styles from "./BalanceUpInput.module.scss"
import { BalanceUpInputProps } from "./BalanceUpInput.d"

export const BalanceUpInput: FC<BalanceUpInputProps> = ({
  unit = "TON",
  className,
  value,
  onChange,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  useEffect(() => {
    const input = inputRef.current
    if (input) {
      input.focus()

      const event = new Event("touchstart", { bubbles: true })
      input.dispatchEvent(event)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        className={classnames(styles.input, className && className)}
        value={value || ""}
        onChange={handleChange}
        id={id}
        {...rest}
      />

      <span className={classnames(styles.unit, className && className)}>
        {unit}
      </span>
    </div>
  )
}
