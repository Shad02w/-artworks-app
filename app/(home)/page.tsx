import { Suspense } from "react"
import { Artworks } from "./Artworks"

/**
 * The requirements
 * 1. artworks page
 * 2. artworks detail page, show: title, artist_display, date_display, main_reference_number, thumbnail, dimensions
 * 3. Able to search by title, filtered by category
 * 4. create a comment form to demonstrate data validation
 * 5. document design decisions
 */
export default async function Home() {
    return (
        <Suspense>
            <Artworks />
        </Suspense>
    )
}
