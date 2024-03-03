import { Suspense } from "react"
import { Artworks } from "./Artworks"

export default async function Home() {
    return (
        <Suspense>
            <Artworks />
        </Suspense>
    )
}
