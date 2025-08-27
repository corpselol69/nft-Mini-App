import { api } from "@/api/api"
import type {
  MarketCollectionRead,
  MarketQueryParams,
  MarketCollectionItemsRead,
} from "@/types/market"

const endpoint = "/market/collections"

type CollectionItemsByModelParams = MarketQueryParams & {
  model_id: string
}

export const marketApi = api.injectEndpoints({
  endpoints: builder => ({
    // Список коллекций
    getMarketList: builder.query<
      MarketCollectionRead[],
      MarketQueryParams | void
    >({
      query: _params => ({
        url: `${endpoint}`,
        method: "GET",
        // params: {
        //   offset: 0,
        //   limit: 50,
        //   sort: "newest",
        //   ...params,
        // },
      }),
    }),

    getCollectionItemsByModelId: builder.query<
      MarketCollectionItemsRead,
      CollectionItemsByModelParams
    >({
      query: ({ model_id, ...params }) => ({
        url: `${endpoint}/${model_id}/listings`,
        method: "GET",
        params: {
          offset: 0,
          limit: 50,
          sort: "newest",
          only_exportable: false,
          only_transferable: false,
          ...params,
        },
      }),
      providesTags: ["Market"],
    }),
  }),
  // если нужны хуки в других файлах включить overrideExisting: false
})

export const {
  useGetMarketListQuery,
  useLazyGetMarketListQuery,
  useGetCollectionItemsByModelIdQuery,
  useLazyGetCollectionItemsByModelIdQuery,
} = marketApi
