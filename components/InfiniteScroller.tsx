import { useEffect, useRef } from "react"
import { tw } from "@/lib/tw"

interface Props {
    children: React.ReactNode
    className?: string
    onNextPage?: () => void
}

export function InfiniteScroller({ className, onNextPage, children }: Props) {
    const ref = useRef<HTMLDivElement | null>(null)
    const onNexPageRef = useRef(onNextPage)

    onNexPageRef.current = onNextPage

    useEffect(() => {
        const marker = ref.current
        if (marker) {
            const observer = new IntersectionObserver(entries => {
                if (!entries[0].isIntersecting) return
                onNexPageRef.current?.()
            })
            observer.observe(marker)
            return () => observer.disconnect()
        }
    }, [])

    return (
        <div className={tw("relative", className)}>
            {children}
            <div ref={ref} className="absolute bottom-[300px] h-[1px] w-full"></div>
        </div>
    )
}
