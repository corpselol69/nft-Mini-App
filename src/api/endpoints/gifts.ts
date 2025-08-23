// src/api/gifts.ts
import { api } from "@/api/api"
import type { Gift } from "@/types/gift"

const endpoint = "/gifts"

export const giftsApi = api.injectEndpoints({
  endpoints: builder => ({
    // GET /gifts — мои подарки
    getMyGifts: builder.query<Gift[], void>({
      query: () => ({
        url: `${endpoint}/`,
        method: "GET",
      }),
    }),

    // GET /gifts/{gift_id} — один подарок
    getGiftById: builder.query<Gift, string>({
      query: giftId => ({
        url: `${endpoint}/${giftId}`,
        method: "GET",
      }),
    }),

    getGiftByIdPublic: builder.query<Gift, string>({
      query: giftId => ({
        url: `${endpoint}/public/${giftId}`,
        method: "GET",
      }),
    }),

    // POST /gifts/{gift_id}/lock?lock=true|false — залочить/разлочить подарок
    lockGift: builder.mutation<Gift, { giftId: string; lock?: boolean }>({
      query: ({ giftId, lock = true }) => ({
        url: `${endpoint}/${giftId}/lock`,
        method: "POST",
        params: { lock },
      }),
    }),
  }),
})

export const {
  useGetMyGiftsQuery,
  useLazyGetMyGiftsQuery,
  useGetGiftByIdQuery,
  useLazyGetGiftByIdQuery,
  useGetGiftByIdPublicQuery,
  useLazyGetGiftByIdPublicQuery,
  useLockGiftMutation,
} = giftsApi
