import { PayloadAction } from '@reduxjs/toolkit'
import { networkError } from 'src/constants'
import { AuthUserChoiceFieldData, Choice, DeserializedItem, Field, Item, ItemCommentParent, ListData } from 'src/globalTypes'
import { itemCommentDataDeserializer, itemDataDeserializer, listDeserializer } from 'src/serializers'
import { createCatalogueData } from '../auth-user-catalogues/reducers/cataloguesReducers'
import { createChoiceData } from '../auth-user-catalogues/reducers/choicesReducers'
import { createFieldData } from '../auth-user-catalogues/reducers/fieldsReducers'
import { getFieldDataById, getItemCommentDataById } from './selectors'
import { initialState } from './slice'
import * as T from './types'

type State = T.SingleItemSliceState

export const singleItems = {
    CLEAR_SINGLE_ITEM_DATA(state: State) {
        Object.assign(state, initialState)
    },
    CLEAR_SINGLE_ITEM_ERROR(state: State) {
        state.error = null
    },
    TOGGLE_EDIT_SINGLE_ITEM(state: State) {
        state.itemData!.isEditing = true
    },
    REFRESH_SINGLE_ITEM(state: State, action: PayloadAction<number>) { },
    FETCH_MORE_SINGLE_ITEM_COMMENTS(state: State, action: PayloadAction<T.FetchMoreSingleItemCommentsPayload>) { },
}

export const fetchSingleItem = {
    FETCH_SINGLE_ITEM(state: State, action: PayloadAction<number>) { },
    FETCH_SINGLE_ITEM_START(state: State) {
        state.isFetchingData = true
        state.isFetchingItem = true
    },
    FETCH_SINGLE_ITEM_SUCCESS(state: State, action: PayloadAction<Item>) {
        state.itemData = itemDataDeserializer(action.payload)
        state.isFetchingItem = false
    },
    FETCH_SINGLE_ITEM_FAILURE(state: State, action: PayloadAction<any>) {
        state.isFetchingData = false
        if (action.payload !== 404) {
            state.error = networkError
        }
    },
}

export const fetchSingleItemComments = {
    FETCH_SINGLE_ITEM_COMMENTS(state: State, action: PayloadAction<T.FetchSingleItemCommentsPayload>) { },
    FETCH_SINGLE_ITEM_COMMENTS_START(state: State, action: PayloadAction<number>) {
        state.itemData!.isFetchingComments = true
    },
    FETCH_SINGLE_ITEM_COMMENTS_SUCCESS(state: State, action: PayloadAction<ListData<ItemCommentParent>>) {
        state.itemData!.isFetchingComments = false
        state.itemData!.commentsData = listDeserializer(
            action.payload,
            itemCommentDataDeserializer,
            state.itemData!.commentsData.results,
        )
        state.itemData!.commentsData.startIndex = 1
    },
    FETCH_SINGLE_ITEM_COMMENTS_FAILURE(state: State) {
        state.itemData!.isFetchingComments = false
    },
}

export const fetchSingleItemCatalogues = {
    FETCH_SINGLE_ITEM_CATALOGUE(state: State, action: PayloadAction<number>) { },
    FETCH_SINGLE_ITEM_CATALOGUE_SUCCESS(state: State, action: PayloadAction<number>) {
        state.catalogueData = createCatalogueData(action.payload)
    },
    FETCH_SINGLE_ITEM_CATALOGUE_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
}

export const fetchSingleItemFields = {
    FETCH_SINGLE_ITEM_FIELDS(state: State, action: PayloadAction<number>) { },
    FETCH_SINGLE_ITEM_FIELDS_SUCCESS(state: State, action: PayloadAction<Field[]>) {
        state.catalogueData!.fieldsData = action.payload.map(createFieldData)
        state.catalogueData!.isFetchingFields = false
    },
    FETCH_SINGLE_ITEM_FIELDS_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
    SINGLE_ITEM_FIELDS_NOT_NEEDED(state: State) {
        state.isFetchingData = false
    },
}

export const fetchSingleItemChoices = {
    FETCH_SINGLE_ITEM_CHOICES(state: State, action: PayloadAction<number>) { },
    FETCH_SINGLE_ITEM_CHOICES_SUCCESS(state: State, action: PayloadAction<Record<number, Choice[]>>) {
        for (const id in action.payload) {
            const field = getFieldDataById(state, parseInt(id)) as AuthUserChoiceFieldData
            field.choices = action.payload[id].map(c => createChoiceData(c.id))
            field.isFetchingChoices = false
        }

        state.isFetchingData = false
        state.catalogueData!.isFetchingFieldsChoices = false
    },
    FETCH_SINGLE_ITEM_CHOICES_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
    SINGLE_ITEM_CHOICES_NOT_NEEDED(state: State) {
        state.isFetchingData = false
    },
}

export const editItem = {
    FETCH_SINGLE_ITEM_CHOICES(state: State, action: PayloadAction<number>) { },
    FETCH_SINGLE_ITEM_CHOICES_SUCCESS(state: State, action: PayloadAction<Field[]>) {
        state.isFetchingData = false
    },
    FETCH_SINGLE_ITEM_CHOICES_FAILURE(state: State) {
        state.isFetchingData = false
        state.error = networkError
    },
    SINGLE_ITEM_CHOICES_NOT_NEEDED(state: State) {
        state.isFetchingData = false
    },
}

export const postSingleItemComment = {
    POST_SINGLE_ITEM_COMMENT(state: State, action: PayloadAction<T.PostSingleItemCommentPayload>) { },
    POST_SINGLE_ITEM_COMMENT_START(state: State, action: PayloadAction<number>) {
        state.itemData!.isPostingComment = true
    },
    POST_SINGLE_ITEM_COMMENT_SUCCESS(state: State, action: PayloadAction<T.PostSingleItemCommentSuccessPayload>) {
        const commentsData = state.itemData!.commentsData
        const parentId = action.payload.parent_id

        if (parentId) {
            const parentComment = getItemCommentDataById(state, parentId)
            parentComment.children.unshift(action.payload.id)
        } else {
            commentsData.results.unshift({
                id: action.payload.id,
                children: [],
            })
        }

        commentsData.count = action.payload.meta.count
        state.itemData!.isPostingComment = false
    },
    POST_SINGLE_ITEM_COMMENT_FAILURE(state: State, action: PayloadAction<number>) {
        state.itemData!.isPostingComment = false
        state.error = networkError
    },
}

export const saveSingleItems = {
    SAVE_SINGLE_ITEM(state: State, action: PayloadAction<DeserializedItem>) { },
    SAVE_SINGLE_ITEM_START(state: State, action: PayloadAction<number>) {
        state.itemData!.isSubmitting = true
    },
    SAVE_SINGLE_ITEM_SUCCESS(state: State, action: PayloadAction<number>) {
        state.itemData!.isSubmitting = false
        state.itemData!.isEditing = false
    },
    SAVE_SINGLE_ITEM_FAILURE(state: State, action: PayloadAction<number>) {
        state.itemData!.isSubmitting = false
        state.itemData!.itemError = networkError
    },
}
