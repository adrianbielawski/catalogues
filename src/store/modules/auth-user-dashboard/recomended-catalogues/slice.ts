import { createSlice } from '@reduxjs/toolkit'
import * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'
import { listData } from 'src/constants'

const initialState: T.RecommendedCataloguesState = {
    cataloguesData: {
        ...listData
    },
    isFetchingCatalogues: true,
    error: null,
}

export const recomendedCataloguesSlice = createSlice({
    name: 'RECOMMENDED_CATALOGUES',
    initialState,
    reducers: {
        ...reducers.fetchRecommendedCatalogues,
    },
    extraReducers: (builder) => {
        builder.addCase(CLEAR_APP_STATE, () => initialState)
    },
})

export const {
    FETCH_RECOMMENDED_CATALOGUES, FETCH_RECOMMENDED_CATALOGUES_START, FETCH_RECOMMENDED_CATALOGUES_SUCCESS, FETCH_RECOMMENDED_CATALOGUES_FAILURE,
} = recomendedCataloguesSlice.actions