import { combineReducers } from "@reduxjs/toolkit"
import { latestFromFavouritesSlice } from "./latestFromFavourites/slice"
import { recomendedCataloguesSlice } from "./recomendedCatalogues/slice"

export const authUserDashboardSlice = combineReducers({
    recomendedCatalogues: recomendedCataloguesSlice.reducer,
    latestFromFavourites: latestFromFavouritesSlice.reducer,
})