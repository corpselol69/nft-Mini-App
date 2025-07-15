export interface BalanceRead {
  available: string
  pending_out: string
}

export interface DepositPayload {
  amount: number | string
}

export interface WithdrawalPayload {
  amount: number | string
  address: string
}

export interface DepositResponse {
  payload: string
  transfer_link: string
}
