import { ReactNode } from "react"

export type SheetEntry = {
  key: string
  content: ReactNode
  bottomSheetTitle?: string
  leftButton?: React.ReactNode
  buttons?: React.ReactNode
  onClose?: () => void
  closing?: boolean
}
