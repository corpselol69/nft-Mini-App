import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { Wallet } from "@/types/wallet"

interface WalletState {
  data: Wallet | null
  connected: boolean
  error: string | null
}

const initialState: WalletState = {
  data: null,
  connected: false,
  error: null,
}

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWallet(state, action: PayloadAction<Wallet>) {
      state.data = action.payload
      state.connected = true
      state.error = null
    },
    setWalletError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.connected = false
      state.data = null
    },
    resetWallet(state) {
      state.data = null
      state.connected = false
      state.error = null
    },
  },
})

export const { setWallet, setWalletError, resetWallet } = walletSlice.actions
