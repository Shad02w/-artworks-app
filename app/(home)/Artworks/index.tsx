"use client"

import { fetchArtworks, type SearchArtworksResponse } from "@/lib/api"
import { Eye, Loader2 } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { EmptyPlaceholder } from "./EmptyPlaceholder"
import { ScrollList } from "./ScrollList"

interface Props {
    initial: SearchArtworksResponse
    title?: string
}

export function Artworks({ initial, title }: Props) {
    const { data, pagination } = initial
    const [page, setPage] = useState(pagination.current_page)
    const [status, setStatus] = useState<"loading" | "error" | "success">("success")
    const [artworks, setArtworks] = useState(data)

    const allLoaded = useMemo(() => page == pagination.total_pages, [page, pagination.total_pages])
    const statusRef = useRef(status)
    statusRef.current = status

    const handleNextPage = () => {
        if (allLoaded) return

        setStatus("loading")
        fetchArtworks(page + 1, title)
            .then(artworks => {
                const status = statusRef.current
                // if the status has changed, don't update the artworks,
                // it may happen when initial data changed
                if (status !== "loading") return
                setArtworks(_ => [..._, ...artworks.data])
                setStatus("success")
                setPage(_ => _ + 1)
            })
            .catch(() => setStatus("error"))
    }

    // everytime the initial data changes, update the artworks
    useEffect(() => {
        setArtworks(initial.data)
        setStatus("success")
        setPage(1)
    }, [initial])

    return (
        <div className="h-full">
            {artworks.length > 0 ? (
                <ScrollList
                    artworks={artworks}
                    // if the status is loading, don't call the next page
                    onNextPage={page == pagination.total_pages || status === "loading" ? undefined : handleNextPage}
                />
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
                {status === "loading" && (
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
