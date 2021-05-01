import { DeserializedCommentData, DeserializedItemData, DeserializedListData } from "src/globalTypes"
import { FavouriteItemsSliceState } from "./types"

type State = FavouriteItemsSliceState

export const getItemDataById = (
    state: State,
    itemId: number,
): DeserializedItemData | undefined => (
    state.itemsData?.results.filter(i => i.id === itemId)[0]
)

export const getItemCommentsDataById = (
    state: State,
    itemId: number,
): DeserializedListData<DeserializedCommentData> | undefined => (
    getItemDataById(state, itemId)?.commentsData
)

export const getItemCommentDataById = (
    state: State,
    itemId: number,
    commentId: number,
): DeserializedCommentData | undefined => (
    getItemCommentsDataById(state, itemId)?.results.filter(c => c.id === commentId)[0]
)