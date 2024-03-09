"use client"

import { createContext, useContext, useRef } from "react"
import { useStore, type StoreApi } from "zustand"
import { createArtworksStore, type ArtworksStore, type ArtworksState } from "./artworksStore"

export const ArtworksStoreContext = createContext<StoreApi<ArtworksStore> | null>(null)

export function useArtworksStore<T>(selector: (store: ArtworksStore) => T) {
    const context = useContext(ArtworksStoreContext)
    if (context === null) {
        throw new Error("useArtworksStore must be used within a ArtworksStoreProvider")
    }
    return useStore(context, selector)
}

interface ArtworksStoreProviderProps {
    children: React.ReactNode
    initial: ArtworksState
}

export function ArtworksStoreProvider({ children, initial }: ArtworksStoreProviderProps) {
    const storeRef = useRef<StoreApi<ArtworksStore>>(createArtworksStore(initial))

    return <ArtworksStoreContext.Provider value={storeRef.current}>{children}</ArtworksStoreContext.Provider>
}
