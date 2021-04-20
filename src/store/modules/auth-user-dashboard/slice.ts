import { combineReducers } from "@reduxjs/toolkit"
import { latestFromFavouritesSlice } from "./latest-from-favourites/slice"
import { recomendedCataloguesSlice } from "./recomended-catalogues/slice"
import { topItemsSlice } from "./top-items/slice"

export const authUserDashboardSlice = combineReducers({
    recomendedCatalogues: recomendedCataloguesSlice.reducer,
    latestFromFavourites: latestFromFavouritesSlice.reducer,
    topItems: topItemsSlice.reducer,
})