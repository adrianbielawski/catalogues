import { createContext } from 'react'
import { cloneDeep } from 'lodash'
import { FiltersInitialState, FiltersContextInterface, Action, CHANGE_SELECTED_FILTERS, CHANGE_FILTERS } from './filtersTypes'

export const initialState = {
    filters: [],
    selectedFilters: {},
    changeSelectedFilters: () => null,
    changeFilters: () => null,
}

export const FiltersContext = createContext<FiltersContextInterface>(initialState)

export const reducer = (state: FiltersInitialState, action: Action) => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case CHANGE_SELECTED_FILTERS:
            if (action.value === undefined) {
                delete newState.selectedFilters[action.filterId]
            } else {
                newState.selectedFilters[action.filterId] = action.value
            }
            return newState

        case CHANGE_FILTERS:
            newState.filters = action.filters
            return newState

        default:
            throw new Error()
    }
}