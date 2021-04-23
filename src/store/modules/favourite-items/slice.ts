import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'
import { listData } from 'src/constants'

const initialState: T.FavouriteItemsSliceState = {
    itemsData: {
        ...listData
    },
    cataloguesIds: [],
    isFetchingItems: true,
    isFetchingData: true,
    error: null,
}

export const favouriteItemsSlice = createSlice({
    name: 'FAVOURITE_ITEMS',
    initialState,
    reducers: {
        ...reducers.fetchFavouriteItems,
        ...reducers.fetchFavouriteItemsComments,
        ...reducers.fetchFavouriteItemsCatalogues,
        ...reducers.fetchFavouriteItemsFields,
        ...reducers.fetchFavouriteItemsChoices,
        ...reducers.fetchFavouriteItemComments,
        ...reducers.postFavouriteItemComment,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    FETCH_FAVOURITE_ITEMS, FETCH_FAVOURITE_ITEMS_START, FETCH_FAVOURITE_ITEMS_SUCCESS, FETCH_FAVOURITE_ITEMS_FAILURE,
    FETCH_FAVOURITE_ITEMS_COMMENTS, FETCH_FAVOURITE_ITEMS_COMMENTS_SUCCESS, FETCH_FAVOURITE_ITEMS_COMMENTS_FAILURE,
    FETCH_FAVOURITE_ITEMS_CATALOGUES, FETCH_FAVOURITE_ITEMS_CATALOGUES_SUCCESS, FETCH_FAVOURITE_ITEMS_CATALOGUES_FAILURE,
    FETCH_FAVOURITE_ITEMS_FIELDS, FETCH_FAVOURITE_ITEMS_FIELDS_SUCCESS, FETCH_FAVOURITE_ITEMS_FIELDS_FAILURE, FAVOURITE_ITEMS_FIELDS_NOT_NEEDED,
    FETCH_FAVOURITE_ITEMS_CHOICES, FETCH_FAVOURITE_ITEMS_CHOICES_SUCCESS, FETCH_FAVOURITE_ITEMS_CHOICES_FAILURE,
    FETCH_FAVOURITE_ITEM_COMMENTS, FETCH_FAVOURITE_ITEM_COMMENTS_START, FETCH_FAVOURITE_ITEM_COMMENTS_SUCCESS, FETCH_FAVOURITE_ITEM_COMMENTS_FAILURE,
    POST_FAVOURITE_ITEM_COMMENT, POST_FAVOURITE_ITEM_COMMENT_START, POST_FAVOURITE_ITEM_COMMENT_SUCCESS, POST_FAVOURITE_ITEM_COMMENT_FAILURE,
} = favouriteItemsSlice.actions