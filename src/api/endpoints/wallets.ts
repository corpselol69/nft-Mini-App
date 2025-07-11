import api from "@/api/apiClient"
import { Wallet, WalletLinkPayload, WalletProofPayload } from "@/types/wallet"

const endpoint = "/wallets/"

const linkWallet = async (payload: WalletLinkPayload) => {
  const response = await api.post(`${endpoint}link`, payload)
  return response.data
}

const getMyWallets = async () => {
  const response = await api.get<Wallet[]>(`${endpoint}me`)
  return response.data
}

const refreshWallet = async (walletId: string) => {
  const response = await api.post(`${endpoint}${walletId}/refresh`)
  return response.data
}

const unlinkWallet = async (walletId: string) => {
  await api.delete(`${endpoint}${walletId}`)
}

const verifyProof = async (payload: WalletProofPayload) => {
  const response = await api.post(`${endpoint}verify`, payload)
  return response.data
}

export const walletsAPI = {
  linkWallet,
  getMyWallets,
  refreshWallet,
  unlinkWallet,
  verifyProof,
}

export default walletsAPI
