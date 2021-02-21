import { DeserializedItem, Item, ListData } from "src/globalTypes";

export interface ItemsDataState {
    catalogueId: number | null,
    fetchingItems: boolean,
    count: number | null,
    pageSize: number | null,
    startIndex: number | null,
    endIndex: number | null,
    current: number | null,
    next: number | null,
    previous: number | null,
    results: DeserializedItem[]
}

export interface FetchItemPayload {
    itemId: number,
    prevId: number | string,
}

export interface FetchItemSuccessPayload {
    data: Item,
    itemId: number | string,
}

export interface FetchItemsPayload {
    catalogueId: number,
    page: number,
    search?: string,
}

export interface FetchItemsSuccessPayload {
    data: ListData,
    catalogueId: number,
}

export interface ItemAndFieldIdPayload {
    itemId: number | string,
    fieldId: number,
    value: string | string[],
}

export interface AddImageToStatePayload {
    itemId: number | string,
    image: string,
}

export interface ImagePayload {
    itemId: number | string,
    index: number,
}

export interface SaveItemSuccessPayload {
    itemId: number,
    prevId: number | string,
}