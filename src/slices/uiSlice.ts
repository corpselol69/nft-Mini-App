import { LOCAL_STORAGE_KEYS } from "@/helpers/localStorageKeys"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const getInitialTheme = (): "light" | "dark" => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME)
  return saved === "dark" ? "dark" : "light"
}
interface UIState {
  theme: "light" | "dark"
}

const initialState: UIState = {
  theme: getInitialTheme(),
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, action.payload)
    },
    toggleTheme: state => {
      state.theme = state.theme === "light" ? "dark" : "light"
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, state.theme)
    },
  },
})

export const { setTheme, toggleTheme } = uiSlice.actions
