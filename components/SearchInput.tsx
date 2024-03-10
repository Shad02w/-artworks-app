import { cn } from "@/lib/cn"
import { useDebounce } from "@/lib/hooks"
import { Loader2 } from "lucide-react"
import { useState } from "react"

interface Props {
    defaultValue?: string
    onSearch: (value: string) => void
    loading?: boolean
    debounce?: number
    className?: string
    placeholder?: string
}

export function SearchInput({ defaultValue, onSearch, loading, debounce = 300, className, placeholder }: Props) {
    const [value, setValue] = useState(defaultValue)

    const debouncedSearch = useDebounce(onSearch, debounce)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setValue(value)
        debouncedSearch(value)
    }

    return (
        <div className="relative w-full">
            <input
                className={cn(
                    "border-border h-12 w-full rounded-md bg-gray-100 p-2 outline-none focus-visible:ring focus-visible:ring-black/20 focus-visible:ring-offset-2 lg:w-[300px]",
                    className
                )}
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
            />
            {loading && (
                <div className="absolute right-0 top-0 flex h-full items-center p-2">
                    <Loader2 className="animate-spin stroke-gray-300" />
                </div>
            )}
        </div>
    )
}
