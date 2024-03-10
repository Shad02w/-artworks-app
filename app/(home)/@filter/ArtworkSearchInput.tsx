"use client"

import { useRouter, usePathname } from "next/navigation"
import { useInfiniteArtworksQuery } from "@/lib/query"
import { SearchInput } from "@/components/SearchInput"

const SEARCH_KEY = "title"

interface Props {
    paramKey: string
    keyword?: string
}

export function ArtworkSearchInput({ keyword = "", paramKey }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const { isFetching, isFetchingNextPage } = useInfiniteArtworksQuery(paramKey)

    const updateSearchParam = (value: string) => {
        const params = new URLSearchParams(window.location.search)
        if (value.length > 0) {
            params.set(SEARCH_KEY, value)
        } else {
            params.delete(SEARCH_KEY)
        }
        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <SearchInput
            defaultValue={keyword}
            onSearch={updateSearchParam}
            placeholder="Search by artwork title"
            loading={isFetching && !isFetchingNextPage}
        />
    )
}
