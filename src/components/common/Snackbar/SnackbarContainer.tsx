import type { FC } from "react"
import { useState, useCallback, useEffect } from "react"
import { Snackbar } from "./Snackbar"
import type { SnackbarContainerProps } from "./Snackbar.d"
import styles from "./SnackbarContainer.module.scss"

const MAX_SNACKBARS = 3

export const SnackbarContainer: FC<SnackbarContainerProps> = ({
  snackbars,
  onRemove,
}) => {
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (snackbars.length > MAX_SNACKBARS) {
      const oldestIds = snackbars.slice(0, snackbars.length - MAX_SNACKBARS)
      oldestIds.forEach(snackbar => {
        handleRemove(snackbar.id)
      })
    }
  }, [snackbars])

  const handleRemove = useCallback(
    (id: string) => {
      setRemovingIds(prev => new Set(prev).add(id))

      setTimeout(() => {
        onRemove(id)
        setRemovingIds(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }, 300)
    },
    [onRemove]
  )

  const visibleSnackbars = snackbars.slice(-MAX_SNACKBARS)

  return (
    <div className={styles.container}>
      {visibleSnackbars.map(snackbar => (
        <div
          key={snackbar.id}
          className={`${styles.snackbarWrapper} ${
            removingIds.has(snackbar.id) ? styles.removing : ""
          }`}
        >
          <Snackbar {...snackbar} onClose={() => handleRemove(snackbar.id)} />
        </div>
      ))}
    </div>
  )
}
