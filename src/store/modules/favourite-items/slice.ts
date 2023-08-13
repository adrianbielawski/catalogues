import { createSlice } from '@reduxjs/toolkit'
import type * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'
import { networkError } from 'src/constants'
import {
  CHANGE_FAVOURITE_ITEM,
  CHANGE_FAVOURITE_ITEM_FAILURE,
} from '../current-user-items/slice'

const initialState: T.FavouriteItemsSliceState = {
  itemsData: null,
  cataloguesIds: [],
  isFetchingItems: true,
  isFetchingFavItemsData: true,
  error: null,
}

export const favouriteItemsSlice = createSlice({
  name: 'FAVOURITE_ITEMS',
  initialState,
  reducers: {
    ...reducers.favouriteItems,
    ...reducers.fetchFavouriteItems,
    ...reducers.fetchFavouriteItemsComments,
    ...reducers.fetchFavouriteItemsData,
    ...reducers.fetchFavouriteItemsFields,
    ...reducers.fetchFavouriteItemsChoices,
    ...reducers.fetchFavouriteItemComments,
    ...reducers.postFavouriteItemComment,
    CLEAR_FAVOURITE_ITEMS_DATA() {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CLEAR_APP_STATE, () => initialState)
    builder.addCase(CHANGE_FAVOURITE_ITEM, (state, action) => {
      if (state.itemsData != null && !action.payload.isFavourite) {
        const index = state.itemsData.results.findIndex(
          (i) => i.id === action.payload.itemId,
        )
        state.itemsData.results.splice(index, 1)
      }
    })
    builder.addCase(CHANGE_FAVOURITE_ITEM_FAILURE, (state) => {
      state.error = networkError
    })
  },
})

export const {
  CLEAR_FAVOURITE_ITEMS_ERROR,
  CLEAR_FAVOURITE_ITEMS_DATA,
  FETCH_FAVOURITE_ITEMS,
  FETCH_FAVOURITE_ITEMS_START,
  FETCH_FAVOURITE_ITEMS_SUCCESS,
  FETCH_FAVOURITE_ITEMS_FAILURE,
  FETCH_FAVOURITE_ITEMS_COMMENTS,
  FETCH_FAVOURITE_ITEMS_COMMENTS_SUCCESS,
  FETCH_FAVOURITE_ITEMS_COMMENTS_FAILURE,
  FETCH_FAVOURITE_ITEMS_DATA,
  FETCH_FAVOURITE_ITEMS_DATA_SUCCESS,
  FETCH_FAVOURITE_ITEMS_DATA_FAILURE,
  FETCH_FAVOURITE_ITEMS_FIELDS,
  FETCH_FAVOURITE_ITEMS_FIELDS_SUCCESS,
  FETCH_FAVOURITE_ITEMS_FIELDS_FAILURE,
  FAVOURITE_ITEMS_FIELDS_NOT_NEEDED,
  FETCH_FAVOURITE_ITEMS_CHOICES,
  FETCH_FAVOURITE_ITEMS_CHOICES_SUCCESS,
  FETCH_FAVOURITE_ITEMS_CHOICES_FAILURE,
  FAVOURITE_ITEMS_CHOICES_NOT_NEEDED,
  FETCH_FAVOURITE_ITEM_COMMENTS,
  FETCH_FAVOURITE_ITEM_COMMENTS_START,
  FETCH_FAVOURITE_ITEM_COMMENTS_SUCCESS,
  FETCH_FAVOURITE_ITEM_COMMENTS_FAILURE,
  FAVOURITE_ITEMS_COMMENTS_NOT_NEEDED,
  POST_FAVOURITE_ITEM_COMMENT,
  POST_FAVOURITE_ITEM_COMMENT_START,
  POST_FAVOURITE_ITEM_COMMENT_SUCCESS,
  POST_FAVOURITE_ITEM_COMMENT_FAILURE,
} = favouriteItemsSlice.actions
