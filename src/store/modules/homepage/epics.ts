import { combineEpics } from "redux-observable"
import { latestCataloguesEpics } from "./latest-catalogues/epics"
import { latestItemsEpics } from "./latest-items/epics"

export const homepageEpics = combineEpics(
    latestCataloguesEpics,
    latestItemsEpics,
)