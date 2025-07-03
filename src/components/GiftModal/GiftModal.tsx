import { type FC } from "react";

import { NftBottomSheet } from "@/components/StickersGrid/ui/NftBottomSheet/NftBottomSheet";
import { BottomSheet } from "../common/BottomSheet/BottomSheet";

import shareIcon from "@/static/icons/shareIcon.svg";
import { shareURL } from "@telegram-apps/sdk";
import Icon from "../common/Icon/Icon";
import { Button } from "@/components/common/Button/Button";
import { useNavigate, useParams } from "react-router-dom";

export const GiftModal: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  return (
    <BottomSheet
      open={true}
      onClose={() => navigate(-1)}
      renderLeftHeader={() => (
        <Button
          type="icon"
          onClick={() => {
            const url = window.location.href;
            if (shareURL.isAvailable()) {
              shareURL(url, `Смотри этот стикер #${id}`);
            }
          }}
        >
          <Icon src={shareIcon} />
        </Button>
      )}
    >
      <NftBottomSheet
        availableBalance="12,4"
        collection="Bored Stickers"
        number={`#${id}`}
        imgLink=""
        issued="9 999/9 999"
        price="95"
      />
    </BottomSheet>
  );
};
