import { createSlice } from '@reduxjs/toolkit'
import { SingleItemSliceState } from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'

export const initialState: SingleItemSliceState = {
    itemData: null,
    catalogueData: null,
    isFetchingItem: true,
    isFetchingData: true,
    error: null,
}

export const singleItemSlice = createSlice({
    name: 'SINGLE_ITEM',
    initialState,
    reducers: {
        ...reducers.singleItems,
        ...reducers.fetchSingleItem,
        ...reducers.fetchSingleItemComments,
        ...reducers.fetchSingleItemCatalogues,
        ...reducers.fetchSingleItemFields,
        ...reducers.fetchSingleItemChoices,
        ...reducers.fetchSingleItemComments,
        ...reducers.postSingleItemComment,
        ...reducers.saveSingleItems,
        CLEAR_SINGLE_ITEM_DATA() {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    CLEAR_SINGLE_ITEM_ERROR, CLEAR_SINGLE_ITEM_DATA, TOGGLE_EDIT_SINGLE_ITEM, REFRESH_SINGLE_ITEM, FETCH_MORE_SINGLE_ITEM_COMMENTS,
    FETCH_SINGLE_ITEM, FETCH_SINGLE_ITEM_START, FETCH_SINGLE_ITEM_SUCCESS, FETCH_SINGLE_ITEM_FAILURE,
    FETCH_SINGLE_ITEM_COMMENTS, FETCH_SINGLE_ITEM_COMMENTS_SUCCESS, FETCH_SINGLE_ITEM_COMMENTS_FAILURE,
    FETCH_SINGLE_ITEM_CATALOGUE, FETCH_SINGLE_ITEM_CATALOGUE_SUCCESS, FETCH_SINGLE_ITEM_CATALOGUE_FAILURE,
    FETCH_SINGLE_ITEM_FIELDS, FETCH_SINGLE_ITEM_FIELDS_SUCCESS, FETCH_SINGLE_ITEM_FIELDS_FAILURE, SINGLE_ITEM_FIELDS_NOT_NEEDED,
    FETCH_SINGLE_ITEM_CHOICES, FETCH_SINGLE_ITEM_CHOICES_SUCCESS, FETCH_SINGLE_ITEM_CHOICES_FAILURE, SINGLE_ITEM_CHOICES_NOT_NEEDED,
    POST_SINGLE_ITEM_COMMENT, POST_SINGLE_ITEM_COMMENT_START, POST_SINGLE_ITEM_COMMENT_SUCCESS, POST_SINGLE_ITEM_COMMENT_FAILURE,
    SAVE_SINGLE_ITEM, SAVE_SINGLE_ITEM_START, SAVE_SINGLE_ITEM_SUCCESS, SAVE_SINGLE_ITEM_FAILURE, 
} = singleItemSlice.actions