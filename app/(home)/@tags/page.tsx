import { batchFetchCategories, type Category, type CategorySubtype } from "@/lib/api"
import { categoryFilterUtil } from "@/lib/catergoryFilterUtil"
import { Suspense } from "react"
import { Tag } from "./Tag"

export default async function Tags({ searchParams }: { searchParams: any }) {
    const filters = categoryFilterUtil.getfilterMap(new URLSearchParams(searchParams))

    const filterTags: { subtype: CategorySubtype; id: string }[] = []

    for (const [subtype, value] of Object.entries(filters)) {
        for (const id of value) {
            filterTags.push({ subtype: subtype as CategorySubtype, id })
        }
    }

    const ids = filterTags.map(tag => tag.id)
    const { data } = await batchFetchCategories(ids)
    const details = data.reduce((pre, curr) => ({ ...pre, [curr.id]: curr }), {} as Record<string, Category>)

    return (
        <div className="mr-2 flex w-full flex-row overflow-y-auto py-2 *:ml-3">
            {filterTags.map(tag => (
                <Suspense key={tag.id}>
                    <Tag category={details[tag.id] as Category} />
                </Suspense>
            ))}
        </div>
    )
}
