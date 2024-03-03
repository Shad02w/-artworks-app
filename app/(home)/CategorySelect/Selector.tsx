"use client"

import { Select } from "@/components/Select"
import type { GetAllCategoryResponse } from "@/lib/api"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useMemo, useState } from "react"

const SEARCH_KEY = "category"

interface Props {
    categories: GetAllCategoryResponse["data"]
    className?: string
}

export function Selector({ className, categories }: Props) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const [value, setValue] = useState(searchParams.get(SEARCH_KEY) ?? "all")

    const options = useMemo(() => [{ id: "all", value: "All" }, ...categories.map(_ => ({ id: _.id, value: _.title }))], [categories])

    const updateSearchParam = (value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value !== "all") {
            params.set(SEARCH_KEY, value)
        } else {
            params.delete(SEARCH_KEY)
        }
        router.replace(`${pathname}?${params.toString()}`)
    }

    const handleChange = (value: string) => {
        setValue(value)
        updateSearchParam(value)
    }

    return <Select className={className} value={value} onChange={handleChange} options={options} />
}
