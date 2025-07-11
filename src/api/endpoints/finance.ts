import api from "@/api/apiClient"
import { BalanceRead, DepositPayload, WithdrawalPayload } from "@/types/finance"

const endpoint = "/finance/"

const getBalance = async () => {
  const response = await api.get<BalanceRead>(`${endpoint}balance`)
  return response.data
}

const deposit = async (payload: DepositPayload) => {
  const response = await api.post(`${endpoint}deposit`, payload)
  return response.data
}

const withdraw = async (payload: WithdrawalPayload) => {
  const response = await api.post(`${endpoint}withdraw`, payload)
  return response.data
}

export const financeAPI = {
  getBalance,
  deposit,
  withdraw,
}

export default financeAPI
