import { FC, InputHTMLAttributes, useId, useRef } from "react"
import classnames from "classnames"
import styles from "./BalanceUpInput.module.scss"

type Props = {
  unit?: string
  className?: string
  value?: string
  onChange: (value: string) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value">

export const BalanceUpInput: FC<Props> = ({
  unit = "TON",
  className,
  value,
  onChange,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputBlock}>
        <input
          ref={inputRef}
          className={classnames(styles.input, className && className)}
          value={value || ""}
          onChange={handleChange}
          id={id}
          {...rest}
        />
      </div>
      <span className={classnames(styles.unit, className && className)}>
        {unit}
      </span>
    </div>
  )
}
