# NFT Teleport - AI Coding Assistant Guidelines

## Architecture Overview

This is a **Telegram Mini App** for NFT trading in the TON ecosystem, built with React + TypeScript + Redux Toolkit + TON Connect. The app features a marketplace, wallet integration, referral system, and cart functionality.

### Key Architectural Patterns

- **Redux Toolkit Query (RTK Query)** for API state management with `src/api/api.ts` as the base
- **Module federation** pattern: each component has its own folder with `.tsx`, `.module.scss`, and `.d.ts` files
- **Provider-based modals** using custom `BottomSheetProvider` for mobile-first modal system
- **Theme-aware design system** with CSS custom properties and automatic dark/light theme detection from Telegram

## Development Workflows

### Starting Development

```bash
yarn dev          # Local development
yarn dev:https    # HTTPS for Telegram testing (requires sudo first time)
yarn build        # Production build
yarn deploy       # Deploy to GitHub Pages
```

### API Endpoints Pattern

All API endpoints follow this standardized pattern:

```typescript
// Pattern from src/api/endpoints/auth.ts
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
        // Side effects: update slices, chain API calls
      },
    }),
  }),
})
```

## Project-Specific Conventions

### Component Structure

```
ComponentName/
├── ComponentName.tsx          # Main component
├── ComponentName.module.scss  # Scoped styles
├── ComponentName.d.ts         # TypeScript interfaces
└── index.ts                   # Re-export
```

### State Management Patterns

- **Authentication flow**: `login` → updates `authSlice` + `walletSlice` + `financeSlice` in chain
- **Snackbar system**: Max 3 stacked notifications with auto-removal animation
- **Bottom sheets**: Stack-based modal system via context provider, not traditional modals

### Styling System

- Use **SCSS Modules** with design tokens from `src/styles/_variables.scss`
- Theme variables are CSS custom properties: `var(--colors-accent)`, `var(--bg-main)`
- Platform-specific styling via `data-platform="ios|base"` and `data-theme="light|dark"` attributes

### Telegram Integration

- **TON Connect** for wallet connection (not direct wallet integration)
- **Telegram SDK** initialization in `src/init.ts` with platform-specific mocking
- **Theme sync** with Telegram app theme changes
- **Safe area handling** for different device types in `MainLayout`

## Critical Integration Points

### Wallet Connection Flow

1. User connects via TON Connect UI → `useTonWalletLinker` hook
2. Auto-link wallet to backend via `linkWallet` API call
3. Update Redux `walletSlice` with wallet data
4. Sync balance from `financeAPI.getBalance`

### Modal System

Use `useBottomSheet()` hook, not traditional modals:

```typescript
const { openSheet, closeAll } = useBottomSheet()
openSheet(<SomeComponent />, {
  bottomSheetTitle: "Title",
  buttons: <Button onClick={closeAll}>Close</Button>,
})
```

### API Error Handling

- RTK Query handles caching and loading states automatically
- Use `onQueryStarted` for side effects and Redux updates
- Snackbar notifications for user-facing errors via `addSnackbar` action

### Navigation Structure

- Hash-based routing (`createHashRouter`) for Telegram compatibility
- Nested routes: `/market/stickers`, `/market/gifts/:key/:id`
- Modal routes handled via outlet context, not URL parameters

## Development Notes

- **SCSS API**: Use `api: "modern"` in Vite config for latest SCSS features
- **HTTPS Development**: Use `yarn dev:https` for Telegram testing, requires mkcert setup
- **Mock Environment**: Development mode auto-mocks Telegram environment in `src/mockEnv.ts`
- **Path Aliases**: Use `@/` for src imports, configured in both tsconfig and Vite
- **Telegram Platform**: Different behaviors for iOS/Android via platform detection

When implementing new features, follow the established patterns for API endpoints, component structure, and state management rather than introducing new architectural patterns.
