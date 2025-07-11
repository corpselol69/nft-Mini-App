import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { User } from "@/types/user"

interface AuthState {
  token: string | null
  user: User | null
  status: "idle" | "loading" | "error" | "success"
  error: string | null
}

const initialState: AuthState = {
  token: null,
  user: null,
  status: "idle",
  error: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload
    },
    logout(state) {
      state.token = null
      state.user = null
      state.status = "idle"
    },
  },
})

export const { setToken, setUser, logout } = authSlice.actions
