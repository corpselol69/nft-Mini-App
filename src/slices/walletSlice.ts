import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface WalletState {
  address: string | null
  balance: number | null
  connected: boolean
  error: string | null
}

const initialState: WalletState = {
  address: null,
  balance: null,
  connected: false,
  error: null,
}

export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletAddress(state, action: PayloadAction<string>) {
      state.address = action.payload
      state.connected = true
      state.error = null
    },
    setWalletBalance(state, action: PayloadAction<number>) {
      state.balance = action.payload
    },
    setWalletError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.connected = false
    },
    resetWallet(state) {
      state.address = null
      state.balance = null
      state.connected = false
      state.error = null
    },
  },
})

export const {
  setWalletAddress,
  setWalletBalance,
  setWalletError,
  resetWallet,
} = walletSlice.actions
