import { CameraOff } from "lucide-react"

export function NoImage() {
    return (
        <div className="flex h-full w-full flex-col items-center justify-center bg-gray-200">
            <CameraOff className="h-[120px] w-[120px] stroke-gray-800" />
            <div className="text-xl font-semibold">NO IMAGE</div>
        </div>
    )
}
