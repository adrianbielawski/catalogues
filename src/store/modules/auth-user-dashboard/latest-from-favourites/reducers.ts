import { current, PayloadAction } from '@reduxjs/toolkit'
import { networkError } from 'src/constants'
import { Field, Item, ListData } from 'src/globalTypes'
import { itemCommentDataDeserializer, itemDataDeserializer, listDeserializer } from 'src/serializers'
import { getItemCommentDataById, getItemCommentsDataById, getItemDataById } from './selectors'
import * as T from './types'

type State = T.LatestFromFavouritesState

export const fetchLFF = {
    FETCH_LFF(state: State, action: PayloadAction<number>) { },
    FETCH_LFF_START(state: State) {
        state.isFetchingData = true
        state.isFetchingItems = true
    },
    FETCH_LFF_SUCCESS(state: State, action: PayloadAction<ListData<Item>>) {
        const prevResults = action.payload.current === 1 ? [] : current(state).itemsData.results
        const itemsData = listDeserializer(action.payload, itemDataDeserializer, prevResults)
        state.itemsData = { ...itemsData }
        state.isFetchingItems = false
    },
    FETCH_LFF_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
}

export const fetchLFFItemsComments = {
    FETCH_LFF_ITEMS_COMMENTS(state: State, action: PayloadAction<number>) { },
    FETCH_LFF_ITEMS_COMMENTS_SUCCESS(state: State, action: PayloadAction<T.FetchLFFItemsCommentsSuccessPayload>) {
        const data = action.payload
        for (const id in data) {
            const itemData = getItemDataById(state, parseInt(id))
            itemData.commentsData = listDeserializer(
                data[id],
                itemCommentDataDeserializer,
                itemData.commentsData.results,
            )
        itemData.isFetchingComments = false
        itemData.commentsData.startIndex = 1
        }
    },
    FETCH_LFF_ITEMS_COMMENTS_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
}

export const fetchLFFCatalogues = {
    FETCH_LFF_CATALOGUES(state: State, action: PayloadAction<number>) { },
    FETCH_LFF_CATALOGUES_SUCCESS(state: State, action: PayloadAction<number[]>) { },
    FETCH_LFF_CATALOGUES_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
}

export const fetchLFFFields = {
    FETCH_LFF_FIELDS(state: State, action: PayloadAction<number>) { },
    FETCH_LFF_FIELDS_SUCCESS(state: State, action: PayloadAction<Field[]>) { },
    FETCH_LFF_FIELDS_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
    LFF_FIELDS_NOT_NEEDED(state: State) {
        state.isFetchingData = false
    },
}

export const fetchLFFChoices = {
    FETCH_LFF_CHOICES(state: State, action: PayloadAction<number>) { },
    FETCH_LFF_CHOICES_SUCCESS(state: State, action: PayloadAction<Field[]>) {
        state.isFetchingData = false
    },
    FETCH_LFF_CHOICES_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
}

export const fetchLFFItemComments = {
    FETCH_LFF_ITEM_COMMENTS(state: State, action: PayloadAction<T.FetchLFFItemCommentsPayload>) { },
    FETCH_LFF_ITEM_COMMENTS_START(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isFetchingComments = true
    },
    FETCH_LFF_ITEM_COMMENTS_SUCCESS(state: State, action: PayloadAction<T.FetchLFFItemCommentsSuccessPayload>) {
        const itemData = getItemDataById(state, action.payload.itemId)
        itemData.isFetchingComments = false
        itemData.commentsData = listDeserializer(
            action.payload.data,
            itemCommentDataDeserializer,
            itemData.commentsData.results,
        )
        itemData.commentsData.startIndex = 1
    },
    FETCH_LFF_ITEM_COMMENTS_FAILURE(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isFetchingComments = false
    },
}

export const postLFFItemComment = {
    POST_LFF_ITEM_COMMENT(state: State, action: PayloadAction<T.PostLFFItemCommentPayload>) { },
    POST_LFF_ITEM_COMMENT_START(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isPostingComment = true
    },
    POST_LFF_ITEM_COMMENT_SUCCESS(state: State, action: PayloadAction<T.PostLFFItemCommentSuccessPayload>) {
        const itemData = getItemDataById(state, action.payload.item_id)
        const commentsData = getItemCommentsDataById(state, action.payload.item_id)
        const parentId = action.payload.parent_id

        if (parentId) {
            const parentComment = getItemCommentDataById(state, action.payload.item_id, parentId)
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
    POST_LFF_ITEM_COMMENT_FAILURE(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isPostingComment = false
        itemData.itemError = networkError
    },
}