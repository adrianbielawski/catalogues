import { createContext } from 'react'
import { Draft } from 'immer'
import {
    FiltersInitialState, FiltersContextInterface, Action, CHANGE_SELECTED_FILTERS, SET_SELECTED_FILTERS,
    CHANGE_FILTERS, CHANGE_ACTIVE_FILTERS
} from './filtersTypes'

export const initialState = {
    filters: [],
    selectedFilters: {},
    activeFilters: {},
    changeFilters: () => null,
    setSelectedFilters: () => null,
    changeSelectedFilters: () => null,
    changeActiveFilters: () => null,
}

export const FiltersContext = createContext<FiltersContextInterface>(initialState)

export const reducer = (state: Draft<FiltersInitialState>, action: Action) => {
    switch (action.type) {
        case CHANGE_SELECTED_FILTERS:
            state.selectedFilters[action.filterId] = action.value
            break

        case SET_SELECTED_FILTERS:
            state.activeFilters = {}
            state.selectedFilters = {}
            for (const key in action.filters) {
                state.activeFilters[key] = true
                state.selectedFilters[key] = action.filters[key]
            }
            break

        case CHANGE_ACTIVE_FILTERS:
            state.activeFilters[action.filterId] = action.value
            if (!action.value) {
                delete state.selectedFilters[action.filterId]
            }
            break

        case CHANGE_FILTERS:
            state.filters = action.filters
            break

        default:
            throw new Error()
    }
}