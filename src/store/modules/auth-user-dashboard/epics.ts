import { combineEpics } from "redux-observable"
import { latestFromFavouritesEpics } from "./latest-from-favourites/epics"
import { recomendedCataloguesEpics } from "./recomended-catalogues/epics"
import { topItemsEpics } from "./top-items/epics"

export const authUserDashboardEpics = combineEpics(
    recomendedCataloguesEpics,
    latestFromFavouritesEpics,
    topItemsEpics,
)