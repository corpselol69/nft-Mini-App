import {
  CSSProperties,
  FC,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import { ITooltipProps, TooltipPosition } from "./Tooltip.d"
import styles from "./Tooltip.module.scss"
import { createPortal } from "react-dom"

export const Tooltip: FC<ITooltipProps> = ({
  children,
  content,
  offset = 4,
  prefer = "top",
  className,
}) => {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState(prefer)
  const [style, setStyle] = useState<CSSProperties>({})
  const [tooltipNode] = useState(() => {
    if (typeof window !== "undefined") {
      const el = document.createElement("div")
      document.body.appendChild(el)
      return el
    }
    return null
  })

  const targetRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!visible || !tooltipRef.current || !targetRef.current) {
      return
    }

    const targetRect = targetRef.current.getBoundingClientRect()
    const tooltipRect = tooltipRef.current.getBoundingClientRect()

    const vw = window.innerWidth
    const vh = window.innerHeight

    let pos: TooltipPosition = prefer
    let top = 0
    let left = 0

    const canTop = targetRect?.top >= tooltipRect?.height + offset
    const canBottom = vh - targetRect?.bottom >= tooltipRect?.height + offset
    const canRight = vw - targetRect?.right >= tooltipRect?.width + offset
    const canLeft = targetRect?.left >= tooltipRect?.width + offset

    const order =
      prefer === "top"
        ? ["top", "bottom", "right", "left"]
        : prefer === "bottom"
        ? ["bottom", "top", "right", "left"]
        : prefer === "right"
        ? ["right", "left", "top", "bottom"]
        : ["left", "right", "top", "bottom"]

    for (const candidate of order) {
      if (candidate === "top" && canTop) {
        pos = "top"
        break
      }
      if (candidate === "bottom" && canBottom) {
        pos = "bottom"
        break
      }
      if (candidate === "right" && canRight) {
        pos = "right"
        break
      }
      if (candidate === "left" && canLeft) {
        pos = "left"
        break
      }
    }

    if (pos === "top") {
      top = targetRect.top - tooltipRect.height - offset + window.scrollY
      left =
        targetRect.left +
        (targetRect.width - tooltipRect.width) / 2 +
        window.scrollX
    } else if (pos === "bottom") {
      top = targetRect.bottom + offset + window.scrollY
      left =
        targetRect.left +
        (targetRect.width - tooltipRect.width) / 2 +
        window.scrollX
    } else if (pos === "right") {
      top =
        targetRect.top +
        (targetRect.height - tooltipRect.height) / 2 +
        window.scrollY
      left = targetRect.right + offset + window.scrollX
    } else {
      top =
        targetRect.top +
        (targetRect.height - tooltipRect.height) / 2 +
        window.scrollY
      left = targetRect.left - tooltipRect.width - offset + window.scrollX
    }

    setPosition(pos)
    setStyle({
      position: "absolute",
      top: Math.round(top),
      left: Math.round(left),
      zIndex: 9999,
      pointerEvents: "none",
    })
  }, [visible, offset, prefer, content])

  //   useEffect(() => {
  //     return () => {
  //       if (tooltipNode) {
  //         document.body.removeChild(tooltipNode)
  //       }
  //     }
  //   }, [tooltipNode])

  return (
    <>
      <div
        ref={targetRef}
        className={className}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        tabIndex={0}
        style={{ display: "inline-block" }}
        id={"tooltip-id"}
      >
        {children}
      </div>
      {visible &&
        tooltipNode &&
        createPortal(
          <div
            ref={tooltipRef}
            className={`${styles.tooltip} ${styles[position]}`}
            style={style}
            role="tooltip"
          >
            {content}
          </div>,
          tooltipNode
        )}
    </>
  )
}
