import { InfiniteScroller } from "@/components/InfiniteScroller"
import Link from "next/link"
import { Thumbnail } from "@/components/Thumbnail"
import { NoImage } from "@/components/NoImage"
import type { SearchArtworksResponse } from "@/lib/api"

interface Props {
    artworks: SearchArtworksResponse["data"]
    onNextPage?: () => void
}

export function ScrollList({ onNextPage, artworks }: Props) {
    return (
        <InfiniteScroller className="flex flex-col md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3" onNextPage={onNextPage}>
            {artworks.map(artwork => (
                <div key={artwork.id} className="relative mb-4 overflow-hidden rounded-2xl bg-black md:mb-0">
                    <Link className="block" href={`/artworks/${artwork.id}`} prefetch={false}>
                        <div className="relative h-80 w-full">
                            {artwork.image_id ? (
                                <Thumbnail
                                    imageId={artwork.image_id}
                                    alt={artwork.thumbnail?.alt_text ?? artwork.title}
                                    thumbnail={artwork.thumbnail}
                                />
                            ) : (
                                <NoImage />
                            )}
                        </div>
                        <div className="absolute bottom-0 w-full overflow-hidden text-ellipsis whitespace-nowrap bg-gray-600/40 p-4 text-xl text-white backdrop-blur-2xl">
                            {artwork.title}
                        </div>
                    </Link>
                </div>
            ))}
        </InfiniteScroller>
    )
}
