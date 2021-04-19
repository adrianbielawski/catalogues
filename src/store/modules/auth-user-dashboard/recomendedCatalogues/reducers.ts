import { PayloadAction } from '@reduxjs/toolkit'
import { networkError } from 'src/constants'
import { Catalogue, ListData } from 'src/globalTypes'
import { catalogueDeserializer, listDeserializer } from 'src/serializers'
import * as T from './types'

type State = T.RecomendedCataloguesState

export const fetchRecomendedCatalogues = {
    FETCH_RECOMENDED_CATALOGUES(state: State, action: PayloadAction<number>) { },
    FETCH_RECOMENDED_CATALOGUES_START(state: State) {
        state.isFetchingCatalogues = true
    },
    FETCH_RECOMENDED_CATALOGUES_SUCCESS(state: State, action: PayloadAction<ListData<Catalogue>>) {
        const list = listDeserializer(action.payload, catalogueDeserializer)

        state.cataloguesData = {
            ...list,
            results: list.results.map(r => r.id),
        }

        state.isFetchingCatalogues = false
    },
    FETCH_RECOMENDED_CATALOGUES_FAILURE(state: State) {
        state.isFetchingCatalogues = false
        state.error = networkError
    },
}