import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'

const initialState: T.CurrentUserItemsState = {
    itemsData: null,
    catalogueId: null,
    isFetchingItems: true,
    isCreatingNewItem: false,
    newItemId: null,
    itemsDataError: null,
}

export const currentUserItemsSlice = createSlice({
    name: 'CURRENT_USER_ITEMS',
    initialState,
    reducers: {
        ...reducers.currentUserItems,
        ...reducers.fetchCurrentUserItem,
        ...reducers.fetchCurrentUserItems,
        ...reducers.addItem,
        ...reducers.editItem,
        ...reducers.saveItem,
        ...reducers.deleteItem,
        ...reducers.changeItemRating,
        ...reducers.changeFavouriteItem,
        ...reducers.fetchItemComments,
        ...reducers.fetchItemsComments,
        ...reducers.postItemComment,
        CLEAR_ITEMS_DATA() {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    REFRESH_CURRENT_USER_ITEM, CLEAR_ITEMS_DATA, CLEAR_ITEMS_DATA_ERROR, CLEAR_ITEM_ERROR,
    FETCH_CURRENT_USER_ITEM, FETCH_CURRENT_USER_ITEM_START, FETCH_CURRENT_USER_ITEM_SUCCESS, FETCH_CURRENT_USER_ITEM_FAILURE,
    FETCH_CURRENT_USER_ITEMS, FETCH_CURRENT_USER_ITEMS_START, FETCH_CURRENT_USER_ITEMS_SUCCESS, FETCH_CURRENT_USER_ITEMS_FAILURE,
    ADD_ITEM, ADD_ITEM_START, ADD_ITEM_SUCCESS, ADD_ITEM_FAILURE,
    TOGGLE_EDIT_ITEM,
    SAVE_ITEM, SAVE_ITEM_START, SAVE_ITEM_SUCCESS, SAVE_ITEM_FAILURE,
    DELETE_ITEM, DELETE_ITEM_START, DELETE_ITEM_SUCCESS, DELETE_ITEM_FAILURE,
    CHANGE_ITEM_RATING, CHANGE_ITEM_RATING_FAILURE,
    CHANGE_FAVOURITE_ITEM, CHANGE_FAVOURITE_ITEM_SUCCESS, CHANGE_FAVOURITE_ITEM_FAILURE,
    FETCH_ITEM_COMMENTS, FETCH_ITEM_COMMENTS_START, FETCH_ITEM_COMMENTS_SUCCESS, FETCH_ITEM_COMMENTS_FAILURE,
    FETCH_ITEMS_COMMENTS, FETCH_ITEMS_COMMENTS_START, FETCH_ITEMS_COMMENTS_SUCCESS, FETCH_ITEMS_COMMENTS_FAILURE,
    POST_ITEM_COMMENT, POST_ITEM_COMMENT_START, POST_ITEM_COMMENT_SUCCESS, POST_ITEM_COMMENT_FAILURE,
} = currentUserItemsSlice.actions