import { Suspense } from "react"
import { SearchInput } from "./SearchInput"
import { CategorySelect } from "./CategorySelect"

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="ml-auto mr-auto lg:w-[70%]">
            <header className="sticky top-0 z-10 w-full bg-white px-4 pb-1 pt-6 lg:flex lg:flex-row lg:items-center lg:justify-between lg:pb-6">
                <h1 className="mb-3 text-xl font-semibold lg:mb-0 lg:items-center lg:text-2xl lg:font-bold">Discover the artworks</h1>
                <Suspense>
                    <SearchInput className="lg:w-[370px]" />
                </Suspense>
                <div className="mt-3 flex flex-row text-black">
                    <span className="hidden lg:flex">Category: </span>
                    <Suspense fallback="loading...">
                        <CategorySelect className="font-semibold" />
                    </Suspense>
                </div>
            </header>
            <main className="w-full px-4 py-2">{children}</main>
        </div>
    )
}
