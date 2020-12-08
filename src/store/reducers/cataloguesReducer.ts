import { cloneDeep } from 'lodash'
import { catalogueDeserializer } from 'src/serializers'
import { CataloguesState, AppActionTypes } from 'store/storeTypes'

const initialState: CataloguesState = {
    catalogues: [],
    fetchingCatalogues: true,
}

const cataloguesReducer = (
    state = initialState,
    action: AppActionTypes
): CataloguesState => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case 'CATALOGUES/GET_CATALOGUES/SUCCESS':
            newState.catalogues = action.catalogues.map(catalogue => catalogueDeserializer(catalogue))
            newState.fetchingCatalogues = false
            return newState
        case 'APP/CLEAR_APP_STATE':
            newState = cloneDeep(initialState)
            return newState

        default:
            return newState
    }
}

export default cataloguesReducer
