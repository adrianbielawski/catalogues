import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'
import { listData } from 'src/constants'

const initialState: T.LatestFromFavouritesState = {
    itemsData: {
        ...listData
    },
    isFetchingItems: true,
    isFetchingData: true,
    error: null,
}

export const latestFromFavouritesSlice = createSlice({
    name: 'USER_DASHBOARD',
    initialState,
    reducers: {
        ...reducers.fetchLFF,
        ...reducers.fetchLFFItemsComments,
        ...reducers.fetchLFFCatalogues,
        ...reducers.fetchLFFFields,
        ...reducers.fetchLFFChoices,
        ...reducers.fetchLFFItemComments,
        ...reducers.postLFFItemComment,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    FETCH_LFF, FETCH_LFF_START, FETCH_LFF_SUCCESS, FETCH_LFF_FAILURE,
    FETCH_LFF_ITEMS_COMMENTS, FETCH_LFF_ITEMS_COMMENTS_SUCCESS, FETCH_LFF_ITEMS_COMMENTS_FAILURE,
    FETCH_LFF_CATALOGUES, FETCH_LFF_CATALOGUES_SUCCESS, FETCH_LFF_CATALOGUES_FAILURE,
    FETCH_LFF_FIELDS, FETCH_LFF_FIELDS_SUCCESS, FETCH_LFF_FIELDS_FAILURE, LFF_FIELDS_NOT_NEEDED,
    FETCH_LFF_CHOICES, FETCH_LFF_CHOICES_SUCCESS, FETCH_LFF_CHOICES_FAILURE,
    FETCH_LFF_ITEM_COMMENTS, FETCH_LFF_ITEM_COMMENTS_START, FETCH_LFF_ITEM_COMMENTS_SUCCESS, FETCH_LFF_ITEM_COMMENTS_FAILURE,
    POST_LFF_ITEM_COMMENT, POST_LFF_ITEM_COMMENT_START, POST_LFF_ITEM_COMMENT_SUCCESS, POST_LFF_ITEM_COMMENT_FAILURE,
} = latestFromFavouritesSlice.actions