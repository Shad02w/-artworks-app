import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/cn"

interface Props {
    value: string
    options: Array<{ id: string; value: string }>
    onChange: (value: string) => void
    className?: string
}

export function Select({ className, options, value, onChange }: Props) {
    return (
        <div className={cn("relative flex flex-row items-center", className)}>
            <span className="mr-2 flex flex-row items-center">
                <ChevronDown className="h-5" /> {value}
            </span>
            <select
                className="absolute h-full w-full touch-manipulation bg-transparent opacity-0 focus:outline-none"
                value={value}
                onInput={e => onChange(e.currentTarget.value)}
            >
                {options.map(option => (
                    <option key={option.id}>{option.value}</option>
                ))}
            </select>
        </div>
    )
}
