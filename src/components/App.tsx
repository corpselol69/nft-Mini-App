import { useEffect, useMemo, useState } from "react"
import { RouterProvider } from "react-router-dom"
import {
  retrieveLaunchParams,
  isMiniAppDark,
  miniApp,
  retrieveRawInitData,
} from "@telegram-apps/sdk"
import { signal } from "@telegram-apps/signals"

import { router } from "@/navigation/routes.tsx"
import authAPI from "@/api/endpoints/auth"
import { TelegramWebAppLoginPayload } from "@/types/auth"

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), [])
  const isDark = signal(isMiniAppDark())()
  const initDataRaw = retrieveRawInitData()
  const [user, setUser] = useState(localStorage.getItem("access_token"))

  const authUser = () => {
    if (!initDataRaw) {
      console.error("No init data available for authentication")
      return
    }
    if (user) return

    authAPI
      .login({ init_data: initDataRaw } as TelegramWebAppLoginPayload)
      .then(res => {
        console.log("User authenticated successfully")
        localStorage.setItem("access_token", res.access_token)
        setUser(res.access_token)
      })
      .catch(error => {
        console.error("Authentication failed:", error)
      })
  }

  useEffect(() => {
    if (miniApp.setHeaderColor.isAvailable()) {
      miniApp.setHeaderColor(isDark ? "#131416" : "#ffffff")
    }
  }, [isDark])

  useEffect(() => {
    authUser()
  }, [])

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
