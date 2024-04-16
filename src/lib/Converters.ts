import { Query } from "./types";

export const convertToURLSearchParams = (query: Query): Record<string, string | string[]> => {
    let searchParams: Record<string, string | string[]> = {};

    if (query.title) {
        searchParams = { ...searchParams, title: query.title }
    }

    if (query.sortBy) {
        searchParams = { ...searchParams, sortBy: query.sortBy }
    }

    searchParams = { ...searchParams, discount: query.discount ? "true" : "false" }

    if (query.pageNumber) {
        if (typeof query.pageNumber == "string") {
            searchParams = { ...searchParams, pageNumber: query.pageNumber }
        } else {
            searchParams = { ...searchParams, pageNumber: query.pageNumber.toString() }
        }
    }

    if (query.facets) {
        searchParams = { ...searchParams, facets: query.facets }
    }

    searchParams = { ...searchParams, pageSize: query.pageSize.toString() }

    return searchParams;
}


export const convertOffset = (offset: string | null | number): number => {
    if (typeof offset === 'string') return parseInt(offset);
    else if (offset === null) return 0;
    else return offset;
} 