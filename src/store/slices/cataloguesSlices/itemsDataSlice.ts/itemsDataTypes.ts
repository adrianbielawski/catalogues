import {
    DeserializedItem, ErrorMessage, Item, ItemCommentParent, ItemCommentChildren, ItemRating, ListData
} from "src/globalTypes"

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
    data: ListData<Item>,
    catalogueId: number,
}

export interface AddImageToStatePayload {
    itemId: number,
    images: string[],
}

export interface ImagePayload {
    itemId: number,
    index: number,
}

export interface SaveItemSuccessPayload {
    itemId: number,
}

export interface ChangeItemRatingPayload {
    itemId: number,
    rating: number,
}

export interface ChangeItemRatingSuccessPayload {
    itemId: number,
    rating: ItemRating,
}

export interface ChangeFavouriteItemPayload {
    itemId: number,
    isFavourite: boolean,
}

export interface FetchItemCommentsPayload {
    itemId: number,
    page: number | null,
}

export interface FetchItemCommentsSuccessPayload {
    itemId: number,
    data: ListData<ItemCommentParent>,
}

export interface PostItemCommentSuccessPayload extends ItemCommentChildren {
    parent_id: number,
    meta: {
        count: number
    }
}

export interface PostItemCommentPayload {
    itemId: number,
    parentId?: number,
    text: string,
}