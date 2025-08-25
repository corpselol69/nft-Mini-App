import { InputHTMLAttributes, ReactNode } from "react"

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
  icon?: ReactNode
  iconPosition?: "left" | "right"
}
