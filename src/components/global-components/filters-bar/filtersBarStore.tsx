import { createContext } from 'react'
import { cloneDeep } from 'lodash'
//Types
import {
    FiltersBarInitialState, Action, TOGGLE_FILTERS_BAR, FiltersBarContextInterface, INITIALIZED
} from './filtersBarTypes'

export const FiltersBarContext = createContext<FiltersBarContextInterface>({
    show: false,
    isInitialized: false,
    initialized: () => {},
    toggleFiltersBar: () => {},
})

export const reducer = (state: FiltersBarInitialState, action: Action) => {
    let newState = cloneDeep(state)
    switch (action.type) {
        case INITIALIZED:
            newState.isInitialized = true
            return newState

        case TOGGLE_FILTERS_BAR:
            newState.show = !newState.show
            return newState

        default:
            throw new Error()
    }
}