import { setToken, setUser } from "@/slices/authSlice"
import { setWallet, setWalletError } from "@/slices/walletSlice"
import { api } from "../api"
import type { TelegramWebAppLoginPayload, Token } from "@/types/auth"
import type { User } from "@/types/user"
import { setAccessToken } from "../apiClient"
import { walletApi } from "./wallets"
import { usersAPI } from "./users"
import { financeApi } from "./finance"
import { setUserBalance } from "@/slices/financeSlice"

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
          dispatch(setToken(tokenData.access_token))
          setAccessToken(tokenData.access_token) // 👈 для axios

          // 2. Получаем пользователя
          const user = await dispatch(
            usersAPI.endpoints.getMe.initiate()
          ).unwrap()
          dispatch(setUser(user))

          // 3. Получаем кошелёк
          const wallet = await dispatch(
            walletApi.endpoints.getWallet.initiate()
          ).unwrap()
          dispatch(setWallet(wallet[0]))

          const balance = await dispatch(
            financeApi.endpoints.getBalance.initiate()
          ).unwrap()
          dispatch(setUserBalance(balance.available))
        } catch (error) {
          console.error("Ошибка после логина:", error)
          dispatch(setWalletError("Не удалось загрузить профиль или кошелек"))
        }
      },
    }),
  }),
})

export const { useLoginMutation } = authAPI
