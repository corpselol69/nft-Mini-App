import { Wallet, WalletLinkPayload } from "@/types/wallet"
import { api } from "../api"

export const walletApi = api.injectEndpoints({
  endpoints: builder => ({
    linkWallet: builder.mutation<void, WalletLinkPayload>({
      query: payload => ({
        url: "/wallets/link",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Wallet"],
    }),
    unlinkWallet: builder.mutation<void, { wallet_id: string }>({
      query: ({ wallet_id }) => ({
        url: `/wallets/${wallet_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wallet"],
    }),
    getWallet: builder.query<Wallet[], void>({
      query: () => ({
        url: "/wallets/me",
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: ["Wallet"],
    }),
  }),
})

export const {
  useLinkWalletMutation,
  useUnlinkWalletMutation,
  useGetWalletQuery,
  useLazyGetWalletQuery,
} = walletApi
