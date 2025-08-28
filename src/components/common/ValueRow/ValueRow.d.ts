import React from "react"

export interface ValueRowProps {
  label: React.ReactNode
  hint?: React.ReactNode
  value: number | string
  className?: string
}
