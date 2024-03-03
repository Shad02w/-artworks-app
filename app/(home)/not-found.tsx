import {} from "next/image"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="h-full flex flex-col items-center">
            <p className="text-xl font-semibold mt-[30%] mb-5">Oops! Seems like you are lost</p>
            <Link href="/">back to home</Link>
        </div>
    )
}
