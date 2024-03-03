import { Artworks } from "./Artworks"
import { fetchArtworks } from "@/lib/api"

/**
 * The requirements
 * 1. artworks page
 * 2. artworks detail page, show: title, artist_display, date_display, main_reference_number, thumbnail, dimensions
 * 3. Able to search by title, filtered by category
 * 4. create a comment form to demonstrate data validation
 * 5. document design decisions
 */
export default async function Home({ searchParams: { title, category } }: { searchParams: { title: string; category: string } }) {
    const artworks = await fetchArtworks(1, title)

    return <Artworks initial={artworks} title={title} />
}
