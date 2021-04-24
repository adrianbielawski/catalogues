import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'
import { listData } from 'src/constants'

const initialState: T.LatestCataloguesState = {
    cataloguesData: {
        ...listData,
    },
    isFetchingCatalogues: true,
    error: null,
}

export const latestCataloguesSlice = createSlice({
    name: 'LATEST_CATALOGUES',
    initialState,
    reducers: {
        ...reducers.fetchLatestCatalogues,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    FETCH_LATEST_CATALOGUES, FETCH_LATEST_CATALOGUES_START, FETCH_LATEST_CATALOGUES_SUCCESS, FETCH_LATEST_CATALOGUES_FAILURE,
} = latestCataloguesSlice.actions