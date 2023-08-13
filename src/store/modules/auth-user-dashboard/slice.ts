import { combineReducers } from '@reduxjs/toolkit'
import { latestFromFavouritesSlice } from './latest-from-favourites/slice'
import { recommendedCataloguesSlice } from './recommended-catalogues/slice'
import { topItemsSlice } from './top-items/slice'

export const authUserDashboardSlice = combineReducers({
  recommendedCatalogues: recommendedCataloguesSlice.reducer,
  latestFromFavourites: latestFromFavouritesSlice.reducer,
  topItems: topItemsSlice.reducer,
})
