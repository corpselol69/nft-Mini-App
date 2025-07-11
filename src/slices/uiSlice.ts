import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface UIState {
  theme: "light" | "dark"
}

const initialState: UIState = {
  theme: "dark",
}

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload
    },
    toggleTheme: state => {
      state.theme = state.theme === "light" ? "dark" : "light"
    },
  },
})

export const { setTheme, toggleTheme } = uiSlice.actions
