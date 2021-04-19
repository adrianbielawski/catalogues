import { combineEpics } from "redux-observable"
import { latestFromFavouritesEpics } from "./latestFromFavourites/epics"
import { recomendedCataloguesEpics } from "./recomendedCatalogues/epics"

export const authUserDashboardEpics = combineEpics(
    recomendedCataloguesEpics,
    latestFromFavouritesEpics,
)