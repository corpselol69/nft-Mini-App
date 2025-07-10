import { useEffect, useMemo } from "react"
import { RouterProvider } from "react-router-dom"
import {
  retrieveLaunchParams,
  isMiniAppDark,
  miniApp,
} from "@telegram-apps/sdk"
import { signal } from "@telegram-apps/signals"

import { router } from "@/navigation/routes.tsx"

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), [])
  const isDark = signal(isMiniAppDark())()

  useEffect(() => {
    if (miniApp.setHeaderColor.isAvailable()) {
      miniApp.setHeaderColor(isDark ? "#131416" : "#ffffff")
    }
  }, [isDark])

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    )
    document.documentElement.setAttribute(
      "data-platform",
      ["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"
    )
  }, [isDark, lp.tgWebAppPlatform])

  return <RouterProvider router={router} />
}
