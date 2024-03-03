import type { CategorySubtype } from "./api"

export type CategoryFilterMap = Partial<Record<CategorySubtype, string[]>>

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
    return subtype + "_ids"
}

function getfilterMap(searchParam: URLSearchParams): CategoryFilterMap {
    const result: CategoryFilterMap = {}

    catergoryFilterUtil.subtypes.forEach(subtype => {
        result[subtype] = searchParam.get(subtype + "_ids")?.split(",") ?? []
    })

    return result
}

const subtypes: CategorySubtype[] = ["classification", "material", "technique", "style", "subject", "department", "theme"]

export const catergoryFilterUtil = {
    subtypes,
    getSubtypeId,
    listFilters,
    addFilter,
    removeFilter,
    getfilterMap
}
