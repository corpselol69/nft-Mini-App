# NFT Teleport

NFT Teleport — это Telegram Mini App для торговли NFT и стикерами в экосистеме TON. Приложение предоставляет удобный интерфейс для покупки, продажи и управления цифровыми активами прямо в Telegram.

## 🚀 Основные функции

- Маркетплейс NFT — покупка и продажа NFT-коллекций
- Стикеры — торговля уникальными стикерами
- Подарки — система подарочных NFT
- Кошелек TON — интеграция с TON Connect
- Реферальная система — вознаграждение за приглашения
- Корзина — удобное оформление покупок
- Профиль — управление аккаунтом и балансом

## 🧱 Архитектура и паттерны

- Redux Toolkit + RTK Query для состояния и API-кеша
  - Базовый клиент: `src/api/api.ts`
  - Инъекция эндпоинтов через `api.injectEndpoints`
- «Module federation» (паттерн): каждый компонент в собственной папке с `.tsx`, `.module.scss`, `.d.ts`
- Провайдерная система модалок: `BottomSheetProvider` (мобильные bottom sheets вместо классических модалок)
- Тема и дизайн: CSS custom properties + автоопределение темы Telegram (light/dark)
- Навигация: hash-based роутинг (`createHashRouter`) для совместимости с Telegram
- Псевдо-мок окружение в Dev: `src/mockEnv.ts` (инициализация Telegram SDK в `src/init.ts`)
- Path aliases: импорты через `@/` (настроено в Vite и tsconfig)
- SCSS: `api: "modern"` в Vite для современных возможностей

## 🛠 Технологии

- React + TypeScript
- Redux Toolkit + RTK Query
- TON Connect
- @telegram-apps SDK
- React Router (hash-based)
- SCSS Modules
- i18n
- Vite

## 📁 Структура проекта

```
src/
├── api/                     # RTK Query
│   ├── api.ts               # базовый api
│   └── endpoints/           # файлы эндпоинтов (auth, wallet, market и т.п.)
├── components/
│   ├── common/              # общие UI-компоненты
│   └── [PageName]/
│       ├── Component.tsx
│       ├── Component.module.scss
│       ├── Component.d.ts
│       └── index.ts
├── pages/                   # страницы (MarketplacePage, ProfilePage, CartPage, ...)
├── providers/               # контекст-провайдеры (BottomSheetProvider и др.)
├── layouts/                 # компоновка (MainLayout с safe areas)
├── navigation/              # router (createHashRouter)
├── styles/                  # глобальные стили и токены (_variables.scss, _typography.scss)
├── hooks/                   # пользовательские хуки (напр., useTonWalletLinker)
├── init.ts                  # инициализация Telegram SDK
├── mockEnv.ts               # dev-моки платформы Telegram
├── types/                   # типы
└── static/                  # статика
```

Структура компонента:

```
ComponentName/
├── ComponentName.tsx
├── ComponentName.module.scss
├── ComponentName.d.ts
└── index.ts
```

## 🔗 Навигация

- Hash-based routing (`createHashRouter`)
- Примеры маршрутов:
  - `/market/stickers`
  - `/market/gifts/:key/:id`
- Модальные сценарии — через контекст (bottom sheets), а не параметры URL

## 🧩 Модальная система (Bottom Sheets)

Открывайте модалки через провайдер:

```ts
const { openSheet, closeAll } = useBottomSheet()
openSheet(<SomeComponent />, {
  bottomSheetTitle: "Заголовок",
  buttons: <Button onClick={closeAll}>Закрыть</Button>,
})
```

Максимальная совместимость с мобильными сценариями.

## 🔐 Аутентификация и кошелек

- TON Connect используется для подключения кошелька (без прямой интеграции кошелька)
- Поток подключения:

  1. Пользователь подключает кошелек через UI TON Connect и `useTonWalletLinker`
  2. Автолинк кошелька к бэкенду (`linkWallet`)
  3. Обновление `walletSlice` в Redux
  4. Синхронизация баланса через `financeAPI.getBalance`

- Общий аутентикейшн-флоу:
  - `login` → каскадное обновление `authSlice` + `walletSlice` + `financeSlice`

## 🧰 RTK Query: паттерн эндпоинтов

```ts
import { api } from "@/api/api"
import type { SomeType } from "@/types/someType"

const endpoint = "/endpoint-name"

export const someAPI = api.injectEndpoints({
  endpoints: builder => ({
    someAction: builder.mutation<ResponseType, PayloadType>({
      query: data => ({
        url: `${endpoint}/action`,
        method: "POST",
        data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        // Сайд-эффекты: обновление срезов, цепочки запросов
      },
    }),
  }),
})
```

- Обработка ошибок: через RTK Query + уведомления (Snackbar)
- Сайд-эффекты: `onQueryStarted` (обновление слайсов, цепочки действий)
- Caching/Loading — автоматически

## 🔔 Уведомления (Snackbar)

- Стакинг до 3 штук
- Автоудаление с анимацией
- Ошибки API — через `addSnackbar`

## 🎨 Дизайн-система и стили

- SCSS Modules + дизайн-токены в `src/styles/_variables.scss`
- CSS custom properties для тем: `var(--colors-accent)`, `var(--bg-main)` и др.
- Автосмена темы в соответствии с Telegram
- Платформенные стили через атрибуты:
  - `data-platform="ios|base"`
  - `data-theme="light|dark"`
- Типографика — миксины в `src/styles/_typography.scss`

## 📱 Страницы

- Маркетплейс (`/market`)
  - Стикеры (`/market/stickers`)
  - Подарки (`/market/gifts`)
- Профиль (`/profile`)
  - Кошелек, баланс, история, реферальная система
- Мои NFT (`/my-nft`)
- Корзина (`/cart`)
- Реферальная система (`/profile/ref`)

## 🛠 Установка и запуск

Требуется Yarn.

```bash
yarn
```

Доступные скрипты:

- `dev` — локальная разработка
- `dev:https` — HTTPS для тестирования в Telegram
- `build` — сборка
- `lint` — ESLint
- `deploy` — GitHub Pages

```bash
yarn dev           # локально
yarn dev:https     # HTTPS (возможен запрос sudo при первом запуске)
```

После старта: https://localhost:5173

### HTTPS (macOS)

Если нужно вручную установить сертификаты:

```bash
brew install mkcert nss
mkcert -install
# затем: yarn dev:https
```

## 🔧 Настройка

### TON Connect

1. Редактируйте `public/tonconnect-manifest.json`
2. Укажите корректные URL и иконки проекта

### Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Получите токен
3. Пропишите Mini App URL в настройках бота

### Переменные окружения

Создайте `.env`:

```env
VITE_APP_URL=https://localhost:5173
VITE_BOT_NAME=your_bot_name
```

## 🌐 Деплой

### GitHub Pages (авто)

1. В `package.json`:

```json
{
  "homepage": "https://username.github.io/repository-name"
}
```

2. В `vite.config.ts`:

```ts
export default defineConfig({
  base: "/repository-name/",
})
```

3. Пуш в `master` → автодеплой

### Вручную

```bash
yarn build
yarn deploy
```

## 🧭 Заметки по разработке

- Следуйте компонентной структуре: `.tsx`, `.module.scss`, `.d.ts`, `index.ts`
- Импорты через `@/` (aliased paths)
- SCSS `api: "modern"` в Vite конфиге
- В Dev окружении Telegram SDK и платформа могут быть замоканы (`src/mockEnv.ts`)
- Основной layout обрабатывает safe areas (iOS/Android)

## 🔗 Полезные ссылки

- Документация Telegram Mini Apps: https://docs.telegram-mini-apps.com/
- TON Connect: https://docs.ton.org/develop/dapps/ton-connect/overview
- Telegram Apps SDK React: https://docs.telegram-mini-apps.com/packages/telegram-apps-sdk-react
- Чат разработчиков Telegram: https://t.me/devs
