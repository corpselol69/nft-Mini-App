import { createHashRouter, Navigate } from "react-router-dom";
import { MarketplacePage } from "@/pages/MarketplacePage/MarketplacePage";
import { MyNftPage } from "@/pages/MyNftPage/MyNftPage";
import { ProfilePage } from "@/pages/ProfilePage/ProfilePage";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { StickerPage } from "@/pages/StickerPage/StickerPage";
import { GiftPage } from "@/pages/GiftPage/GiftPage";
import { StickersGrid } from "@/components/StickersGrid/StickersGrid";
import { GiftsGrid } from "@/components/GiftsGrid/GiftsGrid";

export const router = createHashRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "market",
        element: <MarketplacePage />,
        children: [
          { index: true, element: <Navigate to="stickers" replace /> },
          { path: "stickers", element: <StickersGrid /> },
          { path: "gifts", element: <GiftsGrid /> },

          { path: "stickers/:id", element: <StickerPage /> },
          { path: "gifts/:id", element: <GiftPage /> },
        ],
      },

      { path: "my-nft", element: <MyNftPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "*", element: <Navigate to="market" /> },
    ],
  },
]);
