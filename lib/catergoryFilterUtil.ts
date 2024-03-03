import type { CategorySubtype } from "./api"

function listFilters(searchParam: URLSearchParams, subtype: CategorySubtype): string[] {
    return searchParam.get(getSubtypeId(subtype))?.split(",") ?? []
}

function addFilter(searchParam: URLSearchParams, subtype: CategorySubtype, id: string): URLSearchParams {
    const ids = listFilters(searchParam, subtype)
    searchParam.set(getSubtypeId(subtype), [...ids, id].join(","))
    return searchParam
}

function removeFilter(searchParam: URLSearchParams, subtype: CategorySubtype, id: string): URLSearchParams {
    let ids = listFilters(searchParam, subtype).filter(_ => _ !== id)
    const subtypeId = getSubtypeId(subtype)
    if (ids.length === 0) {
        searchParam.delete(subtypeId)
    } else {
        searchParam.set(subtypeId, ids.join(","))
    }
    return searchParam
}

function getSubtypeId(subtype: CategorySubtype): string {
    return subtype + "_id"
}

export const catergoryFilterUtil = {
    getSubtypeId,
    listFilters,
    addFilter,
    removeFilter
}
