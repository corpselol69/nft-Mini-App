// src/api/cart.ts
import { api } from "@/api/api"
import type {
  CartAddItem,
  CartRead,
  CartPreview,
  CartConfirmIn,
  CartConfirmRead,
  OrderRead,
} from "@/types/cart"

const endpoint = "/cart"

export const cartApi = api.injectEndpoints({
  endpoints: builder => ({
    // GET /cart/ — получить мою корзину
    getMyCart: builder.query<CartRead | null, void>({
      query: () => ({
        url: `${endpoint}/`,
        method: "GET",
      }),
      // если бэк может вернуть null — позволяем RTK Query кэшировать null
      transformResponse: (res: CartRead | null) => res ?? null,
    }),

    // POST /cart/items — добавить в корзину
    addToCart: builder.mutation<CartRead, CartAddItem>({
      query: payload => ({
        url: `${endpoint}/items`,
        method: "POST",
        data: payload,
      }),
    }),

    // DELETE /cart/items/{item_id} — удалить из корзины
    removeFromCart: builder.mutation<CartRead | null, string>({
      query: itemId => ({
        url: `${endpoint}/items/${itemId}`,
        method: "DELETE",
      }),
      // ответ по схеме: CartRead | null
      transformResponse: (res: CartRead | null) => res ?? null,
    }),

    // GET /cart/refresh — актуализировать корзину (цены/наличие)
    refreshCart: builder.query<CartPreview, void>({
      query: () => ({
        url: `${endpoint}/refresh`,
        method: "GET",
      }),
    }),

    // POST /cart/confirm — подтвердить корзину (перед чекаутом)
    cartConfirm: builder.mutation<CartConfirmRead, CartConfirmIn>({
      query: payload => ({
        url: `${endpoint}/confirm`,
        method: "POST",
        data: payload,
      }),
    }),

    // POST /cart/checkout — оформить заказ
    cartCheckout: builder.mutation<OrderRead, void>({
      query: () => ({
        url: `${endpoint}/checkout`,
        method: "POST",
      }),
    }),

    // GET /ping — ping сервера (полезно для healthcheck)
    pingServer: builder.query<unknown, void>({
      query: () => ({
        url: `/ping`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useGetMyCartQuery,
  useLazyGetMyCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useRefreshCartQuery,
  useLazyRefreshCartQuery,
  useCartConfirmMutation,
  useCartCheckoutMutation,
  usePingServerQuery,
  useLazyPingServerQuery,
} = cartApi
