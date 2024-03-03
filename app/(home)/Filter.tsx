"use client"
import { Checkbox } from "@/components/Checkbox"
import { Input } from "@/components/Input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/Popover"
import { searchCategoryTerm, type Category, type CategorySubtype } from "@/lib/api"
import { catergoryFilterUtil } from "@/lib/catergoryFilterUtil"
import { useDebounce } from "@/lib/hooks"
import type { CheckedState } from "@radix-ui/react-checkbox"
import { Filter as FilterIcon } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { create } from "zustand"

const subtypes: CategorySubtype[] = ["classification", "material", "technique", "style", "subject", "department", "theme"]

type CategoryFilterMap = Partial<Record<CategorySubtype, string[]>>

interface FilterStore {
    categories: Category[]
    status: "loading" | "success" | "error"
    fetchCategories: (keyword?: string) => Promise<void>
}

const usefilterStore = create<FilterStore>(set => ({
    status: "success",
    categories: [],
    fetchCategories: async keyword => {
        set({ status: "loading" })
        const data = await searchCategoryTerm({ title: keyword })
        set({ categories: data.data, status: "success" })
    }
}))

export function Filter() {
    const [keyword, setKeyword] = useState("")
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const [filterMap, setFilterMap] = useState<CategoryFilterMap>({})

    const { categories, fetchCategories } = usefilterStore()
    const debouncedFetchCategories = useDebounce(fetchCategories, 300)

    useEffect(() => {
        fetchCategories()
    }, [fetchCategories, keyword])

    const handleKeywordChange = (value: string) => {
        setKeyword(value)
        debouncedFetchCategories(value)
    }

    const handleFilterChange = (category: Category, checkedState: CheckedState) => {
        const params = new URLSearchParams(searchParams.toString())

        if (checkedState) {
            catergoryFilterUtil.addFilter(params, category.subtype, category.id)
        } else {
            catergoryFilterUtil.removeFilter(params, category.subtype, category.id)
        }

        router.replace(`${pathname}?${params.toString()}`)
        console.log(checkedState)
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        const result: CategoryFilterMap = {}

        subtypes.forEach(subtype => {
            result[subtype] = params.get(subtype + "_id")?.split(",") ?? []
        })

        setFilterMap(result)
    }, [searchParams])

    return (
        <Popover>
            <PopoverTrigger>
                <FilterIcon />
            </PopoverTrigger>
            <PopoverContent>
                <div>
                    <h2 className="mb-3">Category Filter</h2>
                    <div>
                        <Input
                            value={keyword}
                            onChange={e => handleKeywordChange(e.currentTarget.value)}
                            placeholder="Search by category name"
                        />
                        <div className="mt-2 flex min-h-20 flex-col gap-2">
                            {categories.map(category => (
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
