import { PayloadAction } from '@reduxjs/toolkit'
import { mod } from 'src/utils'
import {
    itemCommentChildrenDeserializer, itemCommentDeserializer, itemDeserializer, itemRatingDeserializer, listDeserializer
} from 'src/serializers'
import { DeserializedItem, DeserializedItemCommentParent, DeserializedItemField, Item } from 'src/globalTypes'
import * as T from './itemsDataTypes'
import { getCommentById, getFieldsValuesById, getFieldValueById, getItemById } from './ItemsDataSelectors'

type State = T.ItemsDataState

export const fetchItemReducers = {
    REFRESH_ITEM(state: State, action: PayloadAction<number>) { },
    FETCH_ITEM(state: State, action: PayloadAction<number>) { },
    FETCH_ITEM_START(state: State, action: PayloadAction<number>) { },
    FETCH_ITEM_SUCCESS(state: State, action: PayloadAction<T.FetchItemSuccessPayload>) {
        const item = getItemById(state, action.payload.itemId)
        Object.assign(item, itemDeserializer(action.payload.data))
    },
    FETCH_ITEM_FAILURE(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.isSubmitting = false
    },
}

export const fetchItemsReducers = {
    FETCH_ITEMS(state: State, action: PayloadAction<T.FetchItemsPayload>) { },
    FETCH_ITEMS_START(state: State) {
        state.fetchingItems = true
    },
    FETCH_ITEMS_SUCCESS(state: State, action: PayloadAction<T.FetchItemsSuccessPayload>) {
        const list = listDeserializer(action.payload.data, itemDeserializer)
        if (state.catalogueId === action.payload.catalogueId) {
            list.startIndex = 1
        }
        const prevResults = list.current === 1 ? [] : state.results
        return {
            ...state,
            ...list,
            results: prevResults.concat(list.results),
            catalogueId: action.payload.catalogueId,
            fetchingItems: false,
            creatingNewItem: false,
        }
    },
    FETCH_ITEMS_FAILURE(state: State) {
        state.fetchingItems = false
    },
}

export const addItemReducers = {
    ADD_ITEM(state: State, action: PayloadAction<number>) { },
    ADD_ITEM_START(state: State) {
        state.creatingNewItem = true
    },
    ADD_ITEM_SUCCESS(state: State, action: PayloadAction<Item>) {
        state.results.unshift(itemDeserializer(action.payload))
        state.newItemId = action.payload.id
        state.creatingNewItem = false
    },
    ADD_ITEM_FAILURE(state: State) {
        state.creatingNewItem = false
        state.itemsDataError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
}

export const editItemReducers = {
    TOGGLE_EDIT_ITEM(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.isEditing = !item.isEditing
    },
    CHANGE_ITEM_FIELD_VALUE(state: State, action: PayloadAction<DeserializedItemField>) {
        const fieldsValues = getFieldsValuesById(state, action.payload.itemId)
        const fieldValue = fieldsValues.filter(f => f.fieldId === action.payload.fieldId)[0]

        const newField = {
            itemId: action.payload.itemId,
            fieldId: action.payload.fieldId,
            value: action.payload.value,
        }

        if (fieldValue) {
            const selectedFieldValue = getFieldValueById(
                state,
                action.payload.itemId,
                action.payload.fieldId,
            )
            Object.assign(selectedFieldValue, newField)
        } else {
            fieldsValues.push(newField)
        }
    },
}

export const itemImageReducers = {
    ADD_IMAGE_TO_STATE(state: State, action: PayloadAction<T.AddImageToStatePayload>) {
        const item = getItemById(state, action.payload.itemId)

        action.payload.images.forEach((image, i) => {
            item.images.push({
                id: `newImage_${i}_${Date.now()}`,
                image,
                imageThumbnail: '',
                isPrimary: item.images.length === 0,
                itemId: item.id,
            })
        })
    },
    REMOVE_IMAGE_FROM_STATE(state: State, action: PayloadAction<T.ImagePayload>) {
        const item = getItemById(state, action.payload.itemId)
        const removedImage = item.images[action.payload.index]

        if (removedImage.isPrimary) {
            let newPrimaryIndex = mod(action.payload.index + 1, item.images.length)
            item.images[newPrimaryIndex].isPrimary = true
        }

        if (!removedImage.id.toString().startsWith('newImage')) {
            item.removedImages.push(removedImage)
        }
        item.images.splice(action.payload.index, 1)
    },
    CHANGE_PRIMARY_IMAGE(state: State, action: PayloadAction<T.ImagePayload>) {
        const item = getItemById(state, action.payload.itemId)
        const prevPrimary = item.images.findIndex(img => img.isPrimary)
        item.images[prevPrimary].isPrimary = false
        item.images[action.payload.index].isPrimary = true
    },
}

export const saveItem = {
    SAVE_ITEM(state: State, action: PayloadAction<DeserializedItem>) { },
    SAVE_ITEM_START(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.isSubmitting = true
    },
    SAVE_ITEM_SUCCESS(state: State, action: PayloadAction<number>) {
        state.newItemId = null
    },
    SAVE_ITEM_FAILURE(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.isSubmitting = false
    },
}

export const deleteItem = {
    DELETE_ITEM(state: State, action: PayloadAction<number>) { },
    DELETE_ITEM_START(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.isDeleting = true
    },
    DELETE_ITEM_SUCCESS(state: State, action: PayloadAction<number>) {
        const itemIndex = state.results.findIndex(item => item.id === action.payload)
        state.results.splice(itemIndex, 1)
        state.newItemId = null
    },
    DELETE_ITEM_FAILURE(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.isDeleting = false
    },
}

export const itemsData = {
    CLEAR_ITEMS_DATA_ERROR(state: State, action: PayloadAction<number>) {
        state.itemsDataError = {
            title: '',
            message: '',
        }
    },
}

export const changeItemRating = {
    CHANGE_ITEM_RATING(state: State, action: PayloadAction<T.ChangeItemRatingPayload>) {
        const item = getItemById(state, action.payload.itemId)
        item.rating.currentUser = action.payload.rating
    },
    CHANGE_ITEM_RATING_SUCCESS(state: State, action: PayloadAction<T.ChangeItemRatingSuccessPayload>) {
        const item = getItemById(state, action.payload.itemId)
        item.rating = itemRatingDeserializer(action.payload.rating)
    },
    CHANGE_ITEM_RATING_FAILURE(state: State) { },
}

export const addItemToFavourite = {
    ADD_ITEM_TO_FAVOURITE(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.isFavourite = true
    },
    ADD_ITEM_TO_FAVOURITE_SUCCESS(state: State) { },
    ADD_ITEM_TO_FAVOURITE_FAILURE(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.isFavourite = false
        state.itemsDataError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
}

export const deleteItemFromFavourite = {
    DELETE_ITEM_FROM_FAVOURITE(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.isFavourite = false
    },
    DELETE_ITEM_FROM_FAVOURITE_SUCCESS(state: State) { },
    DELETE_ITEM_FROM_FAVOURITE_FAILURE(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.isFavourite = true
        state.itemsDataError = {
            title: 'Network error',
            message: 'Something went wrong. Plaese try again.',
        }
    },
}

export const fetchItemComments = {
    FETCH_ITEM_COMMENTS(state: State, action: PayloadAction<T.FetchItemCommentsPayload>) { },
    FETCH_ITEM_COMMENTS_START(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.fetchingComments = true
    },
    FETCH_ITEM_COMMENTS_SUCCESS(state: State, action: PayloadAction<T.FetchItemCommentsSuccessPayload>) {
        const item = getItemById(state, action.payload.itemId)

        const list = listDeserializer(action.payload.data, itemCommentDeserializer)
        list.startIndex = 1
        const prevResults = list.current === 1 ? [] : item.commentsData!.results

        item.fetchingComments = false
        item.commentsData = {
            ...list,
            results: prevResults.concat(list.results),
        }
    },
    FETCH_ITEM_COMMENTS_FAILURE(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.fetchingComments = false
    },
}

export const postItemComment = {
    POST_ITEM_COMMENT(state: State, action: PayloadAction<T.PostItemCommentPayload>) { },
    POST_ITEM_COMMENT_START(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.postingComment = true
    },
    POST_ITEM_COMMENT_SUCCESS(state: State, action: PayloadAction<T.PostItemCommentSuccessPayload>) {
        const newComment = itemCommentChildrenDeserializer(action.payload)
        const item = getItemById(state, newComment.itemId)
        const parent = action.payload.parent_id

        if (parent) {
            const comment = getCommentById(state, newComment.itemId, parent) as DeserializedItemCommentParent
            comment.children.unshift(newComment)
        } else {
            item.commentsData?.results.unshift({
                ...newComment,
                children: []
            })
        }

        item.commentsData!.count = action.payload.meta.count
        item.postingComment = false
    },
    POST_ITEM_COMMENT_FAILURE(state: State, action: PayloadAction<number>) {
        const item = getItemById(state, action.payload)
        item.fetchingComments = false
    },
}