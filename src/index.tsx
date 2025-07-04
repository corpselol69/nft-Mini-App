import "@telegram-apps/telegram-ui/dist/styles.css"
import "./styles/globals.scss"

import ReactDOM from "react-dom/client"
import { StrictMode } from "react"

import { Root } from "@/components/Root.tsx"
import { EnvUnsupported } from "@/components/EnvUnsupported.tsx"
import { init } from "@/init.ts"
import { initI18n } from "@/i18n"
import { initDataHash, initDataUser } from "@telegram-apps/sdk"
import { retrieveLaunchParams } from "@telegram-apps/sdk"

import "./mockEnv.ts"

try {
  const launchParams = retrieveLaunchParams()
  const { tgWebAppPlatform: platform } = launchParams

  const debug =
    (launchParams.tgWebAppStartParam || "").includes("platformer_debug") ||
    import.meta.env.DEV

  await Promise.all([
    init({
      debug,
      eruda: debug && ["ios", "android"].includes(platform),
      mockForMacOS: platform === "macos",
    }),
    initI18n(), // ждём локализацию
  ])

  // if (viewport) {
  //   viewport.requestFullscreen();
  // }

  console.log(initDataHash())
  console.log(initDataUser())

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
