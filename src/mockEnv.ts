import { mockTelegramEnv, isTMA } from "@telegram-apps/sdk"

// It is important, to mock the environment only for development purposes. When building the
// application, import.meta.env.DEV will become false, and the code inside will be tree-shaken,
// so you will not see it in your final bundle.
if (import.meta.env.DEV) {
  if (!(await isTMA("complete"))) {
    mockTelegramEnv({
      onEvent() {
        // Here you can write your own handlers for all known Telegram MIni Apps methods.
      },
      launchParams: new URLSearchParams([
        // Discover more launch parameters:
        // https://docs.telegram-mini-apps.com/platform/launch-parameters#parameters-list
        // Your init data goes here. Learn more about it here:
        // https://docs.telegram-mini-apps.com/platform/init-data#parameters-list
        //
        // Note that to make sure, you are using a valid init data, you must pass it exactly as it
        // is sent from the Telegram application. The reason is in case you will sort its keys
        // (auth_date, hash, user, etc.) or values your own way, init data validation will more
        // likely to fail on your server side. So, to make sure you are working with a valid init
        // data, it is better to take a real one from your application and paste it here. It should
        // look something like this (a correctly encoded URL search params):
        // ```
        // user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22...
        // ```
        // But in case you don't really need a valid init data, use this one:
        [
          "tgWebAppData",
          new URLSearchParams([
            ["auth_date", ((new Date().getTime() / 1000) | 0).toString()],
            ["hash", "some-hash"],
            ["signature", "some-signature"],
            ["user", JSON.stringify({ id: 1, first_name: "Vladislav" })],
          ]).toString(),
        ],
        ["tgWebAppVersion", "8.4"],
        ["tgWebAppPlatform", "tdesktop"],
      ]),
    })

    console.info(
      "⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram."
    )
  }
}
