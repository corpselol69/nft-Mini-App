import React, { InputHTMLAttributes } from "react"

export type CheckboxProps = {
  indeterminate?: boolean
  label?: React.ReactNode
  className?: string
} & InputHTMLAttributes<HTMLInputElement>
