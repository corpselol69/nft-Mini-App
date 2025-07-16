import { Checkbox } from "@/components/common/Checkbox/Checkbox"
import styles from "./CartSelectAll.module.scss"

export function CartSelectAll({
  items,
  onSelectAll,
}: {
  items: { selected: boolean; inStock: boolean }[]
  onSelectAll: (checked: boolean) => void
}) {
  const inStockItems = items.filter(i => i.inStock)

  const allSelected =
    inStockItems.length > 0 && inStockItems.every(i => i.selected)
  const someSelected = items.some(i => i.selected)

  return (
    <div className={styles.contentHeader}>
      <Checkbox
        checked={!!allSelected}
        onChange={e => onSelectAll(someSelected ? false : e.target.checked)}
        indeterminate={someSelected && !allSelected}
      />
    </div>
  )
}
