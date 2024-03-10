import { CategoryFilter } from "./CategoryFilter"
import { ArtworkSearchInput } from "./ArtworkSearchInput"

export default function Page({ searchParams }: { searchParams: any }) {
    const paramKey = new URLSearchParams(searchParams).toString()
    return (
        <div className="flex flex-row gap-2">
            <ArtworkSearchInput keyword={searchParams?.title} paramKey={paramKey} />
            <CategoryFilter paramKey={paramKey} />
        </div>
    )
}
