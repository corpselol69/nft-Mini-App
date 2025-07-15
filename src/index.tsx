import "./styles/globals.scss"

import ReactDOM from "react-dom/client"
import { StrictMode } from "react"

import { Root } from "@/components/Root.tsx"
import { EnvUnsupported } from "@/components/EnvUnsupported.tsx"
import { init } from "@/init.ts"
import { initI18n } from "@/i18n"

import {
  initDataAuthDate,
  initDataHash,
  initDataUser,
  retrieveLaunchParams,
  retrieveRawInitData,
  retrieveRawLaunchParams,
} from "@telegram-apps/sdk"

import "./mockEnv.ts"

try {
  const launchParams = retrieveLaunchParams()
  const initDataRaw = retrieveRawInitData()
  const webapp = retrieveRawLaunchParams()

  const { tgWebAppPlatform: platform } = launchParams

  const debug =
    (launchParams.tgWebAppStartParam || "").includes("platformer_debug") ||
    import.meta.env.DEV

  await Promise.all([
    init({
      debug,
      eruda: true,
      // debug && ["ios", "android"].includes(platform),
      mockForMacOS: platform === "macos",
    }),
    initI18n(), // ждём локализацию
  ])

  console.log("initDataQueryId", initDataRaw)
  console.log("launchParams", launchParams)
  console.log("webapp", webapp)
  console.log("initDataHash", initDataHash())
  console.log("initDataUser", initDataUser())
  console.log("initDataAuth", initDataAuthDate()?.getTime())

  const root = ReactDOM.createRoot(document.getElementById("root")!)

  root.render(
    <StrictMode>
      <Root />
    </StrictMode>
  )
} catch (e) {
  const root = ReactDOM.createRoot(document.getElementById("root")!)
  root.render(<EnvUnsupported />)
}
