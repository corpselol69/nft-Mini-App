import { useEffect } from "react"
import { useAppSelector } from "@/hooks/useRedux"
import TonConnect from "@tonconnect/sdk"

export const useTonWalletAutoConnect = () => {
  const connector = new TonConnect()
  const wallet = useAppSelector(state => state.wallet.data)
  //const walletTon = useTonWallet()

  useEffect(() => {
    const autoConnect = async () => {
      if (wallet?.address && !connector.connected) {
        await connector.restoreConnection()
        console.log("TonConnect auto-connected", connector)
      }
    }
    autoConnect()
  }, [wallet?.address])
}
