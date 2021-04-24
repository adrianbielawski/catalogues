import { DeserializedCommentData, DeserializedItemData, DeserializedListData } from "src/globalTypes"
import { LatestItemsState } from "./types"

type State = LatestItemsState

export const getItemDataById = (
    state: State,
    itemId: number,
): DeserializedItemData => (
    state.itemsData.results.filter(i => i.id === itemId)[0]
)

export const getItemCommentsDataById = (
    state: State,
    itemId: number,
): DeserializedListData<DeserializedCommentData> => (
    getItemDataById(state, itemId).commentsData
)

export const getItemCommentDataById = (
    state: State,
    itemId: number,
    commentId: number,
): DeserializedCommentData => (
    getItemCommentsDataById(state, itemId).results.filter(c => c.id === commentId)[0]
)