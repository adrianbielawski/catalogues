import { latestCataloguesEpics } from './latest-catalogues/epics'
import { latestItemsEpics } from './latest-items/epics'
import { typedCombineEpics } from 'store/utils'

export const homepageEpics = typedCombineEpics(
  latestCataloguesEpics,
  latestItemsEpics,
)
