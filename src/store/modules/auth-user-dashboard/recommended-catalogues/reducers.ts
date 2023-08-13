import { current, PayloadAction } from '@reduxjs/toolkit'
import { networkError } from 'src/constants'
import { Catalogue, ListData, Salt } from 'src/globalTypes'
import { catalogueDeserializer, listDeserializer } from 'src/serializers'
import { initialState } from './slice'
import type * as T from './types'

type State = T.RecommendedCataloguesState

export const recommendedCatalogues = {
  CLEAR_RECOMMENDED_CATALOGUES(state: State) {
    Object.assign(state, initialState)
  },
}

export const fetchRecommendedCatalogues = {
  FETCH_RECOMMENDED_CATALOGUES(
    state: State,
    action: PayloadAction<T.FetchrecommendedCatalogues>,
  ) {},
  FETCH_RECOMMENDED_CATALOGUES_START(state: State) {
    state.isFetchingCatalogues = true
  },
  FETCH_RECOMMENDED_CATALOGUES_SUCCESS(
    state: State,
    action: PayloadAction<ListData<Catalogue> & Salt>,
  ) {
    const prevResults = current(state).cataloguesData?.results ?? []
    const list = listDeserializer(action.payload, catalogueDeserializer)

    state.cataloguesData = {
      ...list,
      results: prevResults.concat(list.results.map((r) => r.id)),
      salt: action.payload.salt,
    }

    state.isFetchingCatalogues = false
  },
  FETCH_RECOMMENDED_CATALOGUES_FAILURE(state: State) {
    state.isFetchingCatalogues = false
    state.error = networkError
  },
}
