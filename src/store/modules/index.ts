import { combineReducers } from "@reduxjs/toolkit"
import { authUserCataloguesSlice } from "./auth-user-catalogues/slice"
import { authUserFavouritesSlice } from "./auth-user-favourites/slice"
import { authUserDashboardSlice } from "./auth-user-dashboard/slice"
import { currentUserCataloguesSlice } from "store/modules/current-user-catalogues/slice"

export const modules = combineReducers({
    authUserCatalogues: authUserCataloguesSlice.reducer,
    authUserFavoirites: authUserFavouritesSlice.reducer,
    authUserDashboard: authUserDashboardSlice.reducer,
    currentUserCatalogues: currentUserCataloguesSlice.reducer,
})