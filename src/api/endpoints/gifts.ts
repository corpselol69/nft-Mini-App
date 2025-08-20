// src/api/gifts.ts
import { api } from "@/api/api"
import type { GiftRead, GiftWebhookIn } from "@/types/gift"

const endpoint = "/gifts"

export const giftsApi = api.injectEndpoints({
  endpoints: builder => ({
    // GET /gifts — мои подарки
    getMyGifts: builder.query<GiftRead[], void>({
      query: () => ({
        url: `${endpoint}/`,
        method: "GET",
      }),
    }),

    // GET /gifts/{gift_id} — один подарок
    getGiftById: builder.query<GiftRead, string>({
      query: giftId => ({
        url: `${endpoint}/${giftId}`,
        method: "GET",
      }),
    }),

    // POST /gifts/{gift_id}/lock?lock=true|false — залочить/разлочить подарок
    lockGift: builder.mutation<GiftRead, { giftId: string; lock?: boolean }>({
      query: ({ giftId, lock = true }) => ({
        url: `${endpoint}/${giftId}/lock`,
        method: "POST",
        params: { lock },
      }),
    }),

    // POST /gifts/webhook — вебхук от телеги
    giftsWebhook: builder.mutation<void, GiftWebhookIn>({
      query: payload => ({
        url: `${endpoint}/webhook`,
        method: "POST",
        data: payload,
      }),
    }),
  }),
})

export const {
  useGetMyGiftsQuery,
  useLazyGetMyGiftsQuery,
  useGetGiftByIdQuery,
  useLazyGetGiftByIdQuery,
  useLockGiftMutation,
  useGiftsWebhookMutation,
} = giftsApi
