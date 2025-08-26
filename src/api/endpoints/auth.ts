import { api } from "../api"
import type { TelegramWebAppLoginPayload, Token } from "@/types/auth"
import { setAccessToken } from "../apiClient"
import { walletApi } from "./wallets"
import { usersAPI } from "./users"
import { financeApi } from "./finance"
import { tokenStorage } from "../apiClient"

const endpoint = "/auth"

export const authAPI = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<Token, TelegramWebAppLoginPayload>({
      query: data => ({
        url: `${endpoint}/login/webapp`,
        method: "POST",
        data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: tokenData } = await queryFulfilled

          // 1. Сохраняем токен
          setAccessToken(tokenData.access_token) // 👈 для axios
          tokenStorage.save(tokenData)

          // 2. Получаем пользователя
          dispatch(
            usersAPI.endpoints.getMe.initiate(undefined, { forceRefetch: true })
          )

          // 3. Получаем кошелёк
          dispatch(
            walletApi.endpoints.getWallet.initiate(undefined, {
              forceRefetch: true,
            })
          )

          dispatch(
            financeApi.endpoints.getBalance.initiate(undefined, {
              forceRefetch: true,
            })
          ).unwrap()
        } catch (error) {
          console.error("Ошибка после логина:", error)
        }
      },
    }),
  }),
})

export const { useLoginMutation } = authAPI
