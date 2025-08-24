import { api } from "@/api/api"
import { setFinanceError, setUserBalance } from "@/slices/financeSlice"
import type {
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
  }),
})

export const {
  useGetBalanceQuery,
  useLazyGetBalanceQuery,
  useDepositMutation,
  useWithdrawMutation,
} = financeApi
