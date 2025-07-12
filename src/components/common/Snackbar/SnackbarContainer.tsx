import { useEffect, useState, useCallback } from "react"

import { removeSnackbar } from "@/slices/snackbarSlice"
import { Snackbar } from "./Snackbar"
import styles from "./SnackbarContainer.module.scss"
import { viewport, miniApp } from "@telegram-apps/sdk"
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux"

const MAX_SNACKBARS = 3

export const SnackbarContainer = () => {
  const snackbars = useAppSelector(state => state.snackbar.snackbars)
  const dispatch = useAppDispatch()
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set())
  const [paddingTop, setPaddingTop] = useState(0)

  const handleRemove = useCallback(
    (id: string) => {
      setRemovingIds(prev => new Set(prev).add(id))
      setTimeout(() => {
        dispatch(removeSnackbar(id))
        setRemovingIds(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      }, 300)
    },
    [dispatch]
  )

  useEffect(() => {
    if (snackbars.length > MAX_SNACKBARS) {
      const excess = snackbars.slice(0, snackbars.length - MAX_SNACKBARS)
      excess.forEach(snackbar => handleRemove(snackbar.id))
    }
  }, [snackbars, handleRemove])

  useEffect(() => {
    if (viewport.isFullscreen() && miniApp.isMounted()) {
      const safeArea = viewport.safeAreaInsets()
      setPaddingTop(safeArea.top + safeArea.bottom)
    }
  }, [])

  const visibleSnackbars = snackbars.slice(-MAX_SNACKBARS)

  return (
    <div className={styles.container} style={{ paddingTop }}>
      {visibleSnackbars.map(snackbar => (
        <div
          key={snackbar.id}
          className={`${styles.snackbarWrapper} ${
            removingIds.has(snackbar.id) ? styles.removing : ""
          }`}
        >
          <Snackbar
            {...snackbar}
            isRemoving={removingIds.has(snackbar.id)}
            onClose={() => handleRemove(snackbar.id)}
          />
        </div>
      ))}
    </div>
  )
}
