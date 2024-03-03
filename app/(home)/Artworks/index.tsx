"use client"

import { Eye, Loader2 } from "lucide-react"
import { useEffect, useMemo } from "react"
import { EmptyPlaceholder } from "./EmptyPlaceholder"
import { ScrollList } from "./ScrollList"
import { useArtworkListStore } from "./store"
import type { SearchArtworksResponse } from "@/lib/api"

interface Props {
    initial: SearchArtworksResponse
    title?: string
}

export function Artworks({ title }: Props) {
    const { artworks, page, status, pagination, fetchNextPage, refresh } = useArtworkListStore()

    const allLoaded = useMemo(() => pagination?.total_pages === page, [pagination, page])

    useEffect(() => {
        refresh(title)
    }, [refresh, title])

    return (
        <div className="h-full">
            {pagination === null ? (
                <div className="mt-5 flex items-center justify-center p-1">
                    <Loader2 className="mr-2 h-5 animate-spin" /> Loading artworks...
                </div>
            ) : artworks.length > 0 ? (
                <ScrollList artworks={artworks} onNextPage={allLoaded || status === "loading" ? undefined : fetchNextPage} />
            ) : (
                <EmptyPlaceholder />
            )}
            <div className="flex items-center justify-center p-1">
                {status === "error" && (
                    <div className="flex flex-row">
                        <span className="mr-1 text-red-600">Failed to load more artworks,</span>
                        <span className="underline" onClick={() => (window.location.href = "/")}>
                            {" "}
                            retry
                        </span>
                    </div>
                )}
                {status === "loading" && artworks.length !== 0 && (
                    <div className="flex flex-row items-center">
                        <Loader2 className="mr-2 h-5 animate-spin" /> Loading more artworks...
                    </div>
                )}
                {allLoaded && (
                    <div className="flex flex-row items-center">
                        <Eye className="mr-2 h-5" />
                        You have seems all the artworks
                    </div>
                )}
            </div>
        </div>
    )
}
