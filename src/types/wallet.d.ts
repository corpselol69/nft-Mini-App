export interface Wallet {
  id: string
  address: string
  type: string
  status: string
  balance: string
  last_synced_block: number | null
  last_connected_at: string | null
}

export interface TonAccount {
  address: string
  network: CHAIN
  public_key: string
  wallet_state_init?: string | null
}

export interface WalletLinkPayload {
  account: TonAccount
  connector_session: string
}

export interface WalletProofPayload {
  address: string
  network: string
  timestamp: number
  domain: string
  signature: string
  payload: string
}
