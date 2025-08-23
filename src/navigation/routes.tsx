import { createHashRouter, Navigate } from "react-router-dom"
import { MarketplacePage } from "@/pages/MarketplacePage/MarketplacePage"
import { MyNftPage } from "@/pages/MyNftPage/MyNftPage"
import { ProfilePage } from "@/pages/ProfilePage/ProfilePage"
import { MainLayout } from "@/layouts/MainLayout/MainLayout"
import { StickersPage } from "@/pages/StickersPage/StickersPage"
import { GiftPage } from "@/pages/GiftPage/GiftPage"
import { GiftsCollectionGrid } from "@/components/common/GiftsCollectionGrid/GiftsCollectionGrid"
import { StickerModal } from "@/components/StickerPage/StickerModal/StickerModal"
import { GiftModal } from "@/components/GiftPage/GiftModal/GiftModal"
import { CartPage } from "@/pages/CartPage/CartPage"
import { ReferralPage } from "@/pages/ReferralPage/ReferralPage"

export const router = createHashRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "market",
        element: <MarketplacePage />,
        children: [
          { index: true, element: <Navigate to="gifts" replace /> },
          {
            path: "stickers",
            element: <StickersPage />,
            children: [{ path: ":id", element: <StickerModal /> }],
          },
          { path: "gifts", element: <GiftsCollectionGrid /> },
          {
            path: "gifts/:model_id",
            element: <GiftPage />,
            children: [{ path: ":id", element: <GiftModal /> }],
          },
        ],
      },

      {
        path: "my-nft",
        element: <MyNftPage />,
        children: [
          { index: true, element: <Navigate to="gifts" replace /> },
          {
            path: "stickers",
            element: <StickersPage />,
            children: [{ path: ":id", element: <StickerModal /> }],
          },
          {
            path: "gifts",
            element: <GiftPage />,
            children: [{ path: ":id", element: <GiftModal /> }],
          },
        ],
      },
      { path: "profile", element: <ProfilePage /> },
      {
        path: "profile/ref",
        element: <ReferralPage />,
      },
      { path: "cart", element: <CartPage /> },
      { path: "*", element: <Navigate to="market" /> },
    ],
  },
])
