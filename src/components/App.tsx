import { useEffect, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import {
  retrieveLaunchParams,
  useSignal,
  isMiniAppDark,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { router } from "@/navigation/routes.tsx";

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const inset =
        window.Telegram.WebApp.viewportStableHeight -
        window.Telegram.WebApp.viewportHeight;

      console.log("Top inset:", inset);

      const handleResize = () => {
        const updatedInset =
          window.Telegram.WebApp.viewportStableHeight -
          window.Telegram.WebApp.viewportHeight;
        console.log("Updated inset:", updatedInset);
      };

      window.Telegram.WebApp.onEvent("viewportChanged", handleResize);

      return () => {
        window.Telegram.WebApp.offEvent("viewportChanged", handleResize);
      };
    } else {
      console.warn("Telegram WebApp not initialized");
    }
  }, []);

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"}
    >
      <RouterProvider router={router} />
    </AppRoot>
  );
}
