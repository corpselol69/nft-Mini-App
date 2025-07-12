import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { SnackbarData } from "@/components/common/Snackbar"

interface SnackbarState {
  snackbars: SnackbarData[]
}

const initialState: SnackbarState = {
  snackbars: [],
}

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    addSnackbar: (state, action: PayloadAction<Omit<SnackbarData, "id">>) => {
      const newSnackbar: SnackbarData = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.snackbars.push(newSnackbar)
    },
    removeSnackbar: (state, action: PayloadAction<string>) => {
      state.snackbars = state.snackbars.filter(
        snackbar => snackbar.id !== action.payload
      )
    },
  },
})

export const { addSnackbar, removeSnackbar } = snackbarSlice.actions
