import { fetchArtworks } from "@/lib/api"
import { categoryFilterUtil } from "@/lib/catergoryFilterUtil"
import { List } from "./List"
import { ArtworksStoreProvider } from "./artworksStoreContext"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

export default async function Page({ searchParams }: { searchParams: any }) {
    const params = new URLSearchParams(searchParams)
    const paramKey = params.toString()

    const filterMap = categoryFilterUtil.getfilterMap(params)

    // const response = await fetchArtworks({
    //     title: searchParams?.title,
    //     categoryTerms: filterMap
    // })
    //
    // const client = new QueryClient()
    // await client.prefetchQuery({
    //     queryKey: ["artworks", paramKey],
    //     queryFn: () => fetchArtworks({ title: searchParams?.title, categoryTerms: filterMap })
    // })

    return <List paramKey={paramKey} />
    //
    // return (
    //     <HydrationBoundary state={dehydrate(client)}>
    //             <List paramKey={paramKey} />
    //         {/* <ArtworksStoreProvider initial={{ page: 1, artworks: response.data, pagination: response.pagination, status: "success" }}> */}
    //         {/* </ArtworksStoreProvider> */}
    //     </HydrationBoundary>
    // )
}
