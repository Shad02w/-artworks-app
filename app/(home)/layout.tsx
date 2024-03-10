export default function layout({ tags, filter, artworks }: { tags: React.ReactNode; filter: React.ReactNode; artworks: React.ReactNode }) {
    return (
        <div className="ml-auto mr-auto lg:w-[70%]">
            <header className="sticky top-0 z-30 w-full bg-white pb-1 pt-6">
                <div className="px-4 lg:flex lg:flex-row lg:items-center lg:justify-between">
                    <h1 className="mb-3 text-xl font-semibold lg:mb-0 lg:items-center lg:text-2xl lg:font-bold">Discover the artworks</h1>
                    {filter}
                </div>
                <div className="mt-3">{tags}</div>
            </header>
            <main className="relative w-full px-4 py-2">{artworks}</main>
        </div>
    )
}
