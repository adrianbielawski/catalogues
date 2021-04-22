import * as T from "src/globalTypes"

export interface FavouriteItemsSliceState {
    itemsData: T.DeserializedListData<T.DeserializedItemData>,
    isFetchingItems: boolean,
    isFetchingData: boolean,
    error: T.ErrorMessage | null,
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