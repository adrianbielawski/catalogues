import { createSlice } from '@reduxjs/toolkit'
import type * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'

export const initialState: T.LatestItemsState = {
  itemsData: null,
  isFetchingItems: true,
  isFetchingData: true,
  error: null,
}

export const latestItemsSlice = createSlice({
  name: 'LATEST_ITEMS',
  initialState,
  reducers: {
    ...reducers.latestItems,
    ...reducers.fetchLatestItems,
    ...reducers.fetchLatestItemsComments,
    ...reducers.fetchLatestItemsCatalogues,
    ...reducers.fetchLatestItemsFields,
    ...reducers.fetchLatestItemsChoices,
    ...reducers.fetchLatestItemComments,
    ...reducers.postLatestItemComment,
  },
  extraReducers: (builder) => {
    builder.addCase(CLEAR_APP_STATE, () => initialState)
  },
})

export const {
  CLEAR_LATEST_ITEMS,
  FETCH_LATEST_ITEMS,
  FETCH_LATEST_ITEMS_START,
  FETCH_LATEST_ITEMS_SUCCESS,
  FETCH_LATEST_ITEMS_FAILURE,
  FETCH_LATEST_ITEMS_COMMENTS,
  FETCH_LATEST_ITEMS_COMMENTS_SUCCESS,
  FETCH_LATEST_ITEMS_COMMENTS_FAILURE,
  FETCH_LATEST_ITEMS_CATALOGUES,
  FETCH_LATEST_ITEMS_CATALOGUES_SUCCESS,
  FETCH_LATEST_ITEMS_CATALOGUES_FAILURE,
  FETCH_LATEST_ITEMS_FIELDS,
  FETCH_LATEST_ITEMS_FIELDS_SUCCESS,
  FETCH_LATEST_ITEMS_FIELDS_FAILURE,
  LATEST_ITEMS_FIELDS_NOT_NEEDED,
  FETCH_LATEST_ITEMS_CHOICES,
  FETCH_LATEST_ITEMS_CHOICES_SUCCESS,
  FETCH_LATEST_ITEMS_CHOICES_FAILURE,
  FETCH_LATEST_ITEM_COMMENTS,
  FETCH_LATEST_ITEM_COMMENTS_START,
  FETCH_LATEST_ITEM_COMMENTS_SUCCESS,
  FETCH_LATEST_ITEM_COMMENTS_FAILURE,
  POST_LATEST_ITEM_COMMENT,
  POST_LATEST_ITEM_COMMENT_START,
  POST_LATEST_ITEM_COMMENT_SUCCESS,
  POST_LATEST_ITEM_COMMENT_FAILURE,
} = latestItemsSlice.actions
