import { generatePath } from 'react-router-dom'
import { useTypedSelector } from 'store/storeConfig'
import {
  catalogueSelector,
  catalogueSelectorBySlug,
  itemSelector,
} from 'store/selectors'
import { DeserializedCatalogue, DeserializedItem } from '../globalTypes'
export interface DehydratedParams {
  username?: string
  slug?: string
  itemId?: number
}

export interface HydratedParams {
  username?: string
  slug?: string
  catalogue?: DeserializedCatalogue
  itemId?: number
  item?: DeserializedItem
}

const useParamHydrator = () => {
  const state = useTypedSelector((state) => state)
  const currentUserData = state.modules.currentUser
  const currentUser = state.entities.users.entities[currentUserData.userId!]!

  const hydrate = (params: DehydratedParams): HydratedParams => {
    const hydrated: HydratedParams = params
    if (params.username !== undefined) {
      hydrated.username = currentUser.username
    }
    if (params.slug !== undefined) {
      hydrated.catalogue = catalogueSelectorBySlug(
        params.slug,
        currentUser.id,
      )(state)
    }
    if (params.itemId !== undefined) {
      hydrated.item = itemSelector(params.itemId)(state)
    }
    return hydrated
  }

  const dehydrate = (params: HydratedParams): DehydratedParams => {
    const dehydrated: DehydratedParams = params
    if (params.username !== undefined) {
      dehydrated.username = currentUser.username
    }
    if (params.catalogue !== undefined) {
      dehydrated.slug = catalogueSelector(params.catalogue.id)(state)?.slug
    }
    if (params.item !== undefined) {
      dehydrated.itemId = itemSelector(params.item.id)(state)?.id
    }
    return dehydrated
  }

  return {
    hydrate,
    dehydrate,
  }
}

export const useUrlBuilder = () => {
  const { dehydrate } = useParamHydrator()

  return ({ pathname, params }: { pathname: string; params: HydratedParams }) =>
    generatePath(pathname, dehydrate(params) as any)
}
