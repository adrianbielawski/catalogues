import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as favCataloguesReducers from './reducers/authUserFavouritesReducers'

const initialState: T.CurrentUserFavCataloguesState = {
    cataloguesIds: [],
    fetchingCatalogues: true,
}

export const authUserFavouritesSlice = createSlice({
    name: 'AUTH_USER_FAVOURITES',
    initialState,
    reducers: {
        ...favCataloguesReducers.fetchFavouriteCataloguesReducers
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    //Favourite catalogues
    FETCH_FAVOURITE_CATALOGUES, FETCH_FAVOURITE_CATALOGUES_START, FETCH_FAVOURITE_CATALOGUES_SUCCESS, FETCH_FAVOURITE_CATALOGUES_FAILURE,
    //Favourite items
} = authUserFavouritesSlice.actions