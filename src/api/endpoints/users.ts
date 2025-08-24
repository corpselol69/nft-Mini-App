import { api } from "@/api/api"
import type { TelegramInitData, UserUpdate } from "@/types/user"
import type { User } from "@/types/user"

const endpoint = "/users"

export const usersAPI = api.injectEndpoints({
  endpoints: builder => ({
    onboardUser: builder.mutation<User, TelegramInitData>({
      query: data => ({
        url: `${endpoint}/onboard`,
        method: "POST",
        data,
      }),
    }),

    getMe: builder.query<User, void>({
      query: () => ({
        url: `${endpoint}/me`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
    }),

    getUser: builder.query<User, string>({
      query: userId => ({
        url: `${endpoint}/${userId}`,
        method: "GET",
      }),
    }),

    updateUser: builder.mutation<User, { userId: string; payload: UserUpdate }>(
      {
        query: ({ userId, payload }) => ({
          url: `${endpoint}/${userId}`,
          method: "PATCH",
          data: payload,
        }),
      }
    ),

    deleteUser: builder.mutation<void, string>({
      query: userId => ({
        url: `${endpoint}/${userId}`,
        method: "DELETE",
      }),
    }),

    listUsers: builder.query<User[], { offset?: number; limit?: number }>({
      query: ({ offset = 0, limit = 50 }) => ({
        url: `${endpoint}`,
        method: "GET",
        params: { offset, limit },
      }),
    }),
  }),
})

export const {
  useOnboardUserMutation,
  useGetMeQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useListUsersQuery,
} = usersAPI
