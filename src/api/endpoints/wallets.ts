import { Wallet, WalletLinkPayload } from "@/types/wallet"
import { api } from "../api"
import { setWallet, setWalletError } from "@/slices/walletSlice"

export const walletApi = api.injectEndpoints({
  endpoints: builder => ({
    linkWallet: builder.mutation<void, WalletLinkPayload>({
      query: payload => ({
        url: "/wallets/link",
        method: "POST",
        data: payload,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          const res = await dispatch(
            walletApi.endpoints.getWallet.initiate()
          ).unwrap()
          dispatch(setWallet(res[0])) // обновим walletSlice всем объектом
        } catch (error) {
          dispatch(setWalletError("Не удалось получить данные кошелька"))
        }
      },
    }),
    unlinkWallet: builder.mutation<void, { wallet_id: string }>({
      query: ({ wallet_id }) => ({
        url: `/wallets/${wallet_id}`,
        method: "DELETE",
      }),
    }),
    getWallet: builder.query<Wallet[], void>({
      query: () => ({
        url: "/wallets/me",
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setWallet(data[0])) // синхронизируем Redux-слайс
        } catch (e) {
          dispatch(setWalletError("Не удалось получить кошелек"))
        }
      },
    }),
  }),
})

export const {
  useLinkWalletMutation,
  useUnlinkWalletMutation,
  useGetWalletQuery,
  useLazyGetWalletQuery,
} = walletApi
