import { AuthUserCatalogueData, Choice, DeserializedItemData, ErrorMessage, ItemCommentChild } from "src/globalTypes"

export interface SingleItemSliceState {
    itemData: DeserializedItemData | null,
    catalogueData: AuthUserCatalogueData | null,
    isFetchingItem: boolean,
    isFetchingData: boolean,
    error: ErrorMessage | null,
}

export interface FetchSingleItemChoicesSuccess {
    fieldId: number,
    data: Record<number, Choice[]>
}

export interface FetchSingleItemCommentsPayload {
    itemId: number,
    page: number | null,
}

export interface FetchMoreSingleItemCommentsPayload {
    itemId: number,
    page: number
}

export interface PostSingleItemCommentPayload {
    itemId: number,
    parentId?: number,
    text: string,
}

export interface PostSingleItemCommentSuccessPayload extends ItemCommentChild {
    parent_id: number,
    meta: {
        count: number
    }
}