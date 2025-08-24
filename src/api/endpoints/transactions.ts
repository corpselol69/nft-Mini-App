import { api } from "@/api/api"
import type { Transaction, OutgoingCreatePayload } from "@/types/transaction"

const endpoint = "/transactions"

export const transactionsApi = api.injectEndpoints({
  endpoints: builder => ({
    getMyTransactions: builder.query<Transaction[], void>({
      query: () => ({
        url: `${endpoint}/me`,
        method: "GET",
      }),
      providesTags: ["Transactions"],
    }),

    createOutgoingTx: builder.mutation<Transaction, OutgoingCreatePayload>({
      query: payload => ({
        url: `${endpoint}/outgoing`,
        method: "POST",
        data: payload,
      }),
    }),
  }),
})

export const {
  useGetMyTransactionsQuery,
  useLazyGetMyTransactionsQuery,
  useCreateOutgoingTxMutation,
} = transactionsApi
