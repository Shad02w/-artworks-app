import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query"
import { categoryFilterUtil } from "./catergoryFilterUtil"
import { fetchArtworks } from "./api"

export function useInfiniteArtworksQuery(paramKey: string) {
    return useInfiniteQuery({
        queryKey: ["artworks", paramKey],
        queryFn: ({ pageParam }) => {
            const params = new URLSearchParams(window.location.search)
            const filterMap = categoryFilterUtil.getfilterMap(params)
            return fetchArtworks({ title: params.get("title") ?? undefined, categoryTerms: filterMap, page: pageParam })
        },
        initialPageParam: 1,
        getNextPageParam: ({ pagination: { current_page, total_pages } }) => {
            return current_page < total_pages ? current_page + 1 : null
        },
        placeholderData: keepPreviousData
    })
}
