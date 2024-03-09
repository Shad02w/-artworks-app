"use client"

import { useDebounce } from "@/lib/hooks"
import { cn } from "@/lib/cn"
import { useRouter, usePathname } from "next/navigation"
import { useState } from "react"
import { useInfiniteArtworksQuery } from "@/lib/query"
import { Loader2 } from "lucide-react"

const SEARCH_KEY = "title"

interface Props {
    paramKey: string
    keyword?: string
    className?: string
}

export function SearchInput({ className, keyword = "", paramKey }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const [value, setValue] = useState(keyword)
    const { isFetching, isFetchingNextPage } = useInfiniteArtworksQuery(paramKey)

    const updateSearchParam = useDebounce((value: string) => {
        const params = new URLSearchParams(window.location.search)
        if (value.length > 0) {
            params.set(SEARCH_KEY, value)
        } else {
            params.delete(SEARCH_KEY)
        }
        router.replace(`${pathname}?${params.toString()}`)
        router.refresh()
    }, 300)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateSearchParam(e.target.value)
    }

    return (
        <div className="relative w-full">
            <input
                className={cn(
                    "bg-red border-border h-12 w-full rounded-md bg-gray-100 p-2 outline-none focus-visible:ring focus-visible:ring-black/20 focus-visible:ring-offset-2 lg:w-[300px]",
                    className
                )}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Search by artwork title"
            />
            {isFetching && !isFetchingNextPage && (
                <div className="absolute right-0 top-0 flex h-full items-center p-2">
                    <Loader2 className="animate-spin stroke-gray-300" />
                </div>
            )}
        </div>
    )
}
