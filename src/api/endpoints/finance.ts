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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUserBalance(data.available))
        } catch (e) {
          dispatch(setFinanceError("Не удалось получить баланс"))
        }
      },
    }),

    deposit: builder.mutation<DepositResponse, DepositPayload>({
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled

          // 1. Обновляем баланс
          dispatch(
            financeApi.endpoints.getBalance.initiate(undefined, {
              forceRefetch: true,
            })
          )

          // 2. Обновляем список транзакций
          const { transactionsApi } = await import("./transactions") // динамически импортируем чтобы избежать циклической зависимости

          dispatch(
            transactionsApi.endpoints.getMyTransactions.initiate(undefined, {
              forceRefetch: true,
            })
          )
        } catch (e) {
          dispatch(setFinanceError("Ошибка при выполнении вывода средств"))
        }
      },
    }),
  }),
})

export const {
  useGetBalanceQuery,
  useLazyGetBalanceQuery,
  useDepositMutation,
  useWithdrawMutation,
} = financeApi
