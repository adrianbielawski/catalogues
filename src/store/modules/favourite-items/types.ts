import * as T from "src/globalTypes"

export interface FavouriteItemsSliceState {
    itemsData: T.DeserializedListData<T.DeserializedItemData> | null,
    cataloguesIds: number[],
    isFetchingItems: boolean,
    isFetchingFavItemsData: boolean,
    error: T.ErrorMessage | null,
}

export interface FetchFavouriteItemsPayload {
    page: number,
    search?: string,
    sort?: number | string,
    filters?: Record<string, string | number>,
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

export interface FetchItemCommentsPayload {
    itemId: number,
    page: number | null,
}

export interface FetchItemCommentsSuccessPayload {
    itemId: number,
    data: T.ListData<T.ItemCommentParent>,
}