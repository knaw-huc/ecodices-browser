export interface IFacetValue {
    key: string,
    doc_count: number
}

export interface ISearchValues {
    name: string,
    field: string,
    values: string[]
}

export interface ISearchObject {
    searchvalues: ISearchValues[],
    page: number,
    page_length: number,
    sortorder: string
}

export interface IFacetCandidate {
    facet: string,
    field: string,
    candidate: string
}

export interface ISendCandidate {
    (data: IFacetCandidate):void
}

export interface IFacetCandidate {
    facet: string,
    field: string,
    candidate: string
}

export interface IRemoveFacet {
    (field: string, value: string): void
}

export interface IResultItem {
    summary: string,
    material: string,
    xml: string,
    binding: string,
    place: string,
    title: string,
    type: string,
    decoration: string,
    tempDate: string,
    origDate: string,
    settelement: string,
    language: string
}

export interface IResultList {
    amount: number,
    pages: number,
    items: IResultItem[]
}

export interface ISendPage {
    (data: number): void
}

export interface IResetFacets {
    (): void
}
