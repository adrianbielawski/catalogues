import { current, PayloadAction } from '@reduxjs/toolkit'
import { DeserializedItem, DeserializedItemField, Item } from 'src/globalTypes'
import { itemCommentDataDeserializer, itemDataDeserializer, listDeserializer } from 'src/serializers'
import { getItemCommentDataById, getItemCommentsDataById, getItemDataById } from './selectors'
import * as T from './types'

const networkError = {
    title: 'Network error',
    message: 'Something went wrong. Plaese try again.',
}

type State = T.CurrentUserItemsState

export const currentUserItems = {
    REFRESH_CURRENT_USER_ITEM(state: State, action: PayloadAction<number>) { },
    CLEAR_ITEMS_DATA_ERROR(state: State) {
        state.itemsDataError = null
    },
    CLEAR_ITEM_ERROR(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.itemError = null
    },
}

export const fetchCurrentUserItem = {
    FETCH_CURRENT_USER_ITEM(state: State, action: PayloadAction<number>) { },
    FETCH_CURRENT_USER_ITEM_START(state: State, action: PayloadAction<number>) { },
    FETCH_CURRENT_USER_ITEM_SUCCESS(state: State, action: PayloadAction<T.FetchItemSuccessPayload>) {
        const itemData = getItemDataById(state, action.payload.itemId)
        const commentsData = itemData.commentsData
        Object.assign(itemData, itemDataDeserializer(action.payload.data))
        itemData.commentsData = commentsData
    },
    FETCH_CURRENT_USER_ITEM_FAILURE(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isSubmitting = false
    },
}

export const fetchCurrentUserItems = {
    FETCH_CURRENT_USER_ITEMS(state: State, action: PayloadAction<T.FetchItemsPayload>) { },
    FETCH_CURRENT_USER_ITEMS_START(state: State) {
        state.isFetchingItems = true
    },
    FETCH_CURRENT_USER_ITEMS_SUCCESS(state: State, action: PayloadAction<T.FetchItemsSuccessPayload>) {
        const prevResults = action.payload.data.current === 1 ? [] : current(state).itemsData.results

        const itemsData = listDeserializer(action.payload.data, itemDataDeserializer, prevResults)

        if (state.catalogueId === action.payload.catalogueId) {
            itemsData.startIndex = 1
        }

        return {
            ...state,
            itemsData,
            catalogueId: action.payload.catalogueId,
            isFetchingItems: false,
            isCreatingNewItem: false,
        }
    },
    FETCH_CURRENT_USER_ITEMS_FAILURE(state: State) {
        state.isFetchingItems = false
        state.itemsDataError = networkError
    },
}

export const addItem = {
    ADD_ITEM(state: State, action: PayloadAction<number>) { },
    ADD_ITEM_START(state: State) {
        state.isCreatingNewItem = true
    },
    ADD_ITEM_SUCCESS(state: State, action: PayloadAction<Item>) {
        state.itemsData.results.unshift(itemDataDeserializer(action.payload))
        state.newItemId = action.payload.id
        state.isCreatingNewItem = false
    },
    ADD_ITEM_FAILURE(state: State) {
        state.isCreatingNewItem = false
        state.itemsDataError = networkError
    },
}

export const editItem = {
    TOGGLE_EDIT_ITEM(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isEditing = !itemData.isEditing
    },
    CHANGE_ITEM_FIELD_VALUE(state: State, action: PayloadAction<DeserializedItemField>) { },
}

export const saveItem = {
    SAVE_ITEM(state: State, action: PayloadAction<DeserializedItem>) { },
    SAVE_ITEM_START(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isSubmitting = true
    },
    SAVE_ITEM_SUCCESS(state: State, action: PayloadAction<number>) {
        state.newItemId = null
    },
    SAVE_ITEM_FAILURE(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isSubmitting = false
        itemData.itemError = networkError
    },
}

export const deleteItem = {
    DELETE_ITEM(state: State, action: PayloadAction<number>) { },
    DELETE_ITEM_START(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isDeleting = true
    },
    DELETE_ITEM_SUCCESS(state: State, action: PayloadAction<number>) {
        const itemIndex = state.itemsData.results.findIndex(item => item.id === action.payload)
        state.itemsData.results.splice(itemIndex, 1)
        state.newItemId = null
    },
    DELETE_ITEM_FAILURE(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isDeleting = false
        itemData.itemError = networkError
    },
}

export const changeItemRating = {
    CHANGE_ITEM_RATING(state: State, action: PayloadAction<T.ChangeItemRatingPayload>) { },
    CHANGE_ITEM_RATING_FAILURE(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.itemError = networkError
    },
}

export const changeFavouriteItem = {
    CHANGE_FAVOURITE_ITEM(state: State, action: PayloadAction<T.ChangeFavouriteItem>) { },
    CHANGE_FAVOURITE_ITEM_SUCCESS(state: State) { },
    CHANGE_FAVOURITE_ITEM_FAILURE(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.itemError = networkError
    },
}

export const fetchItemComments = {
    FETCH_ITEM_COMMENTS(state: State, action: PayloadAction<T.FetchItemCommentsPayload>) { },
    FETCH_ITEM_COMMENTS_START(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isFetchingComments = true
    },
    FETCH_ITEM_COMMENTS_SUCCESS(state: State, action: PayloadAction<T.FetchItemCommentsSuccessPayload>) {
        const itemData = getItemDataById(state, action.payload.itemId)
        itemData.isFetchingComments = false
        itemData.commentsData = listDeserializer(
            action.payload.data,
            itemCommentDataDeserializer,
            itemData.commentsData.results,
        )
        itemData.commentsData.startIndex = 1
    },
    FETCH_ITEM_COMMENTS_FAILURE(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isFetchingComments = false
    },
}

export const fetchItemsComments = {
    FETCH_ITEMS_COMMENTS(state: State) { },
    FETCH_ITEMS_COMMENTS_START(state: State) { },
    FETCH_ITEMS_COMMENTS_SUCCESS(state: State, action: PayloadAction<T.FetchItemsCommentsSuccessPayload>) {
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
    FETCH_ITEMS_COMMENTS_FAILURE(state: State) { },
}

export const postItemComment = {
    POST_ITEM_COMMENT(state: State, action: PayloadAction<T.PostItemCommentPayload>) { },
    POST_ITEM_COMMENT_START(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isPostingComment = true
    },
    POST_ITEM_COMMENT_SUCCESS(state: State, action: PayloadAction<T.PostItemCommentSuccessPayload>) {
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
    POST_ITEM_COMMENT_FAILURE(state: State, action: PayloadAction<number>) {
        const itemData = getItemDataById(state, action.payload)
        itemData.isPostingComment = false
        itemData.itemError = networkError
    },
}