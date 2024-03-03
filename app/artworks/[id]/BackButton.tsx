"use client"

import { cn } from "@/lib/cn"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
    className?: string
}

export function BackButton({ className }: Props) {
    const { back } = useRouter()

    return (
        <button className={cn("flex flex-row items-center rounded-xl bg-black p-2 text-white", className)} onClick={back}>
            <ArrowLeft className="mr-1 h-4" />
            back to artworks
        </button>
    )
}
