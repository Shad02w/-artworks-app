import { notFound } from "next/navigation"

export async function $fetch<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
    const response = await fetch(input, init)
    switch (response.status) {
        case 200:
        case 204:
            break
        case 404:
            notFound()
        default:
            throw new APIError()
    }

    return response.json() as Promise<T>
}
