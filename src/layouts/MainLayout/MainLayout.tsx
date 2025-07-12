import { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { miniApp, on, swipeBehavior, viewport } from "@telegram-apps/sdk"
import styles from "./MainLayout.module.scss"
import { BottomNavigation } from "@/components/common/BottomNavigation"
import { SnackbarContainer } from "@/components/common/Snackbar"

export function MainLayout() {
  const [paddingTop, setPaddingTop] = useState(0)
  const [paddingBottom, setPaddingBottom] = useState(0)

  useEffect(() => {
    if (viewport.isFullscreen() && miniApp.isMounted()) {
      const safeArea = viewport.safeAreaInsets()
      const totalPadding = safeArea.top + safeArea.bottom
      setPaddingTop(totalPadding)
      setPaddingBottom(safeArea.bottom)
    }

    swipeBehavior.mount.ifAvailable()
    if (swipeBehavior.isMounted()) {
      swipeBehavior.disableVertical()
    }
  }, [])

  useEffect(() => {
    on("safe_area_changed", payload => {
      setPaddingBottom(payload.bottom)
    })
  }, [])

  return (
    <div className={styles.root}>
      <SnackbarContainer />

      <main className={styles.content} style={{ paddingTop }}>
        <Outlet />
      </main>

      <BottomNavigation paddingBottom={paddingBottom} />
    </div>
  )
}
