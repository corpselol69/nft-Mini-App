import { api } from "@/api/api"
import type {
  ActivityRead,
  BalanceRead,
  DepositPayload,
  DepositResponse,
  WithdrawalPayload,
} from "@/types/finance"

const endpoint = "/finance"

export const financeApi = api.injectEndpoints({
  endpoints: builder => ({
    getBalance: builder.query<BalanceRead, void>({
      query: () => ({
        url: `${endpoint}/balance`,
        method: "GET",
      }),
      providesTags: ["Balance"],
    }),

    deposit: builder.mutation<DepositResponse, DepositPayload>({
      query: payload => ({
        url: `${endpoint}/deposit`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Balance", "Transactions"],
    }),

    withdraw: builder.mutation<void, WithdrawalPayload>({
      query: payload => ({
        url: `${endpoint}/withdraw`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Balance", "Transactions"],
    }),
    activity: builder.query<ActivityRead, { offset?: number; limit?: number }>({
      query: ({ offset = 0, limit = 50 } = {}) => ({
        url: `${endpoint}/activity?offset=${offset}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Transactions"],
    }),
  }),
})

export const {
  useGetBalanceQuery,
  useLazyGetBalanceQuery,
  useDepositMutation,
  useWithdrawMutation,
  useActivityQuery,
} = financeApi
