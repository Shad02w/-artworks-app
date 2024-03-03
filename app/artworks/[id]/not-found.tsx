import Link from "next/link"

export default function NotFound() {
    return (
        <main>
            <div className="flex h-full flex-col items-center">
                <p className="mb-5 mt-[20%] text-center text-2xl font-semibold">Artwork not found</p>
                <Link href="/">Back to Home</Link>
            </div>
        </main>
    )
}
