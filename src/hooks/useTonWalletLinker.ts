import { useEffect, useRef } from "react"
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react"
import {
  useGetWalletQuery,
  useLinkWalletMutation,
} from "@/api/endpoints/wallets"

export const useTonWalletLinker = () => {
  const [linkWallet] = useLinkWalletMutation()
  const { data: wallets } = useGetWalletQuery()
  const currentWallet = wallets?.[0]
  const address = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()

  const onceRef = useRef(false)

  useEffect(() => {
    if (!tonConnectUI.connected || !address || currentWallet?.address) return
    if (onceRef.current) return
    onceRef.current = true

    const connected = tonConnectUI.account
    if (!connected) return

    const payload = {
      account: {
        address: connected.address,
        network: connected.chain,
        public_key: connected.publicKey ?? "",
        wallet_state_init: connected.walletStateInit || null,
      },
      connector_session: "1",
    }

    const handle = async () => {
      try {
        await linkWallet(payload).unwrap()
      } finally {
        onceRef.current = false
      }
    }

    handle()
  }, [
    tonConnectUI.connected,
    address,
    currentWallet?.address,
    linkWallet,
    tonConnectUI.account,
  ])
}
