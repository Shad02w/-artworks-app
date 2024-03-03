"use client"

import Image from "next/image"
import { useState } from "react"
import type { Thumbnail } from "@/lib/api"
import { PhotoProvider, PhotoView } from "react-photo-view"

export interface Props {
    imageId: string
    alt: string
    thumbnail: Thumbnail | null
    enablePreview?: boolean
}

export function Thumbnail({ imageId, alt, thumbnail, enablePreview = false }: Props) {
    const [loaded, setLoaded] = useState(false)

    const src = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`
    const image = (
        <Image
            className="object-cover"
            fill
            priority
            onLoad={() => setLoaded(true)}
            sizes="(max-width: 640px) 100vw, 640px"
            src={`https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`}
            alt={alt}
        />
    )
    return (
        <div className="relative h-full w-full">
            {enablePreview ? (
                <PhotoProvider>
                    <PhotoView src={src}>{image}</PhotoView>
                </PhotoProvider>
            ) : (
                image
            )}
            {thumbnail?.lqip && !loaded && (
                // eslint-disable-next-line @next/next/no-img-element -- for image optimization
                <img src={thumbnail?.lqip} className=" absolute left-0 top-0 h-full w-full" alt={thumbnail.alt_text ?? "thumbnail"} />
            )}
        </div>
    )
}
