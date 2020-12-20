import { createContext } from 'react'
import { cloneDeep } from 'lodash'
import { State, Action, CHANGE_FILTER } from './filtersTypes'

export const initialState = {
    filters: [],
    selectedFilters: {},
    setFilterValue: () => null,
}

export const FiltersContext = createContext<State>(initialState)

export const reducer = (state: State, action: Action) => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case CHANGE_FILTER:
            if (action.value === undefined) {
                delete newState.selectedFilters[action.filterId]
            } else {
                newState.selectedFilters[action.filterId] = action.value
            }
            return newState

        default:
            throw new Error()
    }
}