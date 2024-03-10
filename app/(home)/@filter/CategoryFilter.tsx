"use client"

import { Checkbox } from "@/components/Checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"
import { SearchInput } from "@/components/SearchInput"
import { searchCategoryTerm, type Category } from "@/lib/api"
import { categoryFilterUtil, type CategoryFilterMap } from "@/lib/catergoryFilterUtil"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { Filter as FilterIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import type { CheckedState } from "@radix-ui/react-checkbox"

interface Props {
    paramKey: string
}

export function CategoryFilter({ paramKey }: Props) {
    const [keyword, setKeyword] = useState("")
    const router = useRouter()
    const pathname = usePathname()

    const searchParams = useMemo(() => new URLSearchParams(paramKey), [paramKey])
    const [filterMap, setFilterMap] = useState<CategoryFilterMap>(categoryFilterUtil.getfilterMap(searchParams))
    const { data, isFetching } = useQuery({
        queryKey: ["categories", keyword],
        queryFn: () => searchCategoryTerm({ title: keyword }),
        placeholderData: keepPreviousData
    })

    const handleFilterChange = (category: Category, checkedState: CheckedState) => {
        const params = new URLSearchParams(searchParams)

        if (checkedState) {
            categoryFilterUtil.addFilter(params, category.subtype, category.id)
        } else {
            categoryFilterUtil.removeFilter(params, category.subtype, category.id)
        }

        setFilterMap(categoryFilterUtil.getfilterMap(params))
        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <Popover>
            <PopoverTrigger>
                <FilterIcon />
            </PopoverTrigger>
            <PopoverContent>
                <div>
                    <h2 className="mb-3">Category Filter</h2>
                    <div>
                        <SearchInput
                            className="mb-2 h-9 border bg-transparent"
                            defaultValue={keyword}
                            onSearch={setKeyword}
                            placeholder="Search by category name"
                            loading={isFetching}
                        />
                        <div className="mt-2 flex min-h-20 flex-col gap-2">
                            {data &&
                                data.data.map(category => (
                                    <div className="flex flex-row gap-2" key={category.id}>
                                        <Checkbox
                                            id={category.subtype + category.id}
                                            checked={filterMap[category.subtype]?.includes(category.id) ?? false}
                                            onCheckedChange={checked => handleFilterChange(category, checked)}
                                        />
                                        <label
                                            htmlFor={category.subtype + category.id}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {category.title}
                                        </label>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
