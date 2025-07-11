import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "../slices/authSlice"

import { api } from "@/api/api"
import "@/api/endpoints/auth"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,

    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
