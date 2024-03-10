import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex h-full flex-col items-center">
            <p className="mb-5 mt-[30%] text-xl font-semibold">Oops! Seems like you are lost</p>
            <Link href="/">back to home</Link>
        </div>
    )
}
