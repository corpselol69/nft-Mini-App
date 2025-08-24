import { createApi } from "@reduxjs/toolkit/query/react"
import { axiosBaseQuery } from "./axiosBaseQuery"

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: [
    "Me",
    "Wallet",
    "Transactions",
    "Balance",
    "Cart",
    "CartPreview",
    "Orders",
  ] as const,

  endpoints: () => ({}),
})
