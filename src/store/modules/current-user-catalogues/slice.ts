import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'

const initialState: T.CurrentUserCataloguesState = {
    cataloguesData: [],
    defaultCatalogueId: null,
    isFetchingCatalogues: true,
}

export const currentUserCataloguesSlice = createSlice({
    name: 'CURRENT_USER_CATALOGUES',
    initialState,
    reducers: {
        ...reducers.fetchCurrentUserCataloguesReducers,
        ...reducers.fetchCurrentUserCatalogueFieldsReducers,
        ...reducers.fetchFieldsChoicesReducers,
        CLEAR_CURRENT_USER_CATALOGUES_DATA() {
            return initialState
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    CLEAR_CURRENT_USER_CATALOGUES_DATA,
    FETCH_CURRENT_USER_CATALOGUES, FETCH_CURRENT_USER_CATALOGUES_START, FETCH_CURRENT_USER_CATALOGUES_SUCCESS, FETCH_CURRENT_USER_CATALOGUES_FAILURE,
    FETCH_CURRENT_USER_CATALOGUE_FIELDS, FETCH_CURRENT_USER_CATALOGUE_FIELDS_START, FETCH_CURRENT_USER_CATALOGUE_FIELDS_SUCCESS, FETCH_CURRENT_USER_CATALOGUE_FIELDS_FAILURE,
    FETCH_CURRENT_USER_FIELDS_CHOICES, FETCH_CURRENT_USER_FIELDS_CHOICES_START, FETCH_CURRENT_USER_FIELDS_CHOICES_SUCCESS, FETCH_CURRENT_USER_FIELDS_CHOICES_FAILURE,
} = currentUserCataloguesSlice.actions