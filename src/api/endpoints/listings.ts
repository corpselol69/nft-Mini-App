import { api } from "@/api/api"
import type { ListingCreate, ListingUpdate, ListingRead } from "@/types/listing"

const endpoint = "/listings"

export const listingsApi = api.injectEndpoints({
  endpoints: builder => ({
    // POST /listings/ — создать листинг
    createListing: builder.mutation<ListingRead, ListingCreate>({
      query: payload => ({
        url: `${endpoint}/`,
        method: "POST",
        data: payload,
      }),
    }),

    // GET /listings/me — мои листинги
    getMyListings: builder.query<ListingRead[], void>({
      query: () => ({
        url: `${endpoint}/me`,
        method: "GET",
      }),
    }),

    // GET /listings/{listing_id} — получить листинг
    getListingById: builder.query<ListingRead, string>({
      query: listingId => ({
        url: `${endpoint}/${listingId}`,
        method: "GET",
      }),
    }),

    // GET /listings/gift/{giftId} — получить листинг
    getListingByGiftId: builder.query<ListingRead, string>({
      query: giftId => ({
        url: `${endpoint}/gift/${giftId}`,
        method: "GET",
      }),
    }),

    // PATCH /listings/{listing_id} — обновить (цену)
    updateListing: builder.mutation<
      ListingRead,
      { listingId: string; data: ListingUpdate }
    >({
      query: ({ listingId, data }) => ({
        url: `${endpoint}/${listingId}`,
        method: "PATCH",
        data,
      }),
    }),

    // DELETE /listings/{listing_id} — отменить листинг
    cancelListing: builder.mutation<ListingRead, string>({
      query: listingId => ({
        url: `${endpoint}/${listingId}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useCreateListingMutation,
  useGetMyListingsQuery,
  useLazyGetMyListingsQuery,
  useGetListingByIdQuery,
  useLazyGetListingByIdQuery,
  useGetListingByGiftIdQuery,
  useLazyGetListingByGiftIdQuery,
  useUpdateListingMutation,
  useCancelListingMutation,
} = listingsApi
