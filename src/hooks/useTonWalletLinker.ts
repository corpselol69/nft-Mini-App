import { useEffect } from "react"
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react"
import { useAppSelector } from "@/hooks/useRedux"
import { useLinkWalletMutation } from "@/api/endpoints/wallets"

export const useTonWalletLinker = () => {
  const [linkWallet] = useLinkWalletMutation()
  const address = useTonAddress()
  const [tonConnectUI] = useTonConnectUI()

  const wallet = useAppSelector(state => state.wallet.data)

  useEffect(() => {
    if (!tonConnectUI.connected || !address || wallet?.address) return

    const handle = async () => {
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

      await linkWallet(payload)
    }

    handle()
  }, [tonConnectUI.connected, address])
}
