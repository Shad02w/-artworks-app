import { fetchCategories } from "@/lib/api"
import { Selector } from "./Selector"

interface Props {
    className?: string
}

export async function CategorySelect({ className }: Props) {
    const categories = await fetchCategories()
    return <Selector className={className} categories={categories.data} />
}
