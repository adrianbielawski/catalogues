import { typedCombineEpics } from 'store/utils'
import { authUserCataloguesEpics } from './cataloguesEpics'
import { authUserChoicesEpics } from './choicesEpics'
import { authUserCataloguesFieldsEpics } from './fieldsEpics'

export const authUserCataloguesIndexEpics = typedCombineEpics(
  authUserCataloguesEpics,
  authUserCataloguesFieldsEpics,
  authUserChoicesEpics,
)
