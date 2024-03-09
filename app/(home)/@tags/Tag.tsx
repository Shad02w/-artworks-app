"use client"

import type { Category } from "@/lib/api"
import { categoryFilterUtil } from "@/lib/catergoryFilterUtil"
import { X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

interface Props {
    category: Category
}
export function Tag({ category: { title, id, subtype } }: Props) {
    const readonlySearchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const handleTagRemove = () => {
        const searchParams = new URLSearchParams(readonlySearchParams.toString())
        categoryFilterUtil.removeFilter(searchParams, subtype, id)
        router.replace(`${pathname}?${searchParams.toString()}`)
    }

    return (
        <div className="flex w-auto flex-row text-ellipsis whitespace-nowrap rounded-full bg-black px-3 py-1 text-white ring-white">
            {title}
            <button onClick={handleTagRemove}>
                <X className="h-5" />
            </button>
        </div>
    )
}
