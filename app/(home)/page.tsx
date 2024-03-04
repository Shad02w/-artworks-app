import { Suspense } from "react"
import { Artworks } from "./Artworks"

export default async function Home({ searchParams }: { searchParams: any }) {
    return (
        <Suspense>
            <Artworks />
        </Suspense>
    )
}
