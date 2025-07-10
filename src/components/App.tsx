import { useMemo } from "react"
import { RouterProvider } from "react-router-dom"
import { retrieveLaunchParams, isMiniAppDark } from "@telegram-apps/sdk"
import { signal } from "@telegram-apps/signals"

import { router } from "@/navigation/routes.tsx"

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), [])
  const isDark = signal(isMiniAppDark())()

  return (
    <div
      data-theme={isDark ? "dark" : "light"}
      data-platform={
        ["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"
      }
    >
      <RouterProvider router={router} />
    </div>
  )
}
