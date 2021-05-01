import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'

export const initialState: T.TopItemsState = {
    itemsData: null,
    isFetchingItems: true,
    isFetchingData: true,
    error: null,
}

export const topItemsSlice = createSlice({
    name: 'TOP_ITEMS',
    initialState,
    reducers: {
        ...reducers.topItems,
        ...reducers.fetchTopItems,
        ...reducers.fetchTopItemsComments,
        ...reducers.fetchTopItemsCatalogues,
        ...reducers.fetchTopItemsFields,
        ...reducers.fetchTopItemsChoices,
        ...reducers.fetchTopItemComments,
        ...reducers.postTopItemComment,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    CLEAR_TOP_ITEMS,
    FETCH_TOP_ITEMS, FETCH_TOP_ITEMS_START, FETCH_TOP_ITEMS_SUCCESS, FETCH_TOP_ITEMS_FAILURE,
    FETCH_TOP_ITEMS_COMMENTS, FETCH_TOP_ITEMS_COMMENTS_SUCCESS, FETCH_TOP_ITEMS_COMMENTS_FAILURE,
    FETCH_TOP_ITEMS_CATALOGUES, FETCH_TOP_ITEMS_CATALOGUES_SUCCESS, FETCH_TOP_ITEMS_CATALOGUES_FAILURE,
    FETCH_TOP_ITEMS_FIELDS, FETCH_TOP_ITEMS_FIELDS_SUCCESS, FETCH_TOP_ITEMS_FIELDS_FAILURE, TOP_ITEMS_FIELDS_NOT_NEEDED,
    FETCH_TOP_ITEMS_CHOICES, FETCH_TOP_ITEMS_CHOICES_SUCCESS, FETCH_TOP_ITEMS_CHOICES_FAILURE,
    FETCH_TOP_ITEM_COMMENTS, FETCH_TOP_ITEM_COMMENTS_START, FETCH_TOP_ITEM_COMMENTS_SUCCESS, FETCH_TOP_ITEM_COMMENTS_FAILURE,
    POST_TOP_ITEM_COMMENT, POST_TOP_ITEM_COMMENT_START, POST_TOP_ITEM_COMMENT_SUCCESS, POST_TOP_ITEM_COMMENT_FAILURE,
} = topItemsSlice.actions