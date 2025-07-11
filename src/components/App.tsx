import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import { retrieveRawInitData, on } from "@telegram-apps/sdk"

import { router } from "@/navigation/routes.tsx"
import { useLoginMutation } from "@/api/endpoints/auth"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"
import { setToken } from "@/slices/authSlice"
import i18n from "@/i18n"
import { setTheme } from "@/slices/uiSlice"

export function App() {
  const initDataRaw = retrieveRawInitData()
  const dispatch = useAppDispatch()

  const language = useAppSelector(state => state.i18n.language)
  const theme = useAppSelector(state => state.ui.theme)

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
    if (i18n.language !== language) {
      i18n.changeLanguage(language).catch(err => {
        console.error("Ошибка при смене языка:", err)
      })
    }
  }, [language])

  useEffect(() => {
    on("theme_changed", payload => {
      const theme =
        payload.theme_params.bg_color === "#ffffff" ? "light" : "dark"
      dispatch(setTheme(theme))
    })
  }, [dispatch])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return <RouterProvider router={router} />
}
