import { Checkbox } from "@/components/Checkbox/Checkbox"
import styles from "./CartSelectAll.module.scss"

export function CartSelectAll({
  items,
  onSelectAll,
}: {
  items: { selected: boolean }[]
  onSelectAll: (checked: boolean) => void
}) {
  const allSelected = items.length && items.every(i => i.selected)
  const someSelected = items.some(i => i.selected)

  return (
    <div className={styles.contentHeader}>
      <Checkbox
        checked={!!allSelected}
        onChange={e => onSelectAll(someSelected ? false : e.target.checked)}
        indeterminate={someSelected}
      />
    </div>
  )
}
