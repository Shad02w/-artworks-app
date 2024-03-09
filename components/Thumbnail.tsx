"use client"

import Image, { type ImageProps } from "next/image"
import type { Thumbnail } from "@/lib/api"
import { PhotoProvider, PhotoView } from "react-photo-view"

export interface Props {
    imageId: string
    alt: string
    thumbnail: Thumbnail | null
    enablePreview?: boolean
    sizes: string
}

export function Thumbnail({ imageId, alt, thumbnail, enablePreview = false, sizes }: Props) {
    const src = `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`
    const placeholder = thumbnail?.lqip as ImageProps["placeholder"] | undefined

    const width = thumbnail?.width && thumbnail?.width < 843 ? thumbnail.width : 843

    const image = (
        <Image
            className="object-cover object-top"
            fill
            placeholder={placeholder}
            sizes={sizes}
            src={`https://www.artic.edu/iiif/2/${imageId}/full/${width},/0/default.jpg`}
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
        </div>
    )
}
