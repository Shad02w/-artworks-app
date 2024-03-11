"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/cn"
import { usePathname, useSearchParams } from "next/navigation"

export function Progress() {
    const [show, setShow] = useState(false)
    const searchParams = useSearchParams()
    const pathname = usePathname()

    useEffect(() => {
        setShow(false)
    }, [searchParams, pathname])

    useEffect(() => {
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target
            if (!target || !(target instanceof HTMLElement)) return
            const anchor = target.closest("a")
            if (!anchor) return
            setShow(true)
        }

        document.addEventListener("click", handleAnchorClick)
        return () => document.removeEventListener("click", handleAnchorClick)
    }, [])

    return (
        <div className={cn("fixed top-0 z-50 w-full", { hidden: !show })}>
            <div className="h-1.5 w-full overflow-hidden bg-purple-100">
                <div className="animate-progress origin-left-right h-full w-full bg-purple-500"></div>
            </div>
        </div>
    )
}
