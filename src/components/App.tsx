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
import { useLoginMutation } from "@/api/endpoints/auth"
import { useAppDispatch } from "@/hooks/useRedux"
import { setToken } from "@/slices/authSlice"

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), [])
  const isDark = signal(isMiniAppDark())()
  const initDataRaw = retrieveRawInitData()

  const dispatch = useAppDispatch()
  const [login] = useLoginMutation()

  useEffect(() => {
    if (!initDataRaw) return

    const tokenFromStorage = localStorage.getItem("access_token")
    if (tokenFromStorage) {
      dispatch(setToken(tokenFromStorage))
      return
    }

    login({ init_data: initDataRaw })
      .unwrap()
      .then(res => {
        localStorage.setItem("access_token", res.access_token)
        dispatch(setToken(res.access_token))
      })
      .catch(err => {
        console.error("Ошибка авторизации:", err)
      })
  }, [initDataRaw, login, dispatch])

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
