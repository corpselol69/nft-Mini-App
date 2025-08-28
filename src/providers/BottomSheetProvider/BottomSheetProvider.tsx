// BottomSheetProvider.tsx
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react"
import type { SheetEntry } from "./BottomSheetProvider.types"
import { BottomSheet } from "@/components/common/BottomSheet/BottomSheet"

type BottomSheetContextType = {
  openSheet: (
    content: React.ReactNode,
    opts?: {
      bottomSheetTitle?: string
      leftButton?: React.ReactNode
      key?: string
      buttons?: React.ReactNode
      onClose?: () => void
    }
  ) => void
  closeSheet: () => void
  closeAll: () => void
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
)

export const useBottomSheet = () => {
  const ctx = useContext(BottomSheetContext)
  if (!ctx)
    throw new Error("useBottomSheet must be used within BottomSheetProvider")
  return ctx
}

export const BottomSheetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stack, setStack] = useState<SheetEntry[]>([])
  const clearingAllRef = useRef(false)

  const openSheet = useCallback(
    (
      content: React.ReactNode,
      opts?: {
        bottomSheetTitle?: string
        leftButton?: React.ReactNode
        key?: string
        buttons?: React.ReactNode
        onClose?: () => void
      }
    ) => {
      const entry: SheetEntry = {
        key: opts?.key ?? Math.random().toString(36),
        content,
        bottomSheetTitle: opts?.bottomSheetTitle,
        leftButton: opts?.leftButton,
        buttons: opts?.buttons,
        onClose: opts?.onClose,
        closing: false,
      }
      setStack(prev => [...prev, entry])
    },
    []
  )

  const closeSheet = useCallback(() => {
    setStack(prev => {
      if (prev.length === 0) return prev
      const next = [...prev]
      const last = next[next.length - 1]
      if (last?.closing) return prev
      next[next.length - 1] = { ...last, closing: true }
      return next
    })
  }, [])

  const closeAll = useCallback(() => {
    clearingAllRef.current = true
    setStack(prev => {
      if (prev.length === 0) return prev
      const next = [...prev]
      const last = next[next.length - 1]
      next[next.length - 1] = { ...last, closing: true }
      return next
    })
  }, [])

  return (
    <BottomSheetContext.Provider value={{ openSheet, closeSheet, closeAll }}>
      {children}
      {stack.map((sheet, idx) => (
        <BottomSheet
          key={sheet.key}
          open={idx === stack.length - 1}
          onClose={() => {
            // вызывается ПОСЛЕ завершения анимации внутри BottomSheet
            sheet.onClose?.()
            setStack(prev => {
              const i = prev.findIndex(s => s.key === sheet.key)
              if (i === -1) return prev
              if (clearingAllRef.current) {
                // вариант 1А: после закрытия верхнего — очистить весь стек
                return []
              }
              const next = [...prev]
              next.splice(i, 1)
              return next
            })
            if (clearingAllRef.current) {
              clearingAllRef.current = false
            }
          }}
          title={sheet.bottomSheetTitle}
          leftButton={sheet.leftButton}
          buttons={sheet.buttons}
          doCloseAnimation={!!sheet.closing}
        >
          {sheet.content}
        </BottomSheet>
      ))}
    </BottomSheetContext.Provider>
  )
}
