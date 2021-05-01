import * as T from "src/globalTypes"

export interface LatestItemsState {
    itemsData: T.DeserializedListData<T.DeserializedItemData> | null,
    isFetchingItems: boolean,
    isFetchingData: boolean,
    error: T.ErrorMessage | null,
}

export type FetchLatestItemsCommentsSuccessPayload = Record<number, T.ListData<T.ItemCommentParent>>

export interface PostLatestItemCommentSuccessPayload extends T.ItemCommentChild {
    parent_id: number,
    meta: {
        count: number
    }
}

export interface PostLatestItemCommentPayload {
    itemId: number,
    parentId?: number,
    text: string,
}

export interface FetchLatestItemCommentsPayload {
    itemId: number,
    page: number | null,
}

export interface FetchLatestItemCommentsSuccessPayload {
    itemId: number,
    data: T.ListData<T.ItemCommentParent>,
}