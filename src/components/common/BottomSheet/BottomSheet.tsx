import { FC, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { IBottomSheetProps } from "./BottomSheet.d";
import styles from "./BottomSheet.module.scss";
import clsx from "classnames";
import { CloseIcon } from "./CloseIcon";
import { ShareIcon } from "./ShareIcon";

export const BottomSheet: FC<IBottomSheetProps> = ({
  onClose,
  open,
  children,
  renderLeftHeader,
}) => {
  const [dragY, setDragY] = useState(0);
  const [closing, setClosing] = useState(false);
  const [el] = useState(() => {
    const d = document.createElement("div");
    d.id = "bottom-sheet-portal";
    document.body.appendChild(d);
    return d;
  });
  const touchStartRef = useRef<number | null>(null);

  if (!open && !closing) return null;

  const doClose = () => {
    setClosing(true);
    setTimeout(() => {
      setDragY(0);
      setClosing(false);
      onClose();
    }, 180);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const onTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartRef.current) {
      const delta = e.touches[0].clientY - touchStartRef.current;
      if (delta > 0) {
        setDragY(delta);
      }
    }
  };

  const onTouchEnd = () => {
    if (dragY > 70) {
      doClose();
    } else {
      setDragY(0);
    }
    touchStartRef.current = null;
  };

  //TODO: допилить функционал вызова виджета отправки сообщения
  //   const shareWithContacts = async () => {
  //     if (navigator.canShare()) {
  //     }
  //   }

  const content = (
    <div className={styles.overlay} onClick={doClose}>
      <div
        className={clsx(styles.sheet, closing && styles.sheetClosing)}
        style={{ transform: dragY > 0 ? `translateY(${dragY}px)` : undefined }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={styles.dragHandle}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        />
        <div
          className={clsx(
            renderLeftHeader?.() && styles.iconsRow,
            !renderLeftHeader?.() && styles.iconRow
          )}
        >
          {renderLeftHeader?.()}
          <CloseIcon onClick={doClose} />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, el);
};
