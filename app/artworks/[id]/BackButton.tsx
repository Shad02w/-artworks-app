"use client"

import { tw } from "@/lib/tw"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface Props {
    className?: string
}

export function BackButton({ className }: Props) {
    const { back } = useRouter()

    return (
        <button className={tw("flex flex-row items-center rounded-xl bg-black p-2 text-white", className)} onClick={back}>
            <ArrowLeft className="mr-1 h-4" />
            back to artworks
        </button>
    )
}
