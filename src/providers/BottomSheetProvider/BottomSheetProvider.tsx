// BottomSheetProvider.tsx
import React, { createContext, useContext, useState, useCallback } from "react"
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
      }
      setStack(prev => [...prev, entry])
    },
    []
  )

  const closeSheet = useCallback(() => {
    setStack(prev => prev.slice(0, -1))
  }, [])

  const closeAll = useCallback(() => setStack([]), [])

  return (
    <BottomSheetContext.Provider value={{ openSheet, closeSheet, closeAll }}>
      {children}
      {stack.map((sheet, idx) => (
        <BottomSheet
          key={sheet.key}
          open={idx === stack.length - 1}
          onClose={() => {
            sheet.onClose?.()
            closeAll()
          }}
          title={sheet.bottomSheetTitle}
          leftButton={sheet.leftButton}
          buttons={sheet.buttons}
        >
          {sheet.content}
        </BottomSheet>
      ))}
    </BottomSheetContext.Provider>
  )
}
