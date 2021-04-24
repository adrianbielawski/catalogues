import { combineReducers } from "@reduxjs/toolkit"
import { latestCataloguesSlice } from "./latest-catalogues/slice"

export const homepageSlice = combineReducers({
    latestCatalogues: latestCataloguesSlice.reducer,
})