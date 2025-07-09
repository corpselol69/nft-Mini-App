import { PropsWithChildren, ReactNode } from "react"

export interface IBottomSheetProps extends PropsWithChildren {
  open: boolean
  onClose: () => void
  title?: string
  leftButton?: React.ReactNode
  buttons?: ReactElement
  backgroundColor?: string
  blur?: string
  doCloseAnimation?: boolean
}
