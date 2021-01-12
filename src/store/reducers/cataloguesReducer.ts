import { cloneDeep } from 'lodash'
import { catalogueDeserializer, itemDeserializer, listDeserializer } from 'src/serializers'
import { CataloguesState, AppActionTypes } from 'store/storeTypes'

const initialState: CataloguesState = {
    catalogues: [],
    fetchingCatalogues: true,
    itemsData: {
        count: null,
        pageSize: null,
        startIndex: null,
        endIndex: null,
        current: null,
        next: null,
        previous: null,
        results: [],
    },
    fetchingItems: false,
    creatingNewCatalogue: false,
}

const cataloguesReducer = (
    state = initialState,
    action: AppActionTypes
): CataloguesState => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case 'CATALOGUES/FETCH_CATALOGUES/START':
            newState.fetchingCatalogues = true
            return newState

        case 'CATALOGUES/FETCH_CATALOGUES/SUCCESS':
            newState.catalogues = action.catalogues.map(catalogue => catalogueDeserializer(catalogue))
            newState.fetchingCatalogues = false
            return newState

        case 'CATALOGUES/FETCH_CATALOGUES/FAILURE':
            newState.fetchingCatalogues = false
            return newState

        case 'CATALOGUES/GET_CATALOGUE_ITEMS/START':
            newState.fetchingItems = true
            return newState

        case 'CATALOGUES/GET_CATALOGUE_ITEMS/SUCCESS':
            newState.itemsData = listDeserializer(action.data, itemDeserializer)
            newState.fetchingItems = false
            return newState

        case 'CATALOGUES/GET_CATALOGUE_ITEMS/FAILURE':
            newState.fetchingItems = false
            return newState

        case 'CATALOGUES/CREATE_CATALOGUE/START':
            newState.creatingNewCatalogue = true
            return newState

        case 'CATALOGUES/CREATE_CATALOGUE/FAILURE':
        case 'CATALOGUES/CREATE_CATALOGUE/SUCCESS':
            newState.creatingNewCatalogue = false
            return newState

        case 'APP/CLEAR_APP_STATE':
            newState = cloneDeep(initialState)
            return newState

        default:
            return newState
    }
}

export default cataloguesReducer
