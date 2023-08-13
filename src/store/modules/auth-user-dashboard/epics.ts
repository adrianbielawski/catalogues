import { combineEpics } from 'redux-observable'
import { latestFromFavouritesEpics } from './latest-from-favourites/epics'
import { recommendedCataloguesEpics } from './recommended-catalogues/epics'
import { topItemsEpics } from './top-items/epics'

export const authUserDashboardEpics = combineEpics(
  recommendedCataloguesEpics,
  latestFromFavouritesEpics,
  topItemsEpics,
)
