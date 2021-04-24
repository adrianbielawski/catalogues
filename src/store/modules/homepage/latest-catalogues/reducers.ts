import { current, PayloadAction } from '@reduxjs/toolkit'
import { networkError } from 'src/constants'
import { catalogueDeserializer, listDeserializer } from 'src/serializers'
import { Catalogue, ListData } from 'src/globalTypes'
import * as T from './types'

type State = T.LatestCataloguesState

export const fetchLatestCatalogues = {
    FETCH_LATEST_CATALOGUES(state: State, action: PayloadAction<number>) { },
    FETCH_LATEST_CATALOGUES_START(state: State) {
        state.isFetchingCatalogues = true
    },
    FETCH_LATEST_CATALOGUES_SUCCESS(state: State, action: PayloadAction<ListData<Catalogue>>) {
        const prevResults = current(state).cataloguesData.results
        const list = listDeserializer(action.payload, catalogueDeserializer)

        state.cataloguesData = {
            ...list,
            results: prevResults.concat(list.results.map(r => r.id)),
        }

        state.isFetchingCatalogues = false
    },
    FETCH_LATEST_CATALOGUES_FAILURE(state: State) {
        state.isFetchingCatalogues = false
        state.error = networkError
    },
}