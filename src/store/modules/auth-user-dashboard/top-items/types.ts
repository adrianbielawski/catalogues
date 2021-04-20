import * as T from "src/globalTypes"

export interface TopItemsState {
    itemsData: T.DeserializedListData<T.DeserializedItemData>,
    isFetchingItems: boolean,
    isFetchingData: boolean,
    error: T.ErrorMessage | null,
}

export interface FetchTopItemsCommentsSuccessPayload {
    [id: number]: T.ListData<T.ItemCommentParent>,
}

export interface PostTopItemCommentSuccessPayload extends T.ItemCommentChild {
    parent_id: number,
    meta: {
        count: number
    }
}

export interface PostTopItemCommentPayload {
    itemId: number,
    parentId?: number,
    text: string,
}

export interface FetchTopItemCommentsPayload {
    itemId: number,
    page: number | null,
}

export interface FetchTopItemCommentsSuccessPayload {
    itemId: number,
    data: T.ListData<T.ItemCommentParent>,
}