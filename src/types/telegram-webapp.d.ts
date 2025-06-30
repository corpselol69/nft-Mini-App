declare global {
  interface Window {
    Telegram: Telegram;
  }

  interface Telegram {
    WebApp: WebApp;
  }

  interface WebApp {
    initData: string;
    initDataUnsafe: any;
    version: string;
    platform: string;
    colorScheme: "light" | "dark";
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    isClosingConfirmationEnabled: boolean;

    expand(): void;
    close(): void;
    onEvent(eventType: string, callback: () => void): void;
    offEvent(eventType: string, callback: () => void): void;
    sendData(data: string): void;
    showAlert(message: string, callback?: () => void): void;
    showConfirm(message: string, callback: (ok: boolean) => void): void;
    enableClosingConfirmation(): void;
    disableClosingConfirmation(): void;
  }
}

export {};
