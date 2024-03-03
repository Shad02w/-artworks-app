import { useEffect } from "react"

interface Props {
    error: Error & { digest?: string }
    message: string
    reset: () => void
}
export function ErrorFallback({ error, message, reset }: Props) {
    useEffect(() => {
        // Log the error to sentry in production
        console.error(error)
    }, [error])

    return (
        <div>
            <div className="flex h-full flex-col items-center">
                <p className="mb-5 mt-[30%] text-center font-semibold">{message}</p>
                <button onClick={reset}>Reload</button>
            </div>
        </div>
    )
}
