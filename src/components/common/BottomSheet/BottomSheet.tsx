import { FC, useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { IBottomSheetProps } from "./BottomSheet.d"
import styles from "./BottomSheet.module.scss"
import clsx from "classnames"
import { CloseIcon } from "./CloseIcon"
import { viewport, miniApp } from "@telegram-apps/sdk"

//FIXME: При монтировании компонента, почему-то рядом с ним монтируется еще один пустой див без классов, без контента. Надо понять почему и убрать
export const BottomSheet: FC<IBottomSheetProps> = ({
  onClose,
  open,
  children,
  title,
  leftButton,
  buttons,
  doCloseAnimation = false,
}) => {
  const [dragY, setDragY] = useState(0)
  const [closing, setClosing] = useState(false)
  const [paddingBottom, setPaddingBottom] = useState(0)

  const touchStartRef = useRef<number | null>(null)

  const doClose = () => {
    setClosing(true)
    setTimeout(() => {
      setDragY(0)
      setClosing(false)
      onClose()
    }, 350)
  }

  const onTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    touchStartRef.current = e.touches[0].clientY
  }

  const onTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartRef.current) {
      const delta = e.touches[0].clientY - touchStartRef.current
      if (delta > 0) {
        setDragY(delta)
      }
    }
  }

  const onTouchEnd = () => {
    if (dragY > 70) {
      doClose()
    } else {
      setDragY(0)
    }
    touchStartRef.current = null
  }

  useEffect(() => {
    doCloseAnimation && doClose()
  }, [doCloseAnimation])

  useEffect(() => {
    if (viewport.isFullscreen() && miniApp.isMounted()) {
      const safeArea = viewport.safeAreaInsets()
      setPaddingBottom(safeArea.bottom)
    }
  }, [])

  if (!open && !closing) return null

  const content = (
    <div
      className={clsx(styles.overlay, closing && styles.hidden)}
      onClick={doClose}
    >
      <div
        className={clsx(styles.sheet, closing && styles.closing)}
        style={{
          transform: dragY > 0 ? `translateY(${dragY * 3}px)` : undefined,
          paddingBottom: paddingBottom > 0 ? `${paddingBottom}px` : undefined,
        }}
        onClick={e => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.dragHandle} />
        <div className={styles.header}>
          <div className={styles.left}>{leftButton}</div>
          <div className={styles.title}>{title}</div>
          <div className={styles.right}>
            <CloseIcon onClick={doClose} />
          </div>
        </div>
        <div className={styles.children}>{children}</div>
        {buttons && buttons}
      </div>
    </div>
  )

  return ReactDOM.createPortal(content, document.body)
}
