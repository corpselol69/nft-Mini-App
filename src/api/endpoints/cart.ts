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
      providesTags: ["Cart"],
    }),

    // POST /cart/items — добавить в корзину
    addToCart: builder.mutation<CartRead, CartAddItem>({
      query: payload => ({
        url: `${endpoint}/items`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Cart", "CartPreview"],
    }),

    // DELETE /cart/items/{item_id} — удалить из корзины
    removeFromCart: builder.mutation<CartRead | null, string>({
      query: listing_id => ({
        url: `${endpoint}/items?listing_id=${listing_id}`,
        method: "DELETE",
      }),
      // ответ по схеме: CartRead | null
      transformResponse: (res: CartRead | null) => res ?? null,
      invalidatesTags: ["Cart", "CartPreview"],
    }),

    // GET /cart/refresh — актуализировать корзину (цены/наличие)
    refreshCart: builder.query<CartPreview, void>({
      query: () => ({
        url: `${endpoint}/refresh`,
        method: "GET",
      }),
      providesTags: ["CartPreview"],
    }),

    // POST /cart/confirm — подтвердить корзину (перед чекаутом)
    cartConfirm: builder.mutation<CartConfirmRead, CartConfirmIn>({
      query: payload => ({
        url: `${endpoint}/confirm`,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Cart", "CartPreview"],
    }),

    // POST /cart/checkout — оформить заказ
    cartCheckout: builder.mutation<OrderRead, void>({
      query: () => ({
        url: `${endpoint}/checkout`,
        method: "POST",
      }),
      invalidatesTags: ["Cart", "Balance", "Transactions", "Orders"],
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
} = cartApi
