import { type PayloadAction } from '@reduxjs/toolkit'
import { type Catalogue } from 'src/globalTypes'
import type * as T from '../types'

type State = T.CurrentUserFavCataloguesState

export const fetchFavouriteCataloguesReducers = {
  FETCH_FAVOURITE_CATALOGUES(state: State) {},
  FETCH_FAVOURITE_CATALOGUES_START(state: State) {
    state.fetchingCatalogues = true
  },
  FETCH_FAVOURITE_CATALOGUES_SUCCESS(
    state: State,
    action: PayloadAction<Catalogue[]>,
  ) {
    state.cataloguesIds = action.payload.map((c) => c.id)
    state.fetchingCatalogues = false
  },
  FETCH_FAVOURITE_CATALOGUES_FAILURE(state: State) {
    state.fetchingCatalogues = false
  },
}
