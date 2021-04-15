import { combineReducers } from "@reduxjs/toolkit"
import { authUserCataloguesSlice } from "./auth-user-catalogues/slice"
import { authUserFavouritesSlice } from "./auth-user-favourites/slice"
import { authUserDashboardSlice } from "./auth-user-dashboard/slice"
import { currentUserCataloguesSlice } from "store/modules/current-user-catalogues/slice"
import { currentUserItemsSlice } from "./current-user-items/slice"

export const modules = combineReducers({
    authUserCatalogues: authUserCataloguesSlice.reducer,
    authUserFavoirites: authUserFavouritesSlice.reducer,
    authUserDashboard: authUserDashboardSlice.reducer,
    currentUserCatalogues: currentUserCataloguesSlice.reducer,
    currentUserItems: currentUserItemsSlice.reducer,
})