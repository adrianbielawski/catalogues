import { latestFromFavouritesEpics } from './latest-from-favourites/epics'
import { recommendedCataloguesEpics } from './recommended-catalogues/epics'
import { topItemsEpics } from './top-items/epics'
import { typedCombineEpics } from 'store/utils'

export const authUserDashboardEpics = typedCombineEpics(
  recommendedCataloguesEpics,
  latestFromFavouritesEpics,
  topItemsEpics,
)
