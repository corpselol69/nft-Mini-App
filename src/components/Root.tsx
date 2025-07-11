import { TonConnectUIProvider } from "@tonconnect/ui-react"

import { App } from "@/components/App.tsx"
import { ErrorBoundary } from "@/components/ErrorBoundary.tsx"
import { publicUrl } from "@/helpers/publicUrl.ts"

import { I18nextProvider } from "react-i18next"
import i18n from "@/i18n"
import { BottomSheetProvider } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { store } from "@/store"
import { Provider } from "react-redux"

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  )
}

export function Root() {
  return (
    <Provider store={store}>
      <ErrorBoundary fallback={ErrorBoundaryError}>
        <I18nextProvider i18n={i18n}>
          <TonConnectUIProvider
            manifestUrl={publicUrl("tonconnect-manifest.json")}
          >
            <BottomSheetProvider>
              <App />
            </BottomSheetProvider>
          </TonConnectUIProvider>
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  )
}
