import { createContext } from 'react'
import { Draft } from 'immer'
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

export const reducer = (state: Draft<FiltersBarInitialState>, action: Action) => {
    switch (action.type) {
        case INITIALIZED:
            state.isInitialized = true
            break

        case TOGGLE_FILTERS_BAR:
            state.show = !state.show
            break

        default:
            throw new Error()
    }
}