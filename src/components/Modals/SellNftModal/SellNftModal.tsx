import { FC, useMemo, useState } from "react"

import styles from "./SellNftModal.module.scss"

import { NFTCardSmall } from "@/components/common/NFTCardSmall/NFTCardSmall"
import { Button } from "@/components/common/Button/Button"
import { AddNftsBottomSheet } from "../AddNftsBottomSheet/AddNftsBottomSheet"
import { t } from "i18next"
import { useBottomSheet } from "@/providers/BottomSheetProvider/BottomSheetProvider"
import { useGetMyGiftsQuery } from "@/api/endpoints/gifts"
import { useCreateListingMutation } from "@/api/endpoints/listings"
import { ErrorBottomSheet } from "../ErrorBottomSheet/ErrorBottomSheet"
import { SuccessBottomSheet } from "../SuccessBottomSheet/SuccessBottomSheet"
import { NftPreview } from "@/components/common/NftPreview/NftPreview"

type Nft = {
  id: string
  title: string
  number: string
  price: number
  preview: string
  background: string
}
type Props = {
  nfts: Nft[]
  onSuccess?: () => void
}

export const SellNftModal: FC<Props> = ({ nfts, onSuccess }) => {
  const { openSheet, closeAll } = useBottomSheet()
  const { data: myGifts } = useGetMyGiftsQuery()
  const [createListing, { isLoading: isCreating }] = useCreateListingMutation()

  const [selectedIds, setSelectedIds] = useState<string[]>(nfts.map(n => n.id))

  const [pricesById, setPricesById] = useState<Record<string, number>>(
    Object.fromEntries(nfts.map(n => [n.id, n.price ?? 0]))
  )

  const selectedGifts: Array<Nft | undefined> = useMemo(() => {
    if (!selectedIds.length) return []
    const byId = new Map((myGifts ?? []).map(g => [String(g.id), g]))

    return selectedIds.map(id => {
      const g = byId.get(id)
      if (!g) return undefined
      return {
        id: String(g.id),
        title: g.model?.title ?? "",
        number: g.number ? String(g.number) : "",
        price: pricesById[id] ?? 0,
        preview: g.preview_url ?? "",
        background: g.background_url ?? "",
      }
    })
  }, [myGifts, selectedIds])

  const handleRemove = (id: string) => {
    setSelectedIds(prev => prev.filter(x => x !== id))
    setPricesById(prev => {
      const c = { ...prev }
      delete c[id]
      return c
    })
  }

  // 5) изменить цену
  const handlePriceChange = (id: string, next: number) => {
    setPricesById(prev => ({ ...prev, [id]: next }))
  }

  const handleAddClick = () => {
    openSheet(
      <AddNftsBottomSheet
        initiallySelected={Object.freeze([...selectedIds]) as string[]}
        onConfirm={ids => {
          const next = Array.from(new Set(ids.map(String))) // нормализация + uniq
          setSelectedIds(next)

          setPricesById(prev => {
            const next = { ...prev }
            ids.forEach(id => {
              if (next[id] == null) next[id] = 0
            })
            Object.keys(next).forEach(id => {
              if (!ids.includes(id)) delete next[id]
            })
            return next
          })
        }}
      />,
      {
        bottomSheetTitle: t("adding_nfts"),
      }
    )
  }

  const invalid = useMemo(() => {
    if (!selectedIds.length) return "empty"
    for (const id of selectedIds) {
      const price = pricesById[id]
      if (!(price > 0)) return "price"
    }
    return null
  }, [selectedIds, pricesById])

  const handleSubmit = async () => {
    if (invalid) return

    const payloads = selectedIds.map(id => ({
      gift_id: id,
      price: pricesById[id],
    }))

    try {
      // заменить на Promise.allSettled
      let ok = 0
      for (const p of payloads) {
        await createListing(p).unwrap()
        ok++
      }

      openSheet(
        <SuccessBottomSheet
          title={t(
            "listing_success_title",
            "NFT успешно выставлены на продажу"
          )}
          actionButtons={[
            <Button
              type="primary"
              size="large"
              onClick={() => {
                closeAll()
                onSuccess?.()
              }}
            >
              {t("done", "Готово")}
            </Button>,
          ]}
        />,
        { bottomSheetTitle: t("success", "Успех") }
      )
    } catch (e) {
      console.error("Ошибка создания листинга", e)
      openSheet(
        <ErrorBottomSheet
          errorTitle={t("listing_error_title", "Ошибка при выставлении")}
          errorText={t(
            "listing_error_desc",
            "Не удалось создать объявление. Проверьте цены и попробуйте снова."
          )}
        />,
        { bottomSheetTitle: t("error", "Ошибка") }
      )
    }
  }

  return (
    <div className={styles.container}>
      {selectedGifts
        .filter((nft): nft is Nft => nft !== undefined)
        .map(nft => (
          <NFTCardSmall
            key={nft.id}
            variant="list"
            preview={
              <NftPreview
                background_url={nft.background}
                preview_url={nft.preview}
              />
            }
            title={nft.title}
            subtitle={nft.number ? `#${nft.number}` : ""}
            price={pricesById[nft.id] ?? 0}
            editablePrice
            onPriceChange={val => handlePriceChange(nft.id, val)}
            deletable
            onRemove={() => handleRemove(nft.id)}
          />
        ))}

      <Button type="text" onClick={handleAddClick}>
        Добавить NFT
      </Button>

      <Button
        type="primary"
        size="large"
        onClick={handleSubmit}
        disabled={!!invalid || isCreating}
      >
        {t("put_on_sale", "Выставить на продажу")}
      </Button>
    </div>
  )
}
