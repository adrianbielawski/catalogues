import { combineEpics } from "redux-observable"
import { latestCataloguesEpics } from "./latest-catalogues/epics"

export const homepageEpics = combineEpics(
    latestCataloguesEpics,
)