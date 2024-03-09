import { List } from "./List"

export default async function Page({ searchParams }: { searchParams: any }) {
    const params = new URLSearchParams(searchParams)
    const paramKey = params.toString()

    return <List paramKey={paramKey} />
}
