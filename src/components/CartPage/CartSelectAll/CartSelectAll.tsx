import { Checkbox } from "@/components/common/Checkbox/Checkbox"
import styles from "./CartSelectAll.module.scss"
import { CartSelectAllProps } from "./CartSelectAll.d"

export function CartSelectAll({
  items,
  selectedIds,
  onSelectAll,
}: CartSelectAllProps) {
  const inStockItems = items.filter(i => i.inStock)
  const allSelected =
    inStockItems.length > 0 && inStockItems.every(i => selectedIds.has(i.id))
  const someSelected = inStockItems.some(i => selectedIds.has(i.id))

  return (
    <div className={styles.contentHeader}>
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected && !allSelected}
        onChange={e => onSelectAll(e.target.checked)}
      />
    </div>
  )
}
