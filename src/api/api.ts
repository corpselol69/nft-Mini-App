import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "./axiosBaseQuery"

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["Me", "Wallet", "Transactions"] as const, // 👈 вот это важно

  endpoints: () => ({}), // будет расширяться
})
