import { DeserializedItem, ErrorMessage, Item, ListData } from "src/globalTypes";

export interface ItemsDataState {
    catalogueId: number | null,
    fetchingItems: boolean,
    creatingNewItem: boolean,
    newItemId: number | null,
    itemsDataError: ErrorMessage,
    count: number | null,
    pageSize: number | null,
    startIndex: number | null,
    endIndex: number | null,
    current: number | null,
    next: number | null,
    previous: number | null,
    results: DeserializedItem[],
}

export interface FetchItemPayload {
    itemId: number,
    prevId: number | string,
}

export interface FetchItemSuccessPayload {
    data: Item,
    itemId: number,
}

export interface Filter {
    [filter: string]: string | number
}

export interface FetchItemsPayload {
    catalogueId: number,
    page: number,
    search?: string,
    sort?: number | string,
    filters?: Filter,
}

export interface FetchItemsSuccessPayload {
    data: ListData,
    catalogueId: number,
}

export interface ItemAndFieldIdPayload {
    itemId: number,
    fieldId: number,
    value: string | string[],
}

export interface AddImageToStatePayload {
    itemId: number,
    image: string,
}

export interface ImagePayload {
    itemId: number,
    index: number,
}

export interface SaveItemSuccessPayload {
    itemId: number,
    prevId: number | string,
}