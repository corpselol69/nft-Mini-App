import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "@/slices/authSlice"
import { i18nSlice } from "@/slices/i18nSlice"
import { uiSlice } from "@/slices/uiSlice"
import { snackbarSlice } from "@/slices/snackbarSlice"
import { walletSlice } from "@/slices/walletSlice"

import { api } from "@/api/api"
import "@/api/endpoints/auth"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    i18n: i18nSlice.reducer,
    ui: uiSlice.reducer,
    snackbar: snackbarSlice.reducer,
    wallet: walletSlice.reducer,

    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
