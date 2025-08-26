export interface CartSelectAllProps {
  items: { id: string; inStock: boolean }[]
  selectedIds: Set<string>
  onSelectAll: (checked: boolean) => void
}
