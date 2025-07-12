import { api } from "../api"

export const walletApi = api.injectEndpoints({
  endpoints: builder => ({
    linkWallet: builder.mutation<void, { address: string }>({
      query: ({ address }) => ({
        url: "/wallets/link",
        method: "POST",
        data: { address },
      }),
    }),
    unlinkWallet: builder.mutation<void, void>({
      query: () => ({
        url: "/wallets/unlink",
        method: "POST",
      }),
    }),
  }),
})

export const { useLinkWalletMutation, useUnlinkWalletMutation } = walletApi
