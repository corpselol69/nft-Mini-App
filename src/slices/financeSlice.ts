import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface FinanceState {
  balance: string
  error: string | null
}

const initialState: FinanceState = {
  balance: "0",
  error: null,
}

export const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setUserBalance(state, action: PayloadAction<string>) {
      state.balance = action.payload
    },
    setFinanceError(state, action: PayloadAction<string>) {
      state.error = action.payload
    },
    resetFinance(state) {
      state.balance = "0"
      state.error = null
    },
  },
})

export const { setUserBalance, setFinanceError, resetFinance } =
  financeSlice.actions
export default financeSlice.reducer
