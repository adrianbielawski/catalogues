import { createContext } from 'react'
import { cloneDeep } from 'lodash'
import { State, Action, CHANGE_FILTER, CLEAR_FILTER, } from './filtersTypes'

export const initialState = {
    filters: [],
    selectedFilters: {},
    dispatch: () => null,
}

export const FiltersContext = createContext<State>(initialState)

export const reducer = (state: State, action: Action) => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case CHANGE_FILTER:
            newState.selectedFilters[action.filterId] = action.value
            return newState

        case CLEAR_FILTER:
            delete newState.selectedFilters[action.filterId]
            return newState

        default:
            throw new Error()
    }
}