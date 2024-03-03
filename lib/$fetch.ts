import { notFound } from "next/navigation"
import { APIError } from "./error"

export async function $fetch<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
    const response = await fetch(input, init)
    switch (response.status) {
        case 200:
        case 204:
            break
        case 404:
            // jump to 404 page
            notFound()
        default:
            console.log(response.status, response.statusText)
            throw new APIError()
    }

    return response.json() as Promise<T>
}
