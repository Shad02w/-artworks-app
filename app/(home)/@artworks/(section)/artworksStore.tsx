import { createStore } from "zustand"
import { fetchArtworks, type SearchArtworksResponse } from "@/lib/api"
import { categoryFilterUtil } from "@/lib/catergoryFilterUtil"

export type ArtworksState = {
    page: number
    status: "success" | "loading" | "error"
    artworks: SearchArtworksResponse["data"]
    pagination: SearchArtworksResponse["pagination"]
}

export type ArtworksActions = {
    fetchNextPage: () => Promise<void>
}

export type ArtworksStore = ArtworksState & ArtworksActions

export const createArtworksStore = (initial: ArtworksState) => {
    return createStore<ArtworksStore>((set, get) => ({
        ...initial,
        fetchNextPage: async () => {
            const searchParmas = new URLSearchParams(window.location.search)
            set({ status: "loading" })
            try {
                const { data, pagination } = await fetchArtworks({
                    page: get().page + 1,
                    title: searchParmas.get("title") ?? undefined,
                    categoryTerms: categoryFilterUtil.getfilterMap(searchParmas)
                })
                set(state => ({
                    artworks: [...state.artworks, ...data],
                    pagination,
                    page: state.page + 1,
                    status: "success"
                }))
            } catch (error) {
                set({ status: "error" })
            }
        }
    }))
}
