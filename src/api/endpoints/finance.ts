import { api } from "@/api/api"
import { setFinanceError, setUserBalance } from "@/slices/financeSlice"
import type {
  BalanceRead,
  DepositPayload,
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUserBalance(data.available))
        } catch (e) {
          dispatch(setFinanceError("Не удалось получить баланс"))
        }
      },
    }),

    deposit: builder.mutation<void, DepositPayload>({
      query: payload => ({
        url: `${endpoint}/deposit`,
        method: "POST",
        data: payload,
      }),
    }),

    withdraw: builder.mutation<void, WithdrawalPayload>({
      query: payload => ({
        url: `${endpoint}/withdraw`,
        method: "POST",
        data: payload,
      }),
    }),
  }),
})

export const {
  useGetBalanceQuery,
  useLazyGetBalanceQuery,
  useDepositMutation,
  useWithdrawMutation,
} = financeApi
