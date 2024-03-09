import { SearchInput } from "./SearchInput"

export default function Page({ searchParams }: { searchParams: any }) {
    return <SearchInput keyword={searchParams?.title} paramKey={new URLSearchParams(searchParams).toString()} />
}
