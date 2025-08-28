import { FC, useEffect, useId, useRef } from "react"
import classnames from "classnames"
import styles from "./BalanceUpInput.module.scss"
import { BalanceUpInputProps } from "./BalanceUpInput.d"

export const BalanceUpInput: FC<BalanceUpInputProps> = ({
  unit = "TON",
  className,
  value,
  onChange,
  autoFocus = true,
  minValue = 0.1,
  onKeyDown: onKeyDownExternal,
  onBlur: onBlurExternal,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const id = useId()

  const normalize = (raw: string): string => {
    let v = (raw || "").replace(/,/g, ".")
    v = v.replace(/[^\d.]/g, "")
    v = v.replace(/\.(?=.*\.)/g, "")
    if (v === "0") return "."
    if (/^0\d/.test(v)) v = "." + v.slice(1)

    const parts = v.split(".")
    if (parts[1] != null) {
      parts[1] = parts[1].slice(0, 2)
      v = parts.join(".")
    }
    return v
  }

  const clampOnBlur = (s: string): string => {
    if (s === "" || s === ".") {
      if (minValue < 1) {
        const frac = String(minValue).split(".")[1] || "0"
        return `.${frac}`
      }
      return String(minValue)
    }

    let n = parseFloat(s)
    if (Number.isNaN(n)) n = 0
    if (n > 0 && n < minValue) n = minValue
    return String(n)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = normalize(e.target.value)
    onChange(next)
  }

  useEffect(() => {
    const input = inputRef.current
    if (input && autoFocus) {
      input.focus()

      const event = new Event("touchstart", { bubbles: true })
      input.dispatchEvent(event)
    }
  }, [autoFocus])

  return (
    <div className={styles.wrapper}>
      <input
        ref={inputRef}
        className={classnames(styles.input, className && className)}
        value={value || ""}
        onChange={handleChange}
        inputMode="decimal"
        onKeyDown={e => {
          const allowed =
            (e.key >= "0" && e.key <= "9") ||
            e.key === "." ||
            e.key === "," ||
            [
              "Backspace",
              "Delete",
              "ArrowLeft",
              "ArrowRight",
              "Home",
              "End",
              "Tab",
            ].includes(e.key)
          if (!allowed) e.preventDefault()
          onKeyDownExternal?.(e)
        }}
        onBlur={e => {
          const next = clampOnBlur(value || e.target.value)
          if ((value || "") !== next) onChange(next)
          onBlurExternal?.(e)
        }}
        id={id}
        autoFocus={autoFocus}
        {...rest}
      />

      <span className={classnames(styles.unit, className && className)}>
        {unit}
      </span>
    </div>
  )
}
