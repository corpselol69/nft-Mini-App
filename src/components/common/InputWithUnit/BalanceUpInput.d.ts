import { InputHTMLAttributes } from "react"

export interface BalanceUpInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  unit?: string
  className?: string
  value?: string
  onChange: (value: string) => void
  minValue?: number // минимальное значение при блюре (по умолчанию 0.1)
}
