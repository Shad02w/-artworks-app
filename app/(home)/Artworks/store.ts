import { fetchArtworks, type Pagination, type SearchArtworksResponse } from "@/lib/api"
import { create } from "zustand"

// use zustand to manage infinite scroll list of Artworks
export interface ArtworkListStore {
    artworks: SearchArtworksResponse["data"]
    status: "loading" | "error" | "success"
    page: number
    pagination: Pagination | null
    title?: string
    fetchNextPage: () => Promise<void>
    refresh: (title?: string) => Promise<void>
}

export const useArtworkListStore = create<ArtworkListStore>((set, get) => ({
    artworks: [],
    status: "success",
    pagination: null,
    page: 1,
    fetchNextPage: async () => {
        set({ status: "loading" })
        const res = await fetchArtworks(get().page + 1, get().title)
        set(state => ({ artworks: [...state.artworks, ...res.data], status: "success", page: get().page + 1, pagination: res.pagination }))
    },
    refresh: async (title?: string) => {
        if (title === get().title) return
        set({ status: "loading" })
        const res = await fetchArtworks(1, title)
        set({ artworks: res.data, status: "success", page: 1, pagination: res.pagination, title })
    }
}))
