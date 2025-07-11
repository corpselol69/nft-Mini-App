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
