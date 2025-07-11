import { api } from "../api"
import type { TelegramWebAppLoginPayload, Token } from "@/types/auth"
import type { User } from "@/types/user"

const endpoint = "/auth"

export const authAPI = api.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<Token, TelegramWebAppLoginPayload>({
      query: data => ({
        url: `${endpoint}/login/webapp`,
        method: "POST",
        data,
      }),
    }),
    getMe: builder.query<User, void>({
      query: () => ({
        url: `${endpoint}/me`,
        method: "GET",
      }),
    }),
  }),
})

export const { useLoginMutation, useGetMeQuery } = authAPI
