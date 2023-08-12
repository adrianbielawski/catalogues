import { combineReducers } from '@reduxjs/toolkit'
import { latestCataloguesSlice } from './latest-catalogues/slice'
import { latestItemsSlice } from './latest-items/slice'

export const homepageSlice = combineReducers({
  latestCatalogues: latestCataloguesSlice.reducer,
  latestItems: latestItemsSlice.reducer,
})
