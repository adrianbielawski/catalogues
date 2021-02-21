import { PayloadAction } from '@reduxjs/toolkit'
import { mod } from 'src/utils'
import { itemDeserializer, listDeserializer } from 'src/serializers'
import { DeserializedItem } from 'src/globalTypes'
import * as T from './itemsDataTypes'
import { getFieldsValuesById, getFieldValueById, getItemById } from './ItemsDataSelectors'

type State = T.ItemsDataState

export const fetchItemReducers = {
    REFRESH_ITEM(state: State, action: PayloadAction<T.FetchItemPayload>) {},
    FETCH_ITEM(state: State, action: PayloadAction<T.FetchItemPayload>) {},
    FETCH_ITEM_START(state: State, action: PayloadAction<number>) {},
    FETCH_ITEM_SUCCESS(state: State, action: PayloadAction<T.FetchItemSuccessPayload>) {
        const item = getItemById(state, action.payload.itemId)
        Object.assign(item, itemDeserializer(action.payload.data))
    },
    FETCH_ITEM_FAILURE(state: State, action: PayloadAction<number | string>) {
        const item = getItemById(state, action.payload)
        item.isSubmitting = false
    },
}

export const fetchItemsReducers = {
    FETCH_ITEMS(state: State, action: PayloadAction<T.FetchItemsPayload>) {},
    FETCH_ITEMS_START(state: State) {
        state.fetchingItems = false
    },
    FETCH_ITEMS_SUCCESS(state: State, action: PayloadAction<T.FetchItemsSuccessPayload>) {
        const list = listDeserializer(action.payload.data, itemDeserializer)
        if (state.catalogueId === action.payload.catalogueId) {
            list.startIndex = 1
        }
        const prevResults = list.current === 1 ? [] : state.results
        return {
            ...list,
            results: prevResults.concat(list.results),
            catalogueId: action.payload.catalogueId,
            fetchingItems: false,
        }
    },
    FETCH_ITEMS_FAILURE(state: State) {
        state.fetchingItems = false
    },
}

export const EditItemReducers = {
    TOGGLE_EDIT_ITEM(state: State, action: PayloadAction<number | string>) {
        const item = getItemById(state, action.payload)
        item.isEditing = !item.isEditing
    },
    ADD_ITEM_TO_STATE(state: State, action: PayloadAction<number>) {
        const item = {
            id: `newItem_${Date.now()}`,
            createdBy: null,
            createdAt: '',
            modifiedAt: '',
            catalogueId: action.payload,
            fieldsValues: [],
            images: [],
            removedImages: [],
            isEditing: true,
            isSubmitting: false,
        }

        state.results.unshift(item)
    },
    REMOVE_ITEM_FROM_STATE(state: State, action: PayloadAction<number | string>) {
        state.results = state.results.filter(i => i.id !== action.payload)
    },
    CHANGE_ITEM_FIELD_VALUE(state: State, action: PayloadAction<T.ItemAndFieldIdPayload>) {
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

        const image = {
            id: `newImage${Date.now()}`,
            image: action.payload.image,
            imageThumbnail: '',
            isPrimary: item.images.length === 0,
            itemId: item.id,
        }
        item.images.push(image)
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
    SAVE_ITEM(state: State, action: PayloadAction<DeserializedItem>) {},
    SAVE_ITEM_START(state: State, action: PayloadAction<number | string>) {
        const item = getItemById(state, action.payload)
        item.isSubmitting = true
    },
    SAVE_ITEM_SUCCESS(state: State, action: PayloadAction<T.SaveItemSuccessPayload>) {
        const item = getItemById(state, action.payload.prevId)
        item.isSubmitting = false
        item.isEditing = false
    },
    SAVE_ITEM_FAILURE(state: State, action: PayloadAction<number | string>) {
        const item = getItemById(state, action.payload)
        item.isSubmitting = false
    },
}