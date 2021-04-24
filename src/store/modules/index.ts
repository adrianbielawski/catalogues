import { combineReducers } from "@reduxjs/toolkit"
import { appSlice } from "./app/slice"
import { authUserSlice } from "./auth-user/slice"
import { authUserCataloguesSlice } from "./auth-user-catalogues/slice"
import { authUserFavouritesSlice } from "./auth-user-favourites/slice"
import { authUserDashboardSlice } from "./auth-user-dashboard/slice"
import { favouriteItemsSlice } from "./favourite-items/slice"
import { currentUserSlice } from "store/modules/current-user/slice"
import { currentUserCataloguesSlice } from "store/modules/current-user-catalogues/slice"
import { currentUserItemsSlice } from "./current-user-items/slice"
import { homepageSlice } from "./homepage/slice"

export const modules = combineReducers({
    app: appSlice.reducer,
    homepage: homepageSlice,
    authUser: authUserSlice.reducer,
    authUserCatalogues: authUserCataloguesSlice.reducer,
    authUserFavoirites: authUserFavouritesSlice.reducer,
    authUserDashboard: authUserDashboardSlice,
    favouriteItems: favouriteItemsSlice.reducer,
    currentUser: currentUserSlice.reducer,
    currentUserCatalogues: currentUserCataloguesSlice.reducer,
    currentUserItems: currentUserItemsSlice.reducer,
})