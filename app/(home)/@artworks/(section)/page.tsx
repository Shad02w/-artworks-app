import { List } from "./List"

export default async function Page({ searchParams }: { searchParams: any }) {
    const paramKey = new URLSearchParams(searchParams).toString()

    return <List paramKey={paramKey} />
}
