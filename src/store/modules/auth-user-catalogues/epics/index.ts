import { combineEpics } from "redux-observable"
import { authUserCataloguesEpics } from "./cataloguesEpics"
import { authUserChoicesEpics } from "./choicesEpics"
import { authUserCataloguesFieldsEpics } from "./fieldsEpics"

export const authUserCataloguesIndexEpics = combineEpics(
    authUserCataloguesEpics,
    authUserCataloguesFieldsEpics,
    authUserChoicesEpics,
)