import { current, PayloadAction } from '@reduxjs/toolkit'
import { networkError } from 'src/constants'
import { DeserializedItemData, Field, Item, ListData } from 'src/globalTypes'
import { itemCommentDataDeserializer, itemDataDeserializer, listDeserializer } from 'src/serializers'
import { getItemCommentDataById, getItemCommentsDataById, getItemDataById } from './selectors'
import { initialState } from './slice'
import * as T from './types'

type State = T.TopItemsState

export const topItems = {
    CLEAR_TOP_ITEMS(state: State) {
        Object.assign(state, initialState)
    },
}

export const fetchTopItems = {
    FETCH_TOP_ITEMS(state: State, action: PayloadAction<number>) { },
    FETCH_TOP_ITEMS_START(state: State) {
        state.isFetchingData = true
        state.isFetchingItems = true
    },
    FETCH_TOP_ITEMS_SUCCESS(state: State, action: PayloadAction<ListData<Item>>) {
        const prevResults = current(state).itemsData?.results || []
        const itemsData = listDeserializer(action.payload, itemDataDeserializer, prevResults)
        state.itemsData = { ...itemsData }
        state.isFetchingItems = false
    },
    FETCH_TOP_ITEMS_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
}

export const fetchTopItemsComments = {
    FETCH_TOP_ITEMS_COMMENTS(state: State, action: PayloadAction<number>) { },
    FETCH_TOP_ITEMS_COMMENTS_SUCCESS(state: State, action: PayloadAction<T.FetchTopItemsCommentsSuccessPayload>) {
        const data = action.payload
        for (const id in data) {
            const itemData = getItemDataById(state, parseInt(id)) || {} as DeserializedItemData
            itemData.commentsData = listDeserializer(
                data[id],
                itemCommentDataDeserializer,
                itemData.commentsData?.results || [],
            )
        itemData.isFetchingComments = false
        itemData.commentsData.startIndex = 1
        }
    },
    FETCH_TOP_ITEMS_COMMENTS_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
}

export const fetchTopItemsCatalogues = {
    FETCH_TOP_ITEMS_CATALOGUES(state: State, action: PayloadAction<number>) { },
    FETCH_TOP_ITEMS_CATALOGUES_SUCCESS(state: State, action: PayloadAction<number[]>) { },
    FETCH_TOP_ITEMS_CATALOGUES_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
}

export const fetchTopItemsFields = {
    FETCH_TOP_ITEMS_FIELDS(state: State, action: PayloadAction<number>) { },
    FETCH_TOP_ITEMS_FIELDS_SUCCESS(state: State, action: PayloadAction<Field[]>) { },
    FETCH_TOP_ITEMS_FIELDS_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
    TOP_ITEMS_FIELDS_NOT_NEEDED(state: State) {
        state.isFetchingData = false
    },
}

export const fetchTopItemsChoices = {
    FETCH_TOP_ITEMS_CHOICES(state: State, action: PayloadAction<number>) { },
    FETCH_TOP_ITEMS_CHOICES_SUCCESS(state: State, action: PayloadAction<Field[]>) {
        state.isFetchingData = false
    },
    FETCH_TOP_ITEMS_CHOICES_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
}

export const fetchTopItemComments = {
    FETCH_TOP_ITEM_COMMENTS(state: State, action: PayloadAction<T.FetchTopItemCommentsPayload>) { },
    FETCH_TOP_ITEM_COMMENTS_START(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)!
        itemData.isFetchingComments = true
    },
    FETCH_TOP_ITEM_COMMENTS_SUCCESS(state: State, action: PayloadAction<T.FetchTopItemCommentsSuccessPayload>) {
        const itemData = getItemDataById(state, action.payload.itemId)!
        itemData.isFetchingComments = false
        itemData.commentsData = listDeserializer(
            action.payload.data,
            itemCommentDataDeserializer,
            itemData.commentsData.results,
        )
        itemData.commentsData.startIndex = 1
    },
    FETCH_TOP_ITEM_COMMENTS_FAILURE(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)!
        itemData.isFetchingComments = false
    },
}

export const postTopItemComment = {
    POST_TOP_ITEM_COMMENT(state: State, action: PayloadAction<T.PostTopItemCommentPayload>) { },
    POST_TOP_ITEM_COMMENT_START(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)!
        itemData.isPostingComment = true
    },
    POST_TOP_ITEM_COMMENT_SUCCESS(state: State, action: PayloadAction<T.PostTopItemCommentSuccessPayload>) {
        const itemData = getItemDataById(state, action.payload.item_id)!
        const commentsData = getItemCommentsDataById(state, action.payload.item_id)!
        const parentId = action.payload.parent_id

        if (parentId) {
            const parentComment = getItemCommentDataById(state, action.payload.item_id, parentId)!
            parentComment.children.unshift(action.payload.id)
        } else {
            commentsData.results.unshift({
                id: action.payload.id,
                children: [],
            })
        }

        commentsData.count = action.payload.meta.count
        itemData.isPostingComment = false
    },
    POST_TOP_ITEM_COMMENT_FAILURE(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)!
        itemData.isPostingComment = false
        itemData.itemError = networkError
    },
}