import { Wallet } from "@/types/wallet"
import { api } from "../api"
import { setWallet, setWalletError } from "@/slices/walletSlice"

export const walletApi = api.injectEndpoints({
  endpoints: builder => ({
    linkWallet: builder.mutation<void, { address: string }>({
      query: ({ address }) => ({
        url: "/wallets/link",
        method: "POST",
        data: { address },
      }),
      async onQueryStarted({ address }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          const res = await dispatch(
            walletApi.endpoints.getWallet.initiate()
          ).unwrap()
          dispatch(setWallet(res)) // обновим walletSlice всем объектом
        } catch (error) {
          dispatch(setWalletError("Не удалось получить данные кошелька"))
        }
      },
    }),
    unlinkWallet: builder.mutation<void, { wallet_id: string }>({
      query: ({ wallet_id }) => ({
        url: `/wallets/unlink/${wallet_id}`,
        method: "DELETE",
      }),
    }),
    getWallet: builder.query<Wallet, void>({
      query: () => ({
        url: "/wallets/me",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setWallet(data)) // синхронизируем Redux-слайс
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
