import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'
import { mod } from 'src/utils'
import { CLEAR_APP_STATE } from 'store/slices/appSlices/appSlice'
import { itemDeserializer, listDeserializer } from 'src/serializers'
import { DeserializedItem } from 'src/globalTypes'
import {
    AddImageToStatePayload, FetchItemPayload, FetchItemSuccessPayload, FetchItemsPayload, ImagePayload,
    ItemAndFieldIdPayload, ItemsDataState, SaveItemSuccessPayload, FetchItemsSuccessPayload,
} from './itemsDataTypes'
import { getFieldsValuesById, getFieldValueById, getItemById } from './ItemsDataSelectors'

const initialState: ItemsDataState = {
    catalogueId: null,
    fetchingItems: false,
    count: null,
    pageSize: null,
    startIndex: null,
    endIndex: null,
    current: null,
    next: null,
    previous: null,
    results: [],
}

export const REFRESH_ITEM = createAction<FetchItemPayload>('ITEMS_DATA/REFRESH_ITEM')
export const FETCH_ITEM = createAction<FetchItemPayload>('ITEMS_DATA/FETCH_ITEM')
export const FETCH_ITEM_START = createAction<number>('ITEMS_DATA/FETCH_ITEM_START')
export const FETCH_ITEMS = createAction<FetchItemsPayload>('ITEMS_DATA/FETCH_ITEMS')
export const SAVE_ITEM = createAction<DeserializedItem>('ITEMS_DATA/SAVE_ITEM')
export const SAVE_ITEM_SUCCESS = createAction<SaveItemSuccessPayload>('ITEMS_DATA/SAVE_ITEM_SUCCESS')

export const itemsDataSlice = createSlice({
    name: 'ITEMS_DATA',
    initialState,
    reducers: {
        FETCH_ITEM_SUCCESS(state, action: PayloadAction<FetchItemSuccessPayload>) {
            const item = getItemById(state, action.payload.itemId)
            Object.assign(item, itemDeserializer(action.payload.data))
        },
        FETCH_ITEM_FAILURE(state, action: PayloadAction<number | string>) {
            const item = getItemById(state, action.payload)
            item.isSubmitting = false
        },
        FETCH_ITEMS_START(state) {
            state.fetchingItems = false
        },
        FETCH_ITEMS_SUCCESS(state, action: PayloadAction<FetchItemsSuccessPayload>) {
            const prevState = cloneDeep(state)
            const list = listDeserializer(action.payload.data, itemDeserializer)
            if (prevState.catalogueId === action.payload.catalogueId) {
                list.startIndex = prevState.startIndex || 1
                list.results.unshift(...prevState.results)
            }
            const newState: ItemsDataState = {
                ...list,
                catalogueId: action.payload.catalogueId,
                fetchingItems: false,
            }
            return newState
        },
        FETCH_ITEMS_FAILURE(state) {
            state.fetchingItems = false
        },
        TOGGLE_EDIT_ITEM(state, action: PayloadAction<number | string>) {
            const item = getItemById(state, action.payload)
            item.isEditing = !item.isEditing
        },
        ADD_ITEM_TO_STATE(state, action: PayloadAction<number>) {
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
        REMOVE_ITEM_FROM_STATE(state, action: PayloadAction<number | string>) {
            state.results = state.results.filter(i => i.id !== action.payload)
        },
        CHANGE_ITEM_FIELD_VALUE(state, action: PayloadAction<ItemAndFieldIdPayload>) {
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
        ADD_IMAGE_TO_STATE(state, action: PayloadAction<AddImageToStatePayload>) {
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
        REMOVE_IMAGE_FROM_STATE(state, action: PayloadAction<ImagePayload>) {
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
        CHANGE_PRIMARY_IMAGE(state, action: PayloadAction<ImagePayload>) {
            const item = getItemById(state, action.payload.itemId)
            const prevPrimary = item.images.findIndex(img => img.isPrimary)
            item.images[prevPrimary].isPrimary = false
            item.images[action.payload.index].isPrimary = true
        },
        SAVE_ITEM_START(state, action: PayloadAction<number | string>) {
            const item = getItemById(state, action.payload)
            item.isSubmitting = true
        },
        SAVE_ITEM_FAILURE(state, action: PayloadAction<number | string>) {
            const item = getItemById(state, action.payload)
            item.isSubmitting = false
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    FETCH_ITEM_SUCCESS, FETCH_ITEM_FAILURE,
    FETCH_ITEMS_START, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE,
    TOGGLE_EDIT_ITEM,
    ADD_ITEM_TO_STATE,
    REMOVE_ITEM_FROM_STATE,
    CHANGE_ITEM_FIELD_VALUE,
    ADD_IMAGE_TO_STATE,
    REMOVE_IMAGE_FROM_STATE,
    CHANGE_PRIMARY_IMAGE,
    SAVE_ITEM_START, SAVE_ITEM_FAILURE,
} = itemsDataSlice.actions