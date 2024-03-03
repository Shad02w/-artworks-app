"use client"

import { useDebounce } from "@/lib/hooks"
import { cn } from "@/lib/cn"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useState } from "react"

const SEARCH_KEY = "title"

interface Props {
    className?: string
}

export function SearchInput({ className }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const [value, setValue] = useState(searchParams.get(SEARCH_KEY) ?? "")

    const updateSearchParam = useDebounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value.length > 0) {
            params.set(SEARCH_KEY, value)
        } else {
            params.delete(SEARCH_KEY)
        }
        router.replace(`${pathname}?${params.toString()}`)
    }, 300)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
        updateSearchParam(e.target.value)
    }

    return (
        <input
            className={cn("h-12 w-full rounded-md bg-gray-100 p-2 outline-none", className)}
            type="text"
            value={value}
            onChange={handleChange}
            placeholder="Search by artwork title"
        />
    )
}
