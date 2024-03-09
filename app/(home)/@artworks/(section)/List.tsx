"use client"

import Link from "next/link"
import { InfiniteScroller } from "@/components/InfiniteScroller"
import { NoImage } from "@/components/NoImage"
import { Thumbnail } from "@/components/Thumbnail"
import { EmptyPlaceholder } from "./EmptyPlaceholder"
import { Eye, Loader2 } from "lucide-react"
import { useInfiniteArtworksQuery } from "@/lib/query"

interface Props {
    paramKey: string
}

export function List({ paramKey }: Props) {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage, isError } = useInfiniteArtworksQuery(paramKey)

    if (data === undefined) {
        return (
            <div className="flex flex-row items-center justify-center">
                <Loader2 className="mr-2 h-5 animate-spin" /> Loading artworks...
            </div>
        )
    }

    const artworks = data.pages.flatMap(_ => _.data)

    return artworks.length > 0 ? (
        <InfiniteScroller onNextPage={hasNextPage ? fetchNextPage : undefined}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {artworks.map(artwork => (
                    <div
                        key={artwork.id}
                        className="relative mb-4 overflow-hidden rounded-2xl bg-black transition-transform duration-300 hover:scale-105 md:mb-0"
                    >
                        <Link className="block h-full" href={`/artworks/${artwork.id}`} prefetch={false}>
                            <div className="relative h-80 w-full overflow-hidden">
                                {artwork.image_id ? (
                                    <Thumbnail
                                        imageId={artwork.image_id}
                                        alt={artwork.thumbnail?.alt_text ?? artwork.title}
                                        thumbnail={artwork.thumbnail}
                                        sizes="200px"
                                    />
                                ) : (
                                    <NoImage />
                                )}
                            </div>
                            <div className="item-center full flex h-full bg-gray-200 p-4">{artwork.title}</div>
                        </Link>
                    </div>
                ))}
            </div>
            <div className="mt-6 flex items-center justify-center">
                {isError && (
                    <div className="flex flex-row">
                        <span className="mr-1 text-red-600">Failed to load more artworks,</span>
                        <span className="underline" onClick={() => (window.location.href = "/")}>
                            {" "}
                            retry
                        </span>
                    </div>
                )}
                {isFetchingNextPage && (
                    <div className="flex flex-row items-center">
                        <Loader2 className="mr-2 h-5 animate-spin" /> Loading more artworks...
                    </div>
                )}
                {!hasNextPage && (
                    <div className="flex flex-row items-center">
                        <Eye className="mr-2 h-5" />
                        You have seems all the artworks
                    </div>
                )}
            </div>
        </InfiniteScroller>
    ) : (
        <EmptyPlaceholder />
    )
}
