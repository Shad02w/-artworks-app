import { Thumbnail } from "@/components/Thumbnail"
import { fetchArtwork } from "@/lib/api"
import { BackButton } from "./BackButton"
import { Comment } from "./Comment"
import { NoImage } from "@/components/NoImage"

export default async function Artwork({ params: { id } }: { params: { id: string } }) {
    const { data } = await fetchArtwork(id)
    return (
        <main className="ml-auto mr-auto lg:grid lg:h-[100vh] lg:w-[100%] lg:grid-cols-3 lg:gap-5">
            <div className="relative h-[40vh] lg:col-span-2 lg:flex lg:h-auto lg:w-full lg:items-center lg:justify-center">
                <div className="relative h-full w-full">
                    {data.image_id ? (
                        <Thumbnail
                            imageId={data.image_id}
                            alt={data.thumbnail?.alt_text ?? data.title}
                            thumbnail={data.thumbnail}
                            enablePreview
                            sizes="100vw"
                        />
                    ) : (
                        <NoImage />
                    )}
                </div>
            </div>
            <div className="w-full p-4 lg:mt-4">
                <BackButton className="hidden lg:mb-4 lg:flex" />
                <h1 className="w-full text-2xl font-bold">{data.title}</h1>
                <p className="mb-4 text-zinc-400">by {data.artist_display}</p>
                <div className="mb-5 flex flex-col gap-1">
                    {data.date_display && (
                        <p>
                            <span className="font-semibold">Date: </span>
                            {data.date_display}
                        </p>
                    )}
                    {data.main_reference_number && (
                        <p>
                            <span className="font-semibold">Reference Number: </span>
                            {data.main_reference_number}
                        </p>
                    )}
                    {data.dimensions && (
                        <p>
                            <span className="font-semibold">Dimensions: </span>
                            {data.dimensions}
                        </p>
                    )}
                </div>
                <BackButton className="lg:hidden" />
                <hr className="my-10 h-0.5 border-t-0 bg-neutral-300 opacity-100 dark:opacity-50" />
                <Comment />
            </div>
        </main>
    )
}
