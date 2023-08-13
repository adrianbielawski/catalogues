import { createSlice } from '@reduxjs/toolkit'
import type * as T from './types'
import { CLEAR_APP_STATE } from 'store/modules/app/slice'
import * as reducers from './reducers'

export const initialState: T.RecommendedCataloguesState = {
  cataloguesData: null,
  isFetchingCatalogues: true,
  error: null,
}

export const recommendedCataloguesSlice = createSlice({
  name: 'RECOMMENDED_CATALOGUES',
  initialState,
  reducers: {
    ...reducers.recommendedCatalogues,
    ...reducers.fetchRecommendedCatalogues,
  },
  extraReducers: (builder) => {
    builder.addCase(CLEAR_APP_STATE, () => initialState)
  },
})

export const {
  CLEAR_RECOMMENDED_CATALOGUES,
  FETCH_RECOMMENDED_CATALOGUES,
  FETCH_RECOMMENDED_CATALOGUES_START,
  FETCH_RECOMMENDED_CATALOGUES_SUCCESS,
  FETCH_RECOMMENDED_CATALOGUES_FAILURE,
} = recommendedCataloguesSlice.actions
