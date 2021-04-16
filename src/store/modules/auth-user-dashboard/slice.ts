import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'

const initialState: T.RecomendedCataloguesState = {
    recomendedCataloguesData: {
        count: null,
        pageSize: null,
        startIndex: null,
        endIndex: null,
        current: null,
        next: null,
        previous: null,
        results: [],
        isFetchingCatalogues: true
    },
}

export const authUserDashboardSlice = createSlice({
    name: 'USER_DASHBOARD',
    initialState,
    reducers: {
        ...reducers.fetchRecomendedCataloguesReducers
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    FETCH_RECOMENDED_CATALOGUES, FETCH_RECOMENDED_CATALOGUES_START, FETCH_RECOMENDED_CATALOGUES_SUCCESS, FETCH_RECOMENDED_CATALOGUES_FAILURE,
} = authUserDashboardSlice.actions