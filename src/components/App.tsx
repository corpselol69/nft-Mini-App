import { useEffect, useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { retrieveLaunchParams, isMiniAppDark } from "@telegram-apps/sdk";
import { signal } from "@telegram-apps/signals";

import { AppRoot } from "@telegram-apps/telegram-ui";

import { router } from "@/navigation/routes.tsx";

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = signal(isMiniAppDark())();

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"}
    >
      <RouterProvider router={router} />
    </AppRoot>
  );
}
