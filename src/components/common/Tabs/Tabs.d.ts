import { ReactNode } from "react"
import { To } from "react-router-dom"

type TabsType = "nav" | "select"

export interface TabProps {
  to: string
  children: ReactNode
  type?: TabsType
  selected?: boolean
  onClick?: () => void
}

type TabsProps = {
  children: ReactNode
  type?: TabsType
  selected?: string
  onSelect?: (key: string) => void
}
