import { ReactNode } from "react"

export type SheetEntry = {
  key: string
  content: ReactNode
  renderLeftHeader?: () => ReactNode
  buttons?: React.ReactNode
}
