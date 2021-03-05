import { createSlice } from '@reduxjs/toolkit'
import { CLEAR_APP_STATE } from 'store/slices/appSlices/appSlice'
import { ItemsDataState } from './itemsDataTypes'
import * as itemReducers from './itemDataReducers'

const initialState: ItemsDataState = {
    catalogueId: null,
    fetchingItems: false,
    creatingNewItem: false,
    newItemId: null,
    itemsDataError: {
        title: '',
        message: '',
    },
    count: null,
    pageSize: null,
    startIndex: null,
    endIndex: null,
    current: null,
    next: null,
    previous: null,
    results: [],
}

export const itemsDataSlice = createSlice({
    name: 'ITEMS_DATA',
    initialState,
    reducers: {
        ...itemReducers.fetchItemReducers,
        ...itemReducers.fetchItemsReducers,
        ...itemReducers.addItemReducers,
        ...itemReducers.editItemReducers,
        ...itemReducers.itemImageReducers,
        ...itemReducers.saveItem,
        ...itemReducers.deleteItem,
        ...itemReducers.itemsData,
        CLEAR_ITEMS_DATA() {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    REFRESH_ITEM, FETCH_ITEM, FETCH_ITEM_SUCCESS, FETCH_ITEM_START, FETCH_ITEM_FAILURE,
    FETCH_ITEMS, FETCH_ITEMS_START, FETCH_ITEMS_SUCCESS, FETCH_ITEMS_FAILURE,
    TOGGLE_EDIT_ITEM,
    ADD_ITEM, ADD_ITEM_START, ADD_ITEM_SUCCESS, ADD_ITEM_FAILURE,
    CHANGE_ITEM_FIELD_VALUE,
    ADD_IMAGE_TO_STATE,
    REMOVE_IMAGE_FROM_STATE,
    CHANGE_PRIMARY_IMAGE,
    SAVE_ITEM, SAVE_ITEM_START, SAVE_ITEM_SUCCESS, SAVE_ITEM_FAILURE,
    DELETE_ITEM, DELETE_ITEM_START, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE,
    CLEAR_ITEMS_DATA, CLEAR_ITEMS_DATA_ERROR,
} = itemsDataSlice.actions