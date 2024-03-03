"use client"

import { ErrorFallback } from "@/components/ErrorFallback"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    return <ErrorFallback error={error} message="Sorry, something went wrong when getting Artworks." reset={reset} />
}
