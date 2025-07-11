import api from "@/api/apiClient"
import { OutgoingCreatePayload, Transaction } from "@/types/transaction"

const endpoint = "/transactions/"

const getMyTransactions = async () => {
  const response = await api.get<Transaction[]>(`${endpoint}me`)
  return response.data
}

const createOutgoingTx = async (payload: OutgoingCreatePayload) => {
  const response = await api.post(`${endpoint}outgoing`, payload)
  return response.data
}

export const transactionsAPI = {
  getMyTransactions,
  createOutgoingTx,
}

export default transactionsAPI
