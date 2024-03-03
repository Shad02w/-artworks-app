import { SearchX } from "lucide-react"

export function EmptyPlaceholder() {
    return (
        <div className="flex flex-col items-center">
            <SearchX className="mt-20 h-[120px] w-[120px]" />
            <h1 className="mt-5 text-xl font-medium">No Artworks found</h1>
        </div>
    )
}
