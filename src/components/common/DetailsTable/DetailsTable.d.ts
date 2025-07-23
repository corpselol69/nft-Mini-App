import { ReactNode } from "react"

export type DetailRow = {
  label: string
  value: ReactNode
}

export interface DetailsTableProps {
  rows: DetailRow[]
}
