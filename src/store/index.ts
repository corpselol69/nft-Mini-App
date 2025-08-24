import { configureStore } from "@reduxjs/toolkit"
import { i18nSlice } from "@/slices/i18nSlice"
import { uiSlice } from "@/slices/uiSlice"
import { snackbarSlice } from "@/slices/snackbarSlice"
import { cartSlice } from "@/slices/cartSlice"
import { financeSlice } from "@/slices/financeSlice"

import { api } from "@/api/api"
import "@/api/endpoints/auth"

export const store = configureStore({
  reducer: {
    i18n: i18nSlice.reducer,
    ui: uiSlice.reducer,
    snackbar: snackbarSlice.reducer,
    cart: cartSlice.reducer,
    finance: financeSlice.reducer,

    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
