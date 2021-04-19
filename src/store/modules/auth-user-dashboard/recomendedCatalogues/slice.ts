import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'
import { listData } from 'src/constants'

const initialState: T.RecomendedCataloguesState = {
    cataloguesData: {
        ...listData
    },
    isFetchingCatalogues: true,
    error: null,
}

export const recomendedCataloguesSlice = createSlice({
    name: 'RECOMENDED_CATALOGUES',
    initialState,
    reducers: {
        ...reducers.fetchRecomendedCatalogues,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    FETCH_RECOMENDED_CATALOGUES, FETCH_RECOMENDED_CATALOGUES_START, FETCH_RECOMENDED_CATALOGUES_SUCCESS, FETCH_RECOMENDED_CATALOGUES_FAILURE,
} = recomendedCataloguesSlice.actions