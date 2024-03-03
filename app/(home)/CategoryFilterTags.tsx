import { useMemo } from "react"
import { catergoryFilterUtil } from "@/lib/catergoryFilterUtil"
import { useSearchParams } from "next/navigation"

export function CategoryFilterTags() {
    const searchParams = useSearchParams()

    const catergoryfilterMap = useMemo(() => {
        return catergoryFilterUtil.getfilterMap(searchParams)
    }, [searchParams])
    return <div>hi</div>
}
