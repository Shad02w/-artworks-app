import { $fetch } from "./$fetch"
import { merge } from "lodash-es"

const API_BASE = "https://api.artic.edu/api/v1"

export interface Pagination {
    total: number
    limit: number
    offset: number
    total_pages: number
    current_page: number
    next_url: string
}

export interface Thumbnail {
    lqip: string
    width: number
    height: number
    alt_text?: string
}

export interface GetArtworkResponse {
    data: {
        id: number
        title: string
        artist_display: string
        date_display: string
        main_reference_number: string
        dimensions: string
        thumbnail: Thumbnail | null
        image_id: string | null
    }
}

export async function fetchArtwork(id: string): Promise<GetArtworkResponse> {
    return $fetch(
        `${API_BASE}/artworks/${id}?fields=id,title,image_id,artist_display,date_display,main_reference_number,dimensions,thumbnail`
    )
}

export interface SearchArtworksResponse {
    pagination: Pagination
    data: Array<{
        id: number
        title: string
        thumbnail: Thumbnail | null
        image_id: string | null
    }>
}

// TODO: I have difficulty finding the api to get the categories of the artworks 😭
export async function fetchArtworks(page = 1, title?: string, category?: string): Promise<SearchArtworksResponse> {
    function encodeQueryData(object: any) {
        // Convert the JSON object to a string
        const jsonString = JSON.stringify(object)

        // Encode the JSON string to make it URL-safe
        return encodeURIComponent(jsonString)
    }

    const query = {}
    if (title) {
        merge(query, {
            query: {
                match: {
                    title: title
                }
            }
        })
    }

    const params = `&params=${encodeQueryData(query)}`
    return $fetch(`${API_BASE}/artworks/search?&fields=id,image_id,title,thumbnail&from=${(page - 1) * 10}&size=10${params}`)
}

export interface GetAllCategoryResponse {
    pagination: Pagination
    data: Array<{
        id: string
        title: string
    }>
}

export async function fetchCategories(): Promise<GetAllCategoryResponse> {
    return await $fetch(`${API_BASE}/category-terms?fields=id,title`)
}
