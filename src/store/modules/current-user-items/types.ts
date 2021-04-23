import * as T from "src/globalTypes";

export interface CurrentUserItemsState {
    itemsData: T.DeserializedListData<T.DeserializedItemData>,
    catalogueId: number | null,
    isFetchingItems: boolean,
    isCreatingNewItem: boolean,
    newItemId: number | null,
    itemsDataError: T.ErrorMessage | null,
}

//Payloads
export interface FetchItemSuccessPayload {
    data: T.Item,
    itemId: number,
}

export interface FetchItemsPayload {
    catalogueId: number,
    page: number,
    search?: string,
    sort?: number | string,
    filters?: Record<string, string | number>,
}

export interface FetchItemsSuccessPayload {
    data: T.ListData<T.Item>,
    catalogueId: number,
}

export interface ChangeItemRatingPayload {
    itemId: number,
    rating: number | null,
    prevRating: T.DeserializedItemRating,
}

export interface ChangeFavouriteItem {
    itemId: number,
    isFavourite: boolean,
}

export interface ChangeFavouriteItemFailure {
    itemId: number,
    isFavourite: boolean,
}

export interface FetchItemCommentsPayload {
    itemId: number,
    page: number | null,
}

export interface FetchItemCommentsSuccessPayload {
    itemId: number,
    data: T.ListData<T.ItemCommentParent>,
}

export interface FetchItemsCommentsSuccessPayload {
    [id: number]: T.ListData<T.ItemCommentParent>,
}

export interface PostItemCommentSuccessPayload extends T.ItemCommentChild {
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