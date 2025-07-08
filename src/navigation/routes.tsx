import { createHashRouter, Navigate } from "react-router-dom"
import { MarketplacePage } from "@/pages/MarketplacePage/MarketplacePage"
import { MyNftPage } from "@/pages/MyNftPage/MyNftPage"
import { ProfilePage } from "@/pages/ProfilePage/ProfilePage"
import { MainLayout } from "@/layouts/MainLayout/MainLayout"
import { StickersPage } from "@/pages/StickersPage/StickersPage"
import { GiftPage } from "@/pages/GiftPage/GiftPage"
import { GiftsCollectionGrid } from "@/components/GiftsCollectionGrid/GiftsCollectionGrid"
import { StickerModal } from "@/components/StickerModal/StickerModal"
import { GiftModal } from "@/components/GiftModal/GiftModal"

export const router = createHashRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "market",
        element: <MarketplacePage />,
        children: [
          { index: true, element: <Navigate to="stickers" replace /> },
          {
            path: "stickers",
            element: <StickersPage />,
            children: [{ path: ":id", element: <StickerModal /> }],
          },
          { path: "gifts", element: <GiftsCollectionGrid /> },
          {
            path: "gifts/:key",
            element: <GiftPage />,
            children: [{ path: ":id", element: <GiftModal /> }],
          },
        ],
      },

      {
        path: "my-nft",
        element: <MyNftPage />,
        children: [
          { index: true, element: <Navigate to="stickers" replace /> },
          {
            path: "stickers",
            element: <StickersPage />,
            children: [{ path: ":id", element: <StickerModal /> }],
          },
          { path: "gifts", element: <GiftsCollectionGrid /> },
          {
            path: "gifts/:key",
            element: <GiftPage />,
            children: [{ path: ":id", element: <GiftModal /> }],
          },
        ],
      },
      { path: "profile", element: <ProfilePage /> },
      { path: "*", element: <Navigate to="market" /> },
    ],
  },
])
